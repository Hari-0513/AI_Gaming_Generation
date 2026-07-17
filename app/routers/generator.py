"""
app/routers/generator.py

Server-Sent Events (SSE) streaming endpoint implemented with FastAPI.
- POST /stream : accepts a JSON body with `prompt`, `interval`, `max_events`.
- Streams incremental JSON messages using the SSE format (text/event-stream).

Security notes:
- A simple API key dependency is provided (X-API-Key header). Set the API_KEY
  environment variable in production. Replace or improve with your auth system.
- Input validation is performed with Pydantic.

Behavior notes:
- The generator checks for client disconnects and stops streaming when detected.
- Messages are sent as SSE `data:` records containing JSON strings.
- A periodic keep-alive (comment) could be added; we already send frequent
  payloads depending on `interval`.

To use:
- Add this router to your FastAPI app: app.include_router(router, prefix="/api")

"""

from __future__ import annotations

import asyncio
import json
import os
import time
from typing import AsyncGenerator

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field, validator

router = APIRouter()

# ----------------------
# Security / Auth helper
# ----------------------

def get_api_key() -> str:
    """Read API key from environment. In production, store this securely.

    Set environment variable API_KEY to a strong secret. If not set, the
    default value is "CHANGE_ME" which should not be used in production.
    """
    return os.getenv("API_KEY", "CHANGE_ME")


async def api_key_auth(request: Request) -> None:
    """A tiny dependency to check for X-API-Key header.

    Raise 401 when missing or invalid. Replace wiring with OAuth/JWT in
    production.
    """
    header_key = request.headers.get("x-api-key")
    expected = get_api_key()
    # If API_KEY is left as CHANGE_ME, still require a header. This helps
    # avoid accidentally leaving the endpoint unauthenticated.
    if not header_key or header_key != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
            headers={"WWW-Authenticate": "API key"},
        )


# -----------------
# Request validation
# -----------------
class StreamRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=2000)
    interval: float = Field(
        0.25,
        description="Seconds to wait between streamed chunks. Must be >= 0.01 and <= 5.",
    )
    max_events: int = Field(
        50, description="Maximum number of streamed events (positive integer, <= 1000)"
    )

    @validator("interval")
    def interval_range(cls, v: float) -> float:
        if not (0.01 <= v <= 5.0):
            raise ValueError("interval must be between 0.01 and 5.0 seconds")
        return v

    @validator("max_events")
    def max_events_range(cls, v: int) -> int:
        if not (1 <= v <= 1000):
            raise ValueError("max_events must be between 1 and 1000")
        return v


# -----------------
# SSE helper
# -----------------

def format_sse_event(data: dict, event: str | None = None, event_id: int | None = None) -> bytes:
    """Return a bytes object formatted as an SSE record.

    Each event will look like:
      id: 1\n
      event: message\n
      data: {json}\n
      \n
    Notes:
    - The data payload is JSON-encoded and sent as a single data: line. If you
      need multiline data, split lines and prefix each with 'data: '.
    """
    payload = json.dumps(data, default=str, ensure_ascii=False)
    lines = []
    if event_id is not None:
        lines.append(f"id: {event_id}")
    if event:
        lines.append(f"event: {event}")
    # Put the JSON on a single data line. If your JSON may contain newlines,
    # you would split and prefix each line with 'data: '.
    lines.append(f"data: {payload}")
    lines.append("")  # terminator
    text = "\n".join(lines)
    return text.encode("utf-8")


# -----------------
# Streaming endpoint
# -----------------
@router.post(
    "/stream",
    responses={
        200: {
            "content": {"text/event-stream": {}},
            "description": "Server-Sent Events stream",
        }
    },
)
async def stream_endpoint(
    request: Request, payload: StreamRequest, _auth: None = Depends(api_key_auth)
) -> StreamingResponse:
    """Stream incremental JSON events using Server-Sent Events.

    This example simulates token-by-token generation from the provided prompt.
    In a real integration, you'd hook this generator up to your model's async
    streaming API and forward partial results as SSE messages.

    The function returns a StreamingResponse whose content is an async
    generator. We set the proper Content-Type and cache-control headers for SSE.
    """

    async def event_generator(req: Request, payload: StreamRequest) -> AsyncGenerator[bytes, None]:
        start_ts = time.time()
        event_id = 0

        # Send an initial 'open' event with some metadata.
        meta = {
            "type": "open",
            "prompt_preview": (payload.prompt[:200] + "...") if len(payload.prompt) > 200 else payload.prompt,
            "timestamp": start_ts,
        }
        yield format_sse_event(meta, event="open", event_id=event_id)
        event_id += 1

        # Simulate streaming tokens. A simple approach is to split the prompt into
        # whitespace-separated tokens and yield them one by one; if there aren't
        # enough tokens, create synthetic tokens.
        tokens = payload.prompt.split()
        if not tokens:
            tokens = ["\n"]

        # If tokens < max_events, we'll loop and produce synthetic tokens based on index.
        try:
            for i in range(payload.max_events):
                # Stop streaming if client disconnected
                if await req.is_disconnected():
                    # A client may disconnect (close tab / cancel request). Stop the loop cleanly.
                    break

                # Prepare a fake token/chunk
                if i < len(tokens):
                    chunk = tokens[i]
                else:
                    chunk = f"[continuation_{i - len(tokens) + 1}]"

                payload_data = {
                    "type": "chunk",
                    "index": i,
                    "token": chunk,
                    "elapsed": round(time.time() - start_ts, 3),
                }

                yield format_sse_event(payload_data, event="message", event_id=event_id)
                event_id += 1

                # Sleep between events. Use asyncio.sleep so the loop yields control.
                await asyncio.sleep(payload.interval)

            # Final 'done' event
            if not await req.is_disconnected():
                done_payload = {"type": "done", "total_events": event_id - 1, "timestamp": time.time()}
                yield format_sse_event(done_payload, event="done", event_id=event_id)

        except asyncio.CancelledError:
            # Disconnected clients can cause the generator to be cancelled. Clean up
            # if needed and exit silently.
            return
        except Exception as exc:  # pragma: no cover - logging path
            # If an unexpected error occurs, send an error event and exit.
            try:
                err = {"type": "error", "detail": str(exc)}
                yield format_sse_event(err, event="error", event_id=event_id)
            except Exception:
                # If yield fails (client gone), just return.
                return

    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        # Disable buffering in proxies that respect this header. Some proxies
        # may ignore this; ensure your infrastructure supports streaming.
        "X-Accel-Buffering": "no",
    }

    return StreamingResponse(event_generator(request, payload), headers=headers)


__all__ = ["router"]
