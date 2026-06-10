-- Synapsea admin + multi-tenant WhatsApp instances
-- Apply this after supabase-schema.sql

-- =========================
-- Enterprises
-- =========================
CREATE TABLE IF NOT EXISTS public.enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- WhatsApp numbers (one per UAZAPI instance/token)
-- =========================
CREATE TABLE IF NOT EXISTS public.whatsapp_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID NOT NULL REFERENCES public.enterprises(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  number VARCHAR(32) NOT NULL,
  uazapi_token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_numbers_enterprise ON public.whatsapp_numbers(enterprise_id);

-- =========================
-- Profiles: link auth.users to an enterprise
-- =========================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  enterprise_id UUID REFERENCES public.enterprises(id) ON DELETE SET NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_enterprise ON public.profiles(enterprise_id);

-- =========================
-- RLS
-- =========================
ALTER TABLE public.enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Authenticated users: read their own profile
DROP POLICY IF EXISTS "users read own profile" ON public.profiles;
CREATE POLICY "users read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Authenticated users: read their enterprise
DROP POLICY IF EXISTS "users read own enterprise" ON public.enterprises;
CREATE POLICY "users read own enterprise"
  ON public.enterprises FOR SELECT
  TO authenticated
  USING (id IN (SELECT enterprise_id FROM public.profiles WHERE id = auth.uid()));

-- Authenticated users: read whatsapp numbers from their enterprise (NOT the token)
-- Note: we never SELECT uazapi_token from the client; the server uses service role.
DROP POLICY IF EXISTS "users read own enterprise numbers" ON public.whatsapp_numbers;
CREATE POLICY "users read own enterprise numbers"
  ON public.whatsapp_numbers FOR SELECT
  TO authenticated
  USING (enterprise_id IN (SELECT enterprise_id FROM public.profiles WHERE id = auth.uid()));

-- No INSERT/UPDATE/DELETE policies for anon or authenticated on these tables:
-- all writes go through the server with the service role key.
