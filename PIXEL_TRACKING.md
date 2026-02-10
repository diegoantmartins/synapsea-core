# 📊 Pixel Tracking - Synapsea Landing Page

## Visão Geral

O **pixel de rastreamento** captura automaticamente informações sobre cada visitante:
- 📱 **Dispositivo**: tipo (mobile/tablet/desktop), resolução de tela
- 🌐 **Browser & SO**: navegador, sistema operacional, versão
- 🔍 **Origem de Tráfego**: referrer, UTM parameters, fonte
- 🕐 **Context**: timezone, idioma, timestamp

## Dados Capturados

### Device Info
| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `device_type` | Tipo do dispositivo | `mobile`, `tablet`, `desktop` |
| `browser` | Navegador utilizado | `Chrome`, `Safari`, `Firefox` |
| `os` | Sistema operacional | `Windows`, `macOS`, `iOS`, `Android` |
| `os_version` | Versão do SO | `14.2`, `10.0` |
| `screen_resolution` | Resolução da tela | `1920x1080` |
| `user_agent` | User Agent completo | `Mozilla/5.0...` |

### Traffic Source
| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `source` | Origem detectada | `google`, `facebook`, `direct` |
| `referrer` | URL de origem | `https://google.com/search?...` |
| `utm_source` | Campanha (UTM) | `google_ads`, `newsletter` |
| `utm_medium` | Meio (UTM) | `cpc`, `email`, `organic` |
| `utm_campaign` | Campanha em si | `spring_sale_2024` |
| `utm_content` | Conteúdo específico | `banner_hero` |
| `utm_term` | Termo buscado | `ia para vendas` |

### Context
| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `timezone` | Timezone do visitante | `America/Sao_Paulo` |
| `language` | Idioma do navegador | `pt-BR`, `en-US` |
| `created_at` | Timestamp da submissão | `2024-02-10T14:30:00Z` |

## Como Usar

### 1. Hook `useDeviceTracking`

```tsx
import { useDeviceTracking } from '@/hooks/use-device-tracking';

function MyComponent() {
  const deviceInfo = useDeviceTracking();

  useEffect(() => {
    if (deviceInfo) {
      console.log('Device:', deviceInfo.device_type);
      console.log('Browser:', deviceInfo.browser);
      console.log('Source:', deviceInfo.source);
      console.log('UTM Campaign:', deviceInfo.utmCampaign);
    }
  }, [deviceInfo]);

  return <div>{deviceInfo?.browser} on {deviceInfo?.os}</div>;
}
```

### 2. Dados Automáticos no Formulário

O `ContactForm` envia automaticamente todas essas informações:

```jsx
<ContactForm /> // Captura e envia device info automaticamente
```

## Setup Supabase

### Se você JÁ tem a tabela `leads`

Execute este SQL para adicionar as colunas de tracking:

```sql
-- Adicionar colunas de device tracking
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS device_type VARCHAR(20),
ADD COLUMN IF NOT EXISTS browser VARCHAR(50),
ADD COLUMN IF NOT EXISTS os VARCHAR(50),
ADD COLUMN IF NOT EXISTS os_version VARCHAR(50),
ADD COLUMN IF NOT EXISTS screen_resolution VARCHAR(20),
ADD COLUMN IF NOT EXISTS timezone VARCHAR(100),
ADD COLUMN IF NOT EXISTS language VARCHAR(10),
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS source_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_term VARCHAR(255),
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_leads_device_type ON public.leads(device_type);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON public.leads(utm_source);
```

### Se você QUER RECRIAR tudo

Use o SQL em `supabase-schema.sql` que já contém todas as colunas.

## Análises Possíveis

Com os dados capturados, você pode:

### 📱 Segmentação por Dispositivo
```sql
SELECT device_type, COUNT(*) as leads
FROM leads
GROUP BY device_type;
-- Result: mobile: 65%, tablet: 10%, desktop: 25%
```

### 🌐 Análise de Browser
```sql
SELECT browser, COUNT(*) as leads
FROM leads
GROUP BY browser
ORDER BY leads DESC;
```

### 🔍 Performance por Fonte
```sql
SELECT 
  source,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'qualificado' THEN 1 END) as qualified
FROM leads
GROUP BY source;
```

### 📊 Campanha (UTM)
```sql
SELECT 
  utm_campaign,
  utm_medium,
  COUNT(*) as leads
FROM leads
WHERE utm_campaign IS NOT NULL
GROUP BY utm_campaign, utm_medium;
```

### 🌍 Geolocalização (por Timezone)
```sql
SELECT DISTINCT timezone
FROM leads
ORDER BY created_at DESC
LIMIT 20;
```

## Detecção de Fonte

O hook `useDeviceTracking` detecta automaticamente:
- ✅ Google (google.com)
- ✅ Facebook (facebook.com)
- ✅ Instagram (instagram.com)
- ✅ LinkedIn (linkedin.com)
- ✅ Twitter/X (twitter.com, x.com)
- ✅ YouTube (youtube.com)
- ✅ WhatsApp (whatsapp.com)
- ✅ Telegram (telegram.org)
- ✅ Direct (sem referrer)
- ✅ UTM parameters (utm_source sobrescreve)

## URL com UTM Parameters

Para rastrear campanhas, use:

```
https://go.synapsea.com.br
  ?utm_source=google_ads
  &utm_medium=cpc
  &utm_campaign=ia_vendas_feb2024
  &utm_content=banner_hero
  &utm_term=agente_ia

Resultado:
  utm_source: "google_ads"
  utm_medium: "cpc"
  utm_campaign: "ia_vendas_feb2024"
  utm_content: "banner_hero"
  utm_term: "agente_ia"
```

## Dashboard de Analytics (Supabase)

Você pode criar uma view no Supabase para visualizar em tempo real:

```sql
CREATE OR REPLACE VIEW leads_analytics AS
SELECT
  DATE(created_at) as date,
  device_type,
  browser,
  os,
  source,
  utm_campaign,
  COUNT(*) as lead_count,
  COUNT(CASE WHEN status = 'qualificado' THEN 1 END) as qualified_count
FROM leads
GROUP BY DATE(created_at), device_type, browser, os, source, utm_campaign
ORDER BY created_at DESC;
```

## Privacy & GDPR

⚠️ **Importante**: Os dados de User Agent e Referrer podem conter informações sensíveis. Considere:
- 🔒 Criptografar dados sensíveis
- 📋 Ter política de privacidade clara
- 🗑️ Implementar data retention policy (deletar leads antigos)
- 🔐 Usar apenas dados necessários

## Conclusão

Com o pixel de rastreamento, você tem visibilidade completa:
- **Onde**: De qual origem vieram
- **Quem**: Tipo de dispositivo/navegador
- **Quando**: Timezone e horário
- **Como**: Qual campanha/UTM
