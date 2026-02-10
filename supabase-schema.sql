-- Criar tabela leads para landing page Synapsea (COM DEVICE TRACKING)
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  whatsapp VARCHAR(20) NOT NULL,
  problem TEXT NOT NULL,
  country_code VARCHAR(2),
  ddi VARCHAR(5),
  source VARCHAR(50) DEFAULT 'landing-page',
  status VARCHAR(50) DEFAULT 'novo' CHECK (status IN ('novo', 'qualificado', 'negociando', 'fechado', 'arquivado')),
  
  -- Device Tracking
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50),
  os_version VARCHAR(50),
  screen_resolution VARCHAR(20),
  timezone VARCHAR(100),
  language VARCHAR(10),
  referrer TEXT,
  source_campaign VARCHAR(255),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para busca rápida
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_device_type ON public.leads(device_type);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);

-- Adicionar colunas para geolocalização e rede (compatível com implementações client-side)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS ip_hash VARCHAR(128),
  ADD COLUMN IF NOT EXISTS city VARCHAR(128),
  ADD COLUMN IF NOT EXISTS region VARCHAR(128),
  ADD COLUMN IF NOT EXISTS geo_country VARCHAR(128),
  ADD COLUMN IF NOT EXISTS geo_country_code VARCHAR(8),
  ADD COLUMN IF NOT EXISTS latitude VARCHAR(32),
  ADD COLUMN IF NOT EXISTS longitude VARCHAR(32),
  ADD COLUMN IF NOT EXISTS postal_code VARCHAR(32),
  ADD COLUMN IF NOT EXISTS org VARCHAR(255),
  ADD COLUMN IF NOT EXISTS connection_type VARCHAR(32),
  ADD COLUMN IF NOT EXISTS connection_downlink VARCHAR(32),
  ADD COLUMN IF NOT EXISTS device_memory VARCHAR(32),
  ADD COLUMN IF NOT EXISTS hardware_concurrency INTEGER;

-- Índices para buscas frequentes
CREATE INDEX IF NOT EXISTS idx_leads_city ON public.leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_geo_country ON public.leads(geo_country);
CREATE INDEX IF NOT EXISTS idx_leads_ip_hash ON public.leads(ip_hash);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy para INSERT anônimo (landing page)
DROP POLICY IF EXISTS "Permitir insert anônimo em leads" ON public.leads;
CREATE POLICY "Permitir insert anônimo em leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy para SELECT anônimo (dev)
DROP POLICY IF EXISTS "Permitir select durante dev" ON public.leads;
CREATE POLICY "Permitir select durante dev" 
  ON public.leads
  FOR SELECT
  TO anon
  USING (true);

-- Grant permissões ao role anon
GRANT INSERT ON public.leads TO anon;
GRANT SELECT ON public.leads TO anon;
