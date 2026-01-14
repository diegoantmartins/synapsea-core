import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Terminal, Layers, Brain, Users, Settings, Code, FileCode, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CircuitBackground from '@/components/CircuitBackground';
import ScrollReveal from '@/components/ScrollReveal';

const docSections = [
  {
    id: 'overview',
    icon: Terminal,
    title: 'Visão Geral',
    content: `# Synapsea Platform

A Synapsea é uma plataforma de orquestração de agentes de IA construída sobre três princípios fundamentais:

1. **Determinismo** - Fluxos previsíveis e auditáveis
2. **Observabilidade** - Decisões rastreáveis em tempo real
3. **Controle** - Limites claros e escalonamento humano

## Quick Start

\`\`\`bash
# Instalar CLI
npm install -g @synapsea/cli

# Inicializar projeto
synapsea init my-agent

# Configurar ambiente
cd my-agent && synapsea config
\`\`\`

## Requisitos

- Node.js 18+
- n8n (self-hosted ou cloud)
- API keys dos LLMs desejados`,
  },
  {
    id: 'architecture',
    icon: Layers,
    title: 'Arquitetura',
    content: `# Arquitetura de Camadas

A Synapsea opera em três camadas distintas:

## Camada 1: Determinística

\`\`\`yaml
# flow.config.yaml
name: customer_intake
trigger: webhook
steps:
  - validate_input
  - enrich_data
  - route_to_agent
fallback: human_queue
\`\`\`

Esta camada garante:
- Execução previsível
- Logs completos
- Rollback automático

## Camada 2: Inteligência Assistida

\`\`\`typescript
// agent.config.ts
export const config = {
  model: "gpt-4-turbo",
  temperature: 0.3,
  max_tokens: 2000,
  confidence_threshold: 0.85,
  prompt_version: "v2.3.1"
}
\`\`\`

## Camada 3: Orquestração Cognitiva

\`\`\`typescript
// orchestrator.ts
const agents = [
  { role: "classifier", priority: 1 },
  { role: "responder", priority: 2 },
  { role: "validator", priority: 3 }
];

orchestrator.run(agents, {
  consensus: "majority",
  escalation: "confidence < 0.7"
});
\`\`\``,
  },
  {
    id: 'agents',
    icon: Brain,
    title: 'Agentes',
    content: `# Configuração de Agentes

## Definindo um Agente

\`\`\`typescript
// agents/customer-support.ts
import { Agent } from '@synapsea/core';

export const supportAgent = new Agent({
  name: 'customer_support',
  model: 'gpt-4-turbo',
  
  // Limites de confiança
  confidence: {
    threshold: 0.85,
    action_below: 'escalate'
  },
  
  // Contexto controlado
  context: {
    source: 'rag',
    max_tokens: 4000,
    refresh: 'session'
  },
  
  // Comportamento
  behavior: {
    tone: 'professional',
    language: 'pt-BR',
    max_turns: 10
  }
});
\`\`\`

## Estados do Agente

| Estado | Descrição | Ação |
|--------|-----------|------|
| READY | Pronto para processar | - |
| PROCESSING | Em execução | Monitor |
| LOW_CONFIDENCE | Abaixo do threshold | Escalar |
| ESCALATED | Transferido | Humano |

## Métricas Disponíveis

\`\`\`typescript
agent.metrics.get({
  confidence_avg: true,
  escalation_rate: true,
  response_time_p95: true,
  token_usage: true
});
\`\`\``,
  },
  {
    id: 'orchestration',
    icon: Users,
    title: 'Orquestração',
    content: `# Orquestração Multi-Agente

## Pipeline de Agentes

\`\`\`typescript
// pipelines/support.ts
import { Pipeline } from '@synapsea/orchestrator';

const supportPipeline = new Pipeline({
  name: 'customer_support_v2',
  
  stages: [
    {
      agent: 'classifier',
      output: 'intent',
      timeout: 5000
    },
    {
      agent: 'router',
      input: 'intent',
      output: 'destination'
    },
    {
      agent: 'responder',
      condition: 'destination === "auto"',
      fallback: 'human_queue'
    }
  ],
  
  consensus: {
    type: 'confidence_weighted',
    min_agreement: 0.8
  }
});
\`\`\`

## Escalonamento

\`\`\`yaml
# escalation.config.yaml
rules:
  - condition: confidence < 0.7
    action: escalate_to_human
    priority: high
    
  - condition: sentiment === "angry"
    action: escalate_to_supervisor
    priority: critical
    
  - condition: attempts > 3
    action: transfer_to_specialist
    context: full_history
\`\`\``,
  },
  {
    id: 'n8n',
    icon: Zap,
    title: 'Integração n8n',
    content: `# Integração com n8n

## Configurando Webhook

\`\`\`typescript
// n8n/webhook.ts
import { N8nIntegration } from '@synapsea/n8n';

const n8n = new N8nIntegration({
  baseUrl: process.env.N8N_URL,
  apiKey: process.env.N8N_API_KEY
});

// Registrar webhook
await n8n.registerWebhook({
  path: '/synapsea/intake',
  method: 'POST',
  workflow: 'customer_intake'
});
\`\`\`

## Workflow Template

\`\`\`json
{
  "name": "Synapsea Customer Intake",
  "nodes": [
    {
      "type": "webhook",
      "parameters": {
        "path": "synapsea/intake"
      }
    },
    {
      "type": "synapsea/agent",
      "parameters": {
        "agent": "classifier",
        "timeout": 10000
      }
    },
    {
      "type": "switch",
      "parameters": {
        "rules": [
          { "output": "auto", "condition": "confidence >= 0.85" },
          { "output": "human", "condition": "confidence < 0.85" }
        ]
      }
    }
  ]
}
\`\`\``,
  },
  {
    id: 'rag',
    icon: Database,
    title: 'RAG & Memória',
    content: `# RAG e Gestão de Memória

## Configurando RAG

\`\`\`typescript
// rag/config.ts
import { RAG } from '@synapsea/rag';

const ragConfig = new RAG({
  // Fonte de dados
  sources: [
    { type: 'postgres', connection: process.env.DB_URL },
    { type: 'notion', token: process.env.NOTION_TOKEN }
  ],
  
  // Embeddings
  embeddings: {
    model: 'text-embedding-3-small',
    dimensions: 1536
  },
  
  // Retrieval
  retrieval: {
    top_k: 5,
    threshold: 0.75,
    rerank: true
  }
});
\`\`\`

## Gestão de Memória

\`\`\`typescript
// memory/session.ts
const sessionMemory = new Memory({
  type: 'session',
  
  // Limites
  max_turns: 20,
  max_tokens: 8000,
  
  // Persistência
  persistence: {
    driver: 'redis',
    ttl: 3600
  },
  
  // Auditoria
  audit: {
    enabled: true,
    log_level: 'detailed'
  }
});
\`\`\``,
  },
  {
    id: 'observability',
    icon: Code,
    title: 'Observabilidade',
    content: `# Observabilidade e Auditoria

## Dashboard de Métricas

\`\`\`typescript
// observability/metrics.ts
import { Metrics } from '@synapsea/observe';

const dashboard = new Metrics({
  agents: ['classifier', 'responder', 'validator'],
  
  collect: {
    confidence_distribution: true,
    latency_percentiles: [50, 95, 99],
    token_usage: true,
    escalation_rate: true
  },
  
  export: {
    prometheus: true,
    grafana: true,
    custom_webhook: process.env.METRICS_WEBHOOK
  }
});
\`\`\`

## Logs Estruturados

\`\`\`json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "agent": "classifier",
  "session": "abc-123",
  "input_hash": "sha256:...",
  "output": {
    "intent": "billing_inquiry",
    "confidence": 0.92
  },
  "latency_ms": 245,
  "tokens": {
    "input": 150,
    "output": 45
  }
}
\`\`\`

## Alertas

\`\`\`yaml
# alerts.config.yaml
rules:
  - name: low_confidence_spike
    condition: avg(confidence) < 0.7 for 5m
    severity: warning
    notify: [slack, email]
    
  - name: high_latency
    condition: p95(latency) > 5000ms
    severity: critical
    notify: [pagerduty]
\`\`\``,
  },
  {
    id: 'api',
    icon: FileCode,
    title: 'API Reference',
    content: `# API Reference

## Endpoints Principais

### POST /api/v1/agents/{agent}/invoke

Invoca um agente específico.

\`\`\`bash
curl -X POST https://api.synapsea.io/v1/agents/classifier/invoke \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "Preciso de ajuda com minha fatura",
    "session_id": "abc-123",
    "context": {
      "customer_id": "cust_456"
    }
  }'
\`\`\`

**Response:**

\`\`\`json
{
  "id": "inv_789",
  "agent": "classifier",
  "output": {
    "intent": "billing_inquiry",
    "sub_intent": "invoice_question",
    "confidence": 0.94
  },
  "metadata": {
    "latency_ms": 312,
    "tokens_used": 195,
    "model": "gpt-4-turbo"
  }
}
\`\`\`

### GET /api/v1/sessions/{session_id}

Recupera histórico de sessão.

### POST /api/v1/pipelines/{pipeline}/run

Executa um pipeline completo.

## Rate Limits

| Plano | Requests/min | Tokens/dia |
|-------|--------------|------------|
| Starter | 60 | 100k |
| Pro | 300 | 1M |
| Enterprise | Custom | Custom |`,
  },
  {
    id: 'config',
    icon: Settings,
    title: 'Configuração',
    content: `# Configuração Avançada

## Variáveis de Ambiente

\`\`\`bash
# .env.production
SYNAPSEA_API_KEY=sk_live_...
SYNAPSEA_ENV=production

# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# n8n Integration
N8N_URL=https://n8n.yourcompany.com
N8N_API_KEY=...

# Observability
PROMETHEUS_ENDPOINT=...
GRAFANA_API_KEY=...

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
\`\`\`

## synapsea.config.ts

\`\`\`typescript
import { defineConfig } from '@synapsea/config';

export default defineConfig({
  // Projeto
  project: {
    name: 'my-company-agents',
    version: '2.1.0'
  },
  
  // Defaults globais
  defaults: {
    model: 'gpt-4-turbo',
    temperature: 0.3,
    max_tokens: 2000,
    timeout: 30000
  },
  
  // Segurança
  security: {
    rate_limit: {
      requests_per_minute: 100,
      tokens_per_day: 500000
    },
    ip_whitelist: ['10.0.0.0/8'],
    audit_retention_days: 90
  },
  
  // Integrações
  integrations: {
    n8n: { enabled: true },
    slack: { enabled: true },
    prometheus: { enabled: true }
  }
});
\`\`\``,
  },
];

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const activeDoc = docSections.find((s) => s.id === activeSection);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    return lines.map((line, index) => {
      // Code block start
      if (line.startsWith('```') && !inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3);
        codeContent = '';
        return null;
      }

      // Code block end
      if (line === '```' && inCodeBlock) {
        inCodeBlock = false;
        const code = codeContent;
        return (
          <div key={index} className="my-4 rounded-lg overflow-hidden border border-border">
            <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground">{codeLanguage || 'code'}</span>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-synapse-amber/50" />
                <span className="w-3 h-3 rounded-full bg-synapse-cyan/50" />
                <span className="w-3 h-3 rounded-full bg-synapse-grey/30" />
              </div>
            </div>
            <pre className="p-4 bg-synapse-abyssal overflow-x-auto">
              <code className="text-sm font-mono text-synapse-grey">{code}</code>
            </pre>
          </div>
        );
      }

      // Inside code block
      if (inCodeBlock) {
        codeContent += line + '\n';
        return null;
      }

      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-medium mt-4 mb-2 text-foreground">
            {line.slice(4)}
          </h3>
        );
      }

      // Table
      if (line.startsWith('|')) {
        const cells = line.split('|').filter(Boolean).map((cell) => cell.trim());
        const isHeader = lines[index + 1]?.includes('---');
        if (line.includes('---')) return null;
        
        return (
          <tr key={index} className={isHeader ? 'border-b border-border' : ''}>
            {cells.map((cell, i) => (
              isHeader ? (
                <th key={i} className="px-4 py-2 text-left text-sm font-semibold">{cell}</th>
              ) : (
                <td key={i} className="px-4 py-2 text-sm text-muted-foreground">{cell}</td>
              )
            ))}
          </tr>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="flex items-start gap-2 text-muted-foreground mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-synapse-cyan mt-2 flex-shrink-0" />
            {line.slice(2)}
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+)\.\s(.+)/);
        if (match) {
          return (
            <li key={index} className="flex items-start gap-3 text-muted-foreground mb-1">
              <span className="text-synapse-cyan font-mono text-sm">{match[1]}.</span>
              <span dangerouslySetInnerHTML={{ __html: match[2].replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </li>
          );
        }
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-4" />;
      }

      // Regular paragraphs with inline code and bold
      const formattedLine = line
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-secondary rounded text-synapse-cyan text-sm font-mono">$1</code>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>');

      return (
        <p
          key={index}
          className="text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CircuitBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="synapseGhost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <Terminal className="w-4 h-4 text-synapse-cyan" />
                <span className="font-mono text-sm">synapsea/docs</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
              v2.1.0
            </div>
          </div>
        </header>

        <div className="flex pt-16">
          {/* Sidebar */}
          <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-background/50 backdrop-blur-sm overflow-y-auto hidden lg:block">
            <nav className="p-4 space-y-1">
              {docSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    activeSection === section.id
                      ? 'bg-synapse-cyan/10 text-synapse-cyan'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <section.icon className="w-4 h-4 flex-shrink-0" />
                  {section.title}
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile nav */}
          <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border overflow-x-auto">
            <div className="flex gap-2 p-4">
              {docSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors',
                    activeSection === section.id
                      ? 'bg-synapse-cyan/10 text-synapse-cyan'
                      : 'text-muted-foreground bg-secondary/30'
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <ScrollReveal>
                {/* Terminal window header */}
                <div className="border border-border rounded-t-lg bg-secondary/30 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-synapse-amber/70" />
                        <span className="w-3 h-3 rounded-full bg-synapse-cyan/70" />
                        <span className="w-3 h-3 rounded-full bg-synapse-grey/30" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {activeDoc?.title.toLowerCase().replace(' ', '-')}.md
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span>UTF-8</span>
                      <span>|</span>
                      <span>Markdown</span>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="border-x border-b border-border rounded-b-lg bg-card p-8">
                  {activeDoc && renderContent(activeDoc.content)}
                </div>
              </ScrollReveal>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
