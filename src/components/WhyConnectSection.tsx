import { Check, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
const stats = [
  {
    title: 'Controle centralizado',
    description: 'Conversas, agentes e humanos operando no mesmo fluxo.',
  },
  {
    title: 'Resposta garantida',
    description: 'Nenhuma mensagem se perde no caminho.',
  },
  {
    title: 'Memória operacional',
    description: 'Histórico e contexto disponíveis para decisões rápidas.',
  },
];

const withConnect = [
  'Handoff humano dentro do mesmo fluxo operacional',
  'Contexto preservado do primeiro toque ao fechamento',
  'Agentes com lógica de decisão e memória contínua',
  'Visibilidade em tempo real de cada conversa',
  'CRM atualizado sem retrabalho',
];

const withoutConnect = [
  'Handoffs desconectados e perda de contexto',
  'Mensagens perdidas em canais isolados',
  'Decisões sem histórico e sem rastreio',
  'Equipe apagando incêndios operacionais',
  'CRM inconsistente e desatualizado',
];

const WhyConnectSection = () => {
  return (
    <section id="porque" className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // a diferença
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Mais do que omnicanal. Um sistema de controle.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              O Connect+ centraliza conversas, agentes de IA e humanos em um único ambiente operacional.
              Nenhuma mensagem se perde. Nenhum lead fica sem resposta. Nenhuma decisão acontece no escuro.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-6 border border-synapse-cyan/30 rounded-full bg-secondary/30 text-sm text-synapse-cyan">
              IA + Humano no mesmo fluxo operacional
            </div>
          </div>
        </ScrollReveal>
        
        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-card border border-border rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-synapse-cyan mb-3">
                  {stat.title}
                </div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* With Connect+ */}
          <ScrollReveal delay={200}>
            <div className="p-8 bg-card border-2 border-synapse-cyan/30 rounded-lg h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-synapse-cyan">Com Connect+</span>
              </h3>
              <ul className="space-y-4">
                {withConnect.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-synapse-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          
          {/* Without Connect+ */}
          <ScrollReveal delay={300}>
            <div className="p-8 bg-card border border-border rounded-lg h-full opacity-70">
              <h3 className="text-xl font-bold mb-6 text-muted-foreground">
                Sem Connect+
              </h3>
              <ul className="space-y-4">
                {withoutConnect.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-synapse-amber flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyConnectSection;
