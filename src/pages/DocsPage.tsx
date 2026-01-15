import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Terminal, MessageSquare, Wallet, Target, Database, Zap, Shield, BarChart3, Headphones } from 'lucide-react';
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

A Synapsea é uma plataforma de agentes de IA que resolve problemas reais do seu negócio:

1. **Atendimento 24/7** - Seus clientes nunca ficam sem resposta
2. **Escala inteligente** - Transferência para humanos quando necessário
3. **Resultados mensuráveis** - Métricas claras de performance

## Por que Synapsea?

- Redução de até **80%** no tempo de resposta
- Aumento de **3x** na eficiência da equipe
- Satisfação do cliente acima de **90%**

## Como começar

Entre em contato com nossa equipe. Analisamos sua operação e projetamos a solução ideal para seu negócio.

Sem custos ocultos. Sem complexidade desnecessária.`,
  },
  {
    id: 'atendimento',
    icon: Headphones,
    title: 'Atendimento',
    content: `# Atendimento Automatizado

Transforme seu atendimento ao cliente com agentes de IA que entendem, resolvem e escalam.

## O que resolvemos

- Filas de espera intermináveis
- Clientes frustrados esperando respostas
- Equipe sobrecarregada com perguntas repetitivas

## Como funciona

1. Cliente entra em contato por qualquer canal
2. Agente identifica a intenção e contexto
3. Resolve automaticamente ou transfere com todo histórico

## Resultados esperados

| Métrica | Antes | Depois |
|---------|-------|--------|
| Tempo médio de resposta | 4 horas | 30 segundos |
| Taxa de resolução | 40% | 85% |
| Satisfação | 3.2/5 | 4.7/5 |

## Diferenciais

- Respostas personalizadas baseadas no histórico
- Integração com seus sistemas existentes
- Transferência suave para humanos quando necessário`,
  },
  {
    id: 'cobranca',
    icon: Wallet,
    title: 'Cobrança',
    content: `# Cobrança Inteligente

Recupere mais com menos esforço. Abordagem personalizada para cada cliente.

## O problema

- Cobrança manual é lenta e custosa
- Abordagem genérica gera conflitos
- Difícil escalar sem perder qualidade

## A solução Synapsea

Agentes que entendem o contexto do cliente:

- **Histórico de pagamentos** - Sabe quem é bom pagador
- **Tom adaptativo** - Ajusta comunicação ao perfil
- **Negociação inteligente** - Propõe acordos viáveis

## Resultados

- **3x** mais eficiência na recuperação
- **50%** menos conflitos com clientes
- **ROI positivo** no primeiro mês

## Funcionalidades

- Contato multicanal (WhatsApp, SMS, Email)
- Lembretes automatizados
- Propostas de acordo personalizadas
- Relatórios de performance`,
  },
  {
    id: 'vendas',
    icon: Target,
    title: 'Qualificação',
    content: `# Qualificação de Leads

Identifique os melhores leads automaticamente. Foque energia onde importa.

## O desafio

Sua equipe comercial perde tempo com:

- Leads que não estão prontos
- Informações incompletas
- Priorização manual e subjetiva

## Como resolvemos

O agente Synapsea:

1. **Captura** - Coleta informações de forma natural
2. **Qualifica** - Pontua baseado em critérios do seu negócio
3. **Prioriza** - Entrega os melhores leads primeiro

## Impacto

| Antes | Depois |
|-------|--------|
| 100 leads/dia para analisar | 20 leads qualificados/dia |
| 5% de conversão | 23% de conversão |
| 2h por fechamento | 45min por fechamento |

## Integração

Conecta com seu CRM existente. Seus vendedores recebem leads prontos com todas as informações.`,
  },
  {
    id: 'conhecimento',
    icon: Database,
    title: 'Base de Conhecimento',
    content: `# Base de Conhecimento Viva

Agentes que aprendem com cada interação. Respostas cada vez mais precisas.

## O problema comum

- FAQs desatualizados
- Informação espalhada em vários lugares
- Respostas inconsistentes entre atendentes

## A solução

Uma base de conhecimento que:

- **Aprende** com cada atendimento
- **Atualiza** automaticamente
- **Padroniza** respostas

## Como funciona

1. Conectamos suas fontes de informação
2. Agente usa o conhecimento para responder
3. Supervisores validam e melhoram
4. Base evolui continuamente

## Benefícios

- **90%** de precisão nas respostas
- Informação sempre atualizada
- Menos retrabalho da equipe`,
  },
  {
    id: 'integracao',
    icon: Zap,
    title: 'Integrações',
    content: `# Integrações

Synapsea conecta com os sistemas que você já usa.

## Canais de Atendimento

- WhatsApp Business
- Instagram Direct
- Facebook Messenger
- Chat no site
- Email
- Telefone (URA inteligente)

## CRMs e ERPs

- Salesforce
- HubSpot
- Pipedrive
- RD Station
- Sistemas próprios via API

## Outras Integrações

- Google Sheets / Excel
- Slack / Microsoft Teams
- Sistemas de cobrança
- Plataformas de e-commerce

## API Aberta

Para integrações customizadas, oferecemos API RESTful completa com documentação.`,
  },
  {
    id: 'seguranca',
    icon: Shield,
    title: 'Segurança',
    content: `# Segurança e Privacidade

Seus dados protegidos com os mais altos padrões.

## Conformidade

- **LGPD** - 100% compatível
- **SOC 2** - Certificação em andamento
- **Criptografia** - Dados em trânsito e em repouso

## Controle de Acesso

- Autenticação multifator
- Níveis de permissão granulares
- Logs de auditoria completos

## Privacidade

- Dados processados no Brasil
- Sem compartilhamento com terceiros
- Exclusão sob demanda

## SLA

- **99.9%** de uptime garantido
- Suporte prioritário
- Backup contínuo`,
  },
  {
    id: 'metricas',
    icon: BarChart3,
    title: 'Métricas',
    content: `# Dashboard de Métricas

Visibilidade total da operação. Decisões baseadas em dados.

## Métricas de Atendimento

- Volume de atendimentos por canal
- Tempo médio de resposta
- Taxa de resolução automática
- Satisfação do cliente (NPS/CSAT)

## Métricas de Performance

- Taxa de escalonamento para humanos
- Motivos de escalonamento
- Performance por agente
- Tendências ao longo do tempo

## Relatórios

- Relatórios diários automáticos
- Exportação para Excel/PDF
- Integração com BI existente

## Alertas

- Notificações em tempo real
- Alertas de anomalias
- Monitoramento 24/7`,
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
        const formattedItem = line.slice(2)
          .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>');
        return (
          <li key={index} className="flex items-start gap-2 text-muted-foreground mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-synapse-cyan mt-2 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formattedItem }} />
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
              Documentação
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
                      <span>Synapsea</span>
                      <span>|</span>
                      <span>Docs</span>
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
