# santarita — Claude Instructions

## Status
production | Branch: main

## Structure
```
santarita/
├── frontend/        # React 18 + TypeScript + Vite + Tailwind + Stripe
│   └── src/
│       ├── components/   # UI components
│       ├── pages/        # Public pages + admin panel (/admin, /login)
│       ├── services/     # API service + AuthService
│       └── contexts/     # React contexts
├── backend/         # TypeScript + Express + Prisma + PostgreSQL
│   └── src/
│       ├── app.ts        # Express app config
│       ├── server.ts     # Server entry point
│       ├── controllers/  # 6 TS files
│       ├── services/     # 3 TS files
│       ├── repositories/ # 3 TS files
│       ├── middlewares/  # JWT auth, rate limiting
│       ├── routes/       # 5 TS files
│       ├── utils/        # 3 TS files
│       └── types/        # Type definitions
│   ├── dist/             # Compiled JS (production only)
│   ├── prisma/           # schema.prisma + migrations
│   └── uploads/          # User uploaded images
└── tasks/
```

## Key Commands
```bash
# Backend development (TypeScript, port 3001)
cd backend && npm run dev           # ts-node + nodemon
cd backend && npm run type-check    # check types without building
cd backend && npm run build:prod    # compile to dist/
cd backend && npm start             # run dist/server.js (production)

# DB management
cd backend && npx prisma studio
cd backend && npx prisma db push

# Frontend (port 5173)
cd frontend && npm run dev
cd frontend && npm run build

# Tests (frontend)
cd frontend && npm test
cd frontend && npm run test:coverage
```

## Rules
- Backend is 100% TypeScript — never add .js files to src/
- Always run type-check before building for production
- Prisma schema changes require `npx prisma db push` and client regeneration
- Stripe keys must be set or payment routes will fail
- Build command for Render: `npm install && npm run build:render`
- uploads/ directory contains user images — do not delete
- Rate limits are strict (5 login attempts/15min) — don't bypass in dev

## Environment
```
# backend/.env
PORT=3001
FRONTEND_URL=http://localhost:5173   # prod: https://santaritaourofino.vercel.app
DATABASE_URL=postgresql://...        # Supabase PostgreSQL
JWT_SECRET=
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NODE_ENV=development

# frontend/.env (copy from .env.example)
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_PRODUCTION_API_URL=https://santa-rita-backend.onrender.com
```
