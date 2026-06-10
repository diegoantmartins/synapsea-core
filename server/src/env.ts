import { config as loadEnv } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Load .env from the server dir first, fall back to repo root one level up.
const candidates = [resolve(process.cwd(), '.env'), resolve(process.cwd(), '..', '.env')];
for (const path of candidates) {
  if (existsSync(path)) {
    loadEnv({ path });
    break;
  }
}

function required(name: string, fallback?: string): string {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const env = {
  PORT: Number(process.env.PORT ?? 3001),
  NODE_ENV: process.env.NODE_ENV ?? 'development',

  // Accept either SUPABASE_URL (server-only) or VITE_SUPABASE_URL (shared with frontend).
  SUPABASE_URL: required('SUPABASE_URL', process.env.VITE_SUPABASE_URL),
  SUPABASE_SERVICE_ROLE_KEY: required('SUPABASE_SERVICE_ROLE_KEY'),

  SYNAPSEA_ADMIN_PASSWORD: required('SYNAPSEA_ADMIN_PASSWORD'),
  JWT_SECRET: required('JWT_SECRET'),

  UAZAPI_BASE_URL: process.env.UAZAPI_BASE_URL ?? 'https://synapsea.uazapi.com',

  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
};
