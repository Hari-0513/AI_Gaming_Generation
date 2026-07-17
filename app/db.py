from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .config import settings
from .models.user import User

_async_client = None

async def init_db():
    global _async_client
    if _async_client is None:
        _async_client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = _async_client.get_default_database()
    await init_beanie(database=db, document_models=[User])
