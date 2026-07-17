FastAPI + MongoDB backend

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
