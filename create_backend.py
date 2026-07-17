#!/usr/bin/env python3
"""
Creates a FastAPI + Beanie + MongoDB backend scaffold when run.

Usage:
    python create_backend.py
"""
import os
from pathlib import Path

ROOT = Path(__file__).parent

files = {
    "README.md": """FastAPI + MongoDB backend

This repository contains a FastAPI backend using Beanie (ODM) with MongoDB, JWT authentication, Docker, and CI.

Features:
- Async FastAPI app
- User registration + login (JWT)
- Protected endpoints
- Beanie (Motor) ODM for MongoDB
- Dockerfile + docker-compose (includes MongoDB)
- GitHub Actions CI (runs tests)

Requirements:
- Python 3.11+
- Docker (for Docker compose)

Quick start (development):
1. Copy .env.example to .env and set values.
2. docker-compose up --build -d
3. Install requirements and run app locally:
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Docs available at http://localhost:8000/docs
""",

    ".gitignore": """__pycache__/
.env
.env.*
*.pyc
*.pyo
*.pyd
.Python
venv/
.env.local
.idea/
.vscode/
dist/
build/
.coverage
htmlcov/
""",

    "requirements.txt": """fastapi==0.99.3
uvicorn[standard]==0.22.0
beanie==1.20.1
motor==4.4.0
python-dotenv==1.0.0
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
pydantic==2.6.0
pytest==7.4.0
pytest-asyncio==0.22.0
httpx==0.24.1
pymongo==4.5.0
""",

    "Dockerfile": """FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
ENV PYTHONUNBUFFERED=1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
""",

    "docker-compose.yml": """version: '3.8'
services:
  app:
    build: .
    ports:
      - '8000:8000'
    environment:
      - MONGODB_URI=mongodb://mongo:27017/fastapi_db
      - SECRET_KEY=changeme
    depends_on:
      - mongo
  mongo:
    image: mongo:6.0
    restart: always
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
""",

    ".env.example": """# Example environment variables
APP_ENV=development
SECRET_KEY=changeme
MONGODB_URI=mongodb://localhost:27017/fastapi_db
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
ADMIN_EMAIL=
""",

    ".github/workflows/ci.yml": """name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongo:
        image: mongo:6.0
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Wait for MongoDB
        run: |
          python - <<'PY'
import sys, time
from pymongo import MongoClient
for i in range(30):
    try:
        MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=1000).admin.command('ping')
        print('Mongo is up')
        break
    except Exception:
        time.sleep(1)
else:
    print('Mongo did not start')
    sys.exit(1)
PY
      - name: Run tests
        env:
          MONGODB_URI: mongodb://localhost:27017/fastapi_db
          SECRET_KEY: testsecret
        run: |
          pytest -q
""",

    "app/__init__.py": "# Package marker for app\n",

    "app/config.py": """from pydantic import BaseSettings, Field
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
""",

    "app/db.py": """from motor.motor_asyncio import AsyncIOMotorClient
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
""",

    "app/main.py": """from fastapi import FastAPI
from .config import settings
from .db import init_db
from .routers import health, auth, users

def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)
    app.include_router(health.router)
    app.include_router(auth.router)
    app.include_router(users.router)

    @app.on_event('startup')
    async def startup_event():
        await init_db()

    return app

app = create_app()
""",

    "app/models/user.py": """from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from pydantic import ConfigDict

class User(Document):
    email: EmailStr = Indexed(..., unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = 'users'

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserRead(BaseModel):
    id: PydanticObjectId | None = None
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool
    is_superuser: bool

    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
""",

    "app/routers/__init__.py": """from . import health, auth, users

__all__ = ["health", "auth", "users"]
""",

    "app/routers/health.py": """from fastapi import APIRouter

router = APIRouter()

@router.get('/healthz')
async def health():
    return {'status': 'ok'}
""",

    "app/routers/auth.py": """from fastapi import APIRouter, HTTPException, status
from ..models.user import User, UserCreate, UserRead, Token
from ..core.security import get_password_hash, verify_password, create_access_token
from datetime import timedelta
from ..config import settings
from pydantic import BaseModel

router = APIRouter(prefix='/auth', tags=['auth'])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post('/register', response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate):
    existing = await User.find_one(User.email == user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    hashed = get_password_hash(user_in.password)
    user = User(email=user_in.email, hashed_password=hashed, full_name=user_in.full_name or None)
    await user.insert()
    return UserRead.model_validate(user)

@router.post('/login', response_model=Token)
async def login(form_data: LoginRequest):
    user = await User.find_one(User.email == form_data.email)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail='Incorrect email or password')
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token({'id': str(user.id)}, expires_delta=access_token_expires)
    return {'access_token': token, 'token_type': 'bearer'}
""",

    "app/routers/users.py": """from fastapi import APIRouter, Depends, HTTPException, status, Query, Path
from typing import List
from ..models.user import User, UserRead, UserUpdate
from ..core.dependencies import get_current_user
from beanie import PydanticObjectId
from datetime import datetime

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=List[UserRead])
async def list_users(skip: int = 0, limit: int = Query(default=10, lte=100), current_user: User = Depends(get_current_user)):
    users = await User.find_all().skip(skip).limit(limit).to_list()
    return [UserRead.model_validate(u) for u in users]

@router.get('/{user_id}', response_model=UserRead)
async def get_user(user_id: PydanticObjectId = Path(...), current_user: User = Depends(get_current_user)):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return UserRead.model_validate(user)

@router.patch('/{user_id}', response_model=UserRead)
async def update_user(user_id: PydanticObjectId, update: UserUpdate, current_user: User = Depends(get_current_user)):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    # Only allow owners or superusers
    if str(current_user.id) != str(user.id) and not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized')
    if update.full_name is not None:
        user.full_name = update.full_name
    if update.password:
        from ..core.security import get_password_hash
        user.hashed_password = get_password_hash(update.password)
    user.updated_at = datetime.utcnow()
    await user.save()
    return UserRead.model_validate(user)

@router.delete('/{user_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: PydanticObjectId, current_user: User = Depends(get_current_user)):
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    if str(current_user.id) != str(user.id) and not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized')
    await user.delete()
    return None
""",

    "app/core/security.py": """from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from ..config import settings
from typing import Optional

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
ALGORITHM = 'HS256'

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> dict:
    # Will raise JWTError on invalid token
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
    return payload
""",

    "app/core/dependencies.py": """from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .security import decode_token
from ..models.user import User
from jose import JWTError

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    token = credentials.credentials
    try:
        payload = decode_token(token)
        user_id = payload.get('id')
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials')
    user = await User.get(user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Inactive user')
    return user
""",

    "tests/test_health.py": """from httpx import AsyncClient
import pytest
from app.main import app

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        r = await ac.get('/healthz')
    assert r.status_code == 200
    assert r.json() == {'status': 'ok'}
""",

    "tests/test_auth.py": """import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_register_and_login():
    # Use AsyncClient; requires MongoDB running (see docker-compose)
    async with AsyncClient(app=app, base_url='http://test') as ac:
        data = {'email': 'test@example.com', 'password': 'secret'}
        # register
        r = await ac.post('/auth/register', json={'email': data['email'], 'password': data['password']})
        assert r.status_code == 201
        # login
        r = await ac.post('/auth/login', json=data)
        assert r.status_code == 200
        body = r.json()
        assert 'access_token' in body
""",
}

def ensure_dirs(path: Path):
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)

def write_file(rel_path: str, content: str):
    dest = ROOT / rel_path
    ensure_dirs(dest.parent)
    with open(dest, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print(f'Wrote {rel_path}')

def main():
    for p, c in files.items():
        write_file(p, c)
    print('\nAll files written.\nNext steps:')
    print(' - Review files, run `pip install -r requirements.txt`')
    print(' - Copy .env.example to .env and set SECRET_KEY and MONGODB_URI if needed')
    print(' - Run `docker-compose up --build` to start the app and MongoDB')

if __name__ == '__main__':
    main()
