-- Synapsea landing leads schema + policies
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  email text not null check (char_length(trim(email)) between 6 and 255),
  company text,
  use_case text not null check (char_length(trim(use_case)) between 10 and 1000),
  phone_country_code text not null check (phone_country_code ~ '^\+[0-9]{1,4}$'),
  phone_number text not null check (phone_number ~ '^[0-9]{6,20}$'),
  phone_e164 text not null check (phone_e164 ~ '^\+[0-9]{7,24}$'),
  source text not null default 'landing-page',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- anonymous users may only insert new leads from the landing form
create policy if not exists "Allow anonymous lead inserts"
on public.leads
for insert
to anon
with check (source = 'landing-page');

-- no select/update/delete permissions for anon role
revoke all on table public.leads from anon;
grant insert on table public.leads to anon;
