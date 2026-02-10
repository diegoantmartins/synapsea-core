-- Criar tabela leads para landing page Synapsea
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para busca rápida
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

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
