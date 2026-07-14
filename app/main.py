from fastapi import FastAPI

app = FastAPI(
    title="AI Game Generator Backend",
    version="1.0.0"
)

@app.get("/health", status_code=200)
async def health_check():
    return {"status": "healthy", "platform": "real-time-game-gen"}
