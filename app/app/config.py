from pydantic import BaseSettings, Field
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = 'FastAPI MongoDB App'
    DEBUG: bool = True
    SECRET_KEY: str = Field(..., env='SECRET_KEY')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    MONGODB_URI: str = Field('mongodb://localhost:27017/fastapi_db', env='MONGODB_URI')
    ADMIN_EMAIL: Optional[str] = None

    class Config:
        env_file = '.env'

settings = Settings()
