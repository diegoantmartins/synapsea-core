#!/usr/bin/env node
// Keep-alive ping for the Supabase project.
//
// Free-tier Supabase projects auto-pause after ~7 days of inactivity, which
// makes the project hostname stop resolving (net::ERR_NAME_NOT_RESOLVED).
// This script generates a small amount of DB activity on each run:
//   1. INSERT one row into public.keepalive
//   2. DELETE rows older than the retention window (prune what it generated)
// Both a write and a delete count as activity, so the project stays awake.
//
// Run it on a schedule (every 6-12h is plenty). See docker-compose.yml
// `keepalive` service, or the cron example at the bottom of this file.

import { createClient } from '@supabase/supabase-js';
import { config as loadEnv } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Load .env for local/host runs. In Docker, vars come from the environment
// and these files simply won't exist — that's fine.
for (const path of [
  resolve(process.cwd(), '.env'),
  resolve(process.cwd(), '..', '.env'),
]) {
  if (existsSync(path)) {
    loadEnv({ path });
    break;
  }
}

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Delete keepalive rows older than this many days on each run.
const RETENTION_DAYS = Number(process.env.KEEPALIVE_RETENTION_DAYS ?? 2);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    '[keepalive] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const stamp = new Date().toISOString();

  // 1. Generate data: insert a ping row.
  const { error: insertErr } = await supabase
    .from('keepalive')
    .insert({ note: `ping ${stamp}` });
  if (insertErr) throw new Error(`insert failed: ${insertErr.message}`);

  // 2. Exclude old data: prune rows past the retention window.
  const cutoff = new Date(
    Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();
  const { error: deleteErr } = await supabase
    .from('keepalive')
    .delete()
    .lt('pinged_at', cutoff);
  if (deleteErr) throw new Error(`prune failed: ${deleteErr.message}`);

  console.log(`[keepalive] ok ${stamp} (pruned rows older than ${cutoff})`);
}

main().catch((err) => {
  console.error('[keepalive] failed:', err.message ?? err);
  process.exit(1);
});

// --- Host cron alternative (instead of the docker compose service) ---
// Run twice a day from the server/ directory:
//   0 */12 * * *  cd /path/to/synapsea-core/server && node scripts/keepalive.mjs >> /var/log/synapsea-keepalive.log 2>&1
