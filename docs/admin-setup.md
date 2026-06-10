# Synapsea Admin + WhatsApp QR setup

## Overview

- **`/synapsea-admin`** — password-gated admin panel (password from `.env`). Register enterprises, WhatsApp numbers (with UAZAPI token), and users. Link users to enterprises.
- **`/login`** — user login (Supabase Auth email/password).
- **`/app`** — authenticated user selects one of their enterprise's numbers and generates a QR code. The UAZAPI token stays on the server; the user never sees or types it.

## 1. Apply DB migration

Run `supabase/migrations/0001_admin_enterprises_whatsapp.sql` against your Supabase project (SQL editor or CLI).

## 2. Set env vars

Copy `.env.example` → `.env` and fill:

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — from Supabase project settings.
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-only, never exposed).
- `SYNAPSEA_ADMIN_PASSWORD` — admin password for `/synapsea-admin`.
- `JWT_SECRET` — long random string (e.g. `openssl rand -hex 64`).
- `UAZAPI_BASE_URL` — defaults to `https://synapsea.uazapi.com`.
- `VITE_API_URL` — leave blank for dev. In prod, set to the backend public URL.

## 3. Run locally

```bash
# Backend
cd server
npm install
npm run dev            # listens on :3001

# Frontend (new terminal, repo root)
npm install
npm run dev            # :8080, proxies /api → :3001
```

## 4. Run in Docker

```bash
docker compose up --build
```

- `synapsea-web` on `:4173`
- `synapsea-server` on `:3001`

Both share the `shared-net` external network.

## 5. Admin workflow

1. Go to `http://localhost:8080/synapsea-admin`.
2. Enter `SYNAPSEA_ADMIN_PASSWORD`.
3. **Empresas** — create enterprises.
4. **Números WhatsApp** — for each enterprise, register the WhatsApp number with its UAZAPI token. The token is stored but never returned to the browser.
5. **Usuários** — create Supabase Auth users (email + password) and link each to an enterprise.

## 6. User workflow

1. User visits `/login`, signs in with the credentials the admin created.
2. On `/app`, they see the dropdown of numbers registered for their enterprise.
3. Select a number → **Gerar QR Code** → backend calls UAZAPI with the stored token → QR image is displayed with a 30s countdown.

## Security notes

- `uazapi_token` is only readable server-side (service role). RLS blocks selecting it from the client.
- Users can only see `whatsapp_numbers` belonging to their enterprise.
- Admin JWT is stored in `localStorage`; consider moving to an `httpOnly` cookie if you need stronger XSS defense.
