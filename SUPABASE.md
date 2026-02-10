# Supabase Integration Guide

## Configuração

### 1. Obter Credenciais Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie um projeto ou use um existente
3. Vá em **Settings** → **API Keys**
4. Copie:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon: public` → `VITE_SUPABASE_ANON_KEY`

### 2. Criar Tabela

1. Acesse o [SQL Editor](https://app.supabase.com)
2. Crie uma nova query
3. Cole o conteúdo de `supabase-schema.sql`
4. Clique **Run**

### 3. Configurar Variáveis de Ambiente

Crie arquivo `.env.local`:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=seu-anon-key-aqui
```

### 4. Deploy

```bash
npm run build
docker build -t synapsea-core-web:latest .
docker stack deploy -c docker-compose.yml synapsea_stack
```

## Schema da Tabela

A tabela `leads` stored as follows:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGSERIAL | ID único (auto-incrementado) |
| name | VARCHAR(255) | Nome completo (obrigatório) |
| email | VARCHAR(255) | Email (obrigatório) |
| company | VARCHAR(255) | Empresa (opcional) |
| whatsapp | VARCHAR(20) | WhatsApp com DDI (obrigatório) |
| problem | TEXT | Descrição do problema (obrigatório) |
| country_code | VARCHAR(2) | Código do país (ex: BR) |
| ddi | VARCHAR(5) | DDI (ex: +55) |
| source | VARCHAR(50) | Origem (default: 'landing-page') |
| status | VARCHAR(50) | Status do lead (default: 'novo') |
| created_at | TIMESTAMP | Data de criação (auto) |
| updated_at | TIMESTAMP | Data de atualização (auto) |

## RLS Policies

- ✅ `INSERT`: Anônimo pode inserir leads
- ✅ `SELECT`: Anônimo pode ler leads (dev)
- 🔒 `UPDATE/DELETE`: Apenas autenticado com permissão

## Índices

- `idx_leads_email`: Busca rápida por email
- `idx_leads_whatsapp`: Busca rápida por WhatsApp
- `idx_leads_created_at`: Busca por data
