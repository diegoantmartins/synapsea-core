alter table public.leads
  add column if not exists conversation_status text not null default 'pending',
  add column if not exists conversation_started_at timestamptz,
  add column if not exists conversation_error text;

create index if not exists leads_conversation_status_idx on public.leads (conversation_status);
