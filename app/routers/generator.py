from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import AsyncGenerator, Optional
import asyncio
import logging

logger = logging.getLogger("game_sse")
logger.setLevel(logging.INFO)

router = APIRouter(prefix="/api/v1/game", tags=["Game Generation"])

class StreamRequest(BaseModel):
    session_id: Optional[str] = None
    prompt: str = Field(..., min_length=1, max_length=4000)
    max_tokens: Optional[int] = Field(default=512, gt=0, le=4096)
    temperature: Optional[float] = Field(default=0.7, ge=0.0, le=2.0)

GAME_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Snake Hunt - AI Generated</title>
    <style>
        body { margin: 0; background: #02202b; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; color: #fff; }
        .game-container { display: flex; gap: 20px; }
        canvas { background: #052733; border: 4px solid #1B5E20; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
        .hud { font-size: 24px; margin-bottom: 10px; display: flex; justify-content: space-between; }
    </style>
</head>
<body>
    <div class="game-container">
        <div>
            <div class="hud">
                <div>Score: <span id="score">0</span></div>
                <div>Level: <span id="level">1</span></div>
            </div>
            <canvas id="gameCanvas" width="720" height="480"></canvas>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        console.log("Snake Game Engine Initialized via SSE.");
    </script>
</body>
</html>"""

async def production_llm_stream_adapter(prompt: str) -> AsyncGenerator[str, None]:
    chunk_size = 150
    for i in range(0, len(GAME_TEMPLATE), chunk_size):
        yield GAME_TEMPLATE[i:i+chunk_size]
        await asyncio.sleep(0.05)

def sse_escape_data(data: str) -> str:
    if not isinstance(data, str):
        data = str(data)
    return data.replace("\r", "\\r").replace("\n", "\\n")

async def llm_to_sse_generator(request: Request, prompt: str, llm_streamer) -> AsyncGenerator[bytes, None]:
    try:
        async for chunk in llm_streamer(prompt=prompt):
            if await request.is_disconnected():
                logger.info("Client connection closed unexpectedly.")
                break

            safe_chunk = sse_escape_data(chunk)
            sse_message = f"event: token\ndata: {safe_chunk}\n\n"
            yield sse_message.encode("utf-8")

        if not await request.is_disconnected():
            done_message = "event: token\ndata: [DONE]\n\n"
            yield done_message.encode("utf-8")

    except asyncio.CancelledError:
        raise
    except Exception as exc:
        err_payload = sse_escape_data(str(exc))
        error_event = f"event: error\ndata: {err_payload}\n\n"
        try:
            yield error_event.encode("utf-8")
        except Exception:
            pass
        return

@router.post("/stream", response_class=StreamingResponse, status_code=status.HTTP_200_OK)
async def stream_tokens(request: Request, payload: StreamRequest):
    if len(payload.prompt.strip()) == 0:
        raise HTTPException(status_code=400, detail="Prompt parameter cannot be empty.")

    event_generator = llm_to_sse_generator(
        request=request,
        prompt=payload.prompt,
        llm_streamer=production_llm_stream_adapter
    )

    headers = {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no", 
    }

    return StreamingResponse(event_generator, headers=headers, media_type="text/event-stream")
