-- Keep-alive table for preventing Supabase free-tier auto-pause.
-- The keepalive script writes a row and prunes old ones on a schedule,
-- generating regular DB activity. This table holds NO business data.

CREATE TABLE IF NOT EXISTS public.keepalive (
  id BIGSERIAL PRIMARY KEY,
  pinged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  note TEXT
);

CREATE INDEX IF NOT EXISTS idx_keepalive_pinged_at ON public.keepalive(pinged_at);

-- Enable RLS with NO policies: only the service role (which bypasses RLS)
-- can read/write this table. anon/authenticated get nothing.
ALTER TABLE public.keepalive ENABLE ROW LEVEL SECURITY;
