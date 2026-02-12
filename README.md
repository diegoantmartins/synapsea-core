# Synapsea Connect+ Landing

Landing page institucional do Connect+ com foco em infraestrutura de IA para operações B2B.

## Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Como rodar localmente

```sh
# 1) Instalar dependências
npm install

# 2) Rodar em desenvolvimento
npm run dev
```

## Supabase setup (leads)

Rode o SQL no editor do Supabase:

```sql
-- file: supabase/leads_setup.sql
```

Esse script cria a tabela `public.leads` com validações, índices e policy RLS para inserts anônimos da landing.

Configure as variáveis de ambiente (veja `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Automação WhatsApp via UAZAPI (início automático da conversa)

Com a tabela pronta, rode também o patch de status de conversa:

```sql
-- file: supabase/leads_conversation_patch.sql
```

Depois publique a Edge Function:

```sh
supabase functions deploy start-whatsapp-conversation
```

Configure os secrets da função:

```sh
supabase secrets set SUPABASE_URL=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set UAZAPI_URL=...
supabase secrets set UAZAPI_KEY=...
supabase secrets set UAZAPI_INSTANCE_ID=...
supabase secrets set UAZAPI_INSTANCE_TOKEN=...
supabase secrets set UAZAPI_WEBHOOK_SECRET=...
supabase secrets set UAZAPI_INITIAL_MESSAGE="Olá, {{name}}! Recebemos seu contato na Synapsea."
```

No painel do Supabase, crie um **Database Webhook**:
- Table: `public.leads`
- Events: `INSERT`
- URL: `https://<project-ref>.functions.supabase.co/start-whatsapp-conversation`
- Header: `x-webhook-secret: <UAZAPI_WEBHOOK_SECRET>`

A função envia a primeira mensagem pelo endpoint `POST /api/send/text` da UAZAPI e atualiza `conversation_status` no lead.

## Checklist de testes (pré-produção)

```sh
# 1) Instalar dependências
npm install

# 2) Qualidade
npm run lint
npm run test

# 3) Build de produção
npm run build

# 4) Subir via Docker
docker compose up -d --build
```

Se o seu ambiente bloquear o registry npm, rode os comandos na VPS.

## Docker (VPS)

```sh
docker compose up -d --build
```
