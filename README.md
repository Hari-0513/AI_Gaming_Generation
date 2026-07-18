<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
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
>>>>>>> 3bdbb28fde15300b348a69c7a6dbb9887d2ecfcf
