# santarita — Project Reference

## Description
Complete website and admin management system for Igreja Santa Rita de Cássia, a Catholic church in Ouro Fino, MG, Brazil. Serves both the general public (event calendar, news, mass schedule, online tithing/donations via Stripe) and church administrators (CMS for events and news, image upload, user role management). Production system actively used by the parish.

## Tech Stack
- **Frontend:** React 18.3.1, TypeScript 5.5, Vite 7, Tailwind CSS 3.4, React Router 6, Stripe React SDK (@stripe/react-stripe-js), Lucide icons, DOMPurify
- **Backend:** Node.js, Express 4, TypeScript 5.9 (100% TypeScript in src/), Prisma 6.11 ORM, PostgreSQL 15+, JWT auth, bcrypt, Stripe SDK, Multer (image upload), express-rate-limit, ts-node (dev), tsc-alias (build)
- **Database:** PostgreSQL on Supabase
- **Auth:** JWT tokens with refresh, role-based (Admin/Editor)
- **Testing:** Vitest, React Testing Library, jsdom (39+ tests, 60%+ coverage, 96%+ on Tithe component)
- **Deploy:** Vercel (frontend) + Render (backend) + Supabase (database)

## Directory Structure
```
santarita/
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components (public + admin)
│   │   ├── pages/             # Public pages + admin panel
│   │   ├── services/          # API client, AuthService
│   │   └── contexts/          # React contexts
│   ├── public/assets/         # Static assets (church images)
│   ├── coverage/              # Test coverage reports
│   ├── vercel.json            # Vercel build config
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env / .env.example
├── backend/
│   ├── src/                   # 25 TypeScript source files
│   │   ├── app.ts             # Express app configuration
│   │   ├── server.ts          # Server initialisation
│   │   ├── controllers/       # 6 files: auth, events, news, categories, upload, payment
│   │   ├── services/          # 3 files: business logic layer
│   │   ├── repositories/      # 3 files: Prisma data access
│   │   ├── middlewares/       # 2 files: auth JWT, rate limiting
│   │   ├── routes/            # 5 files: route definitions
│   │   ├── utils/             # 3 files: validators, response helpers
│   │   └── types/             # 1 file: shared TypeScript types
│   ├── dist/                  # Compiled JS (generated, not committed)
│   ├── prisma/
│   │   └── schema.prisma      # DB schema (Users, Events, News, Categories)
│   ├── uploads/               # Uploaded images (auto-created)
│   ├── tsconfig.json
│   ├── DEPLOY.md              # Render deploy instructions
│   └── .env / .env.example
└── tasks/                     # Task/planning files
```

## Key Files
- `backend/src/app.ts` — Express app with CORS, rate limits, all routes mounted
- `backend/src/server.ts` — Server startup
- `backend/prisma/schema.prisma` — Database schema (source of truth)
- `backend/DEPLOY.md` — Full Render deploy instructions with troubleshooting
- `frontend/src/services/` — API calls and auth token management
- `frontend/vercel.json` — Vercel SPA config

## Deploy & URLs
- **Frontend:** https://santaritaourofino.vercel.app (Vercel, auto-deploy from main)
- **Backend:** https://santa-rita-backend.onrender.com (Render, build: `npm install && npm run build:render`, start: `npm start`)
- **Database:** Supabase PostgreSQL
- **Stripe:** Live keys configured for donation processing

## Development Setup
```bash
# Terminal 1 — Backend (port 3001)
cd backend
cp .env.example .env    # fill DATABASE_URL, JWT_SECRET, STRIPE_* keys
npm install
npx prisma generate
npx prisma db push      # first time only
npm run dev             # ts-node + nodemon

# Terminal 2 — Frontend (port 5173)
cd frontend
cp .env.example .env
npm install
npm run dev
```
Access:
- Public site: http://localhost:5173
- Admin panel: http://localhost:5173/admin (requires login)
- API: http://localhost:3001/api

## Git
- **Remote:** git@github.com:mateusribeirocampos/santarita.git
- **Branch:** main (production), dev (development)
- **Flow:** dev → main via PR; pull.rebase = true configured
