import { Radar, Handshake, Network } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const agents = [
  {
    id: 'HUNTER_V1',
    icon: Radar,
    title: 'HUNTER_V1',
    description: 'Engajamento ativo de leads frios. Qualificação automática via LLM com critérios customizados.',
    status: 'SCANNING',
  },
  {
    id: 'CLOSER_CORE',
    icon: Handshake,
    title: 'CLOSER_CORE',
    description: 'Gestão de agenda e follow-up persistente até a resposta definitiva. Zero leads esquecidos.',
    status: 'ENGAGED',
  },
  {
    id: 'DATA_NODE',
    icon: Network,
    title: 'DATA_NODE',
    description: 'Estruturação de dados não-estruturados (conversas) para JSON/CRM. Inteligência em cada interação.',
    status: 'SYNCING',
  },
];

const AgentsSection = () => {
  return (
    <section id="agentes" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // arquitetura swarm
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Arquitetura de Enxame
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              (Swarm Intelligence)
            </p>
          </div>
        </ScrollReveal>
        
        {/* Agents grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <ScrollReveal key={agent.id} delay={index * 150}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="h-full p-8 bg-card border border-synapse-cyan/20 rounded-lg transition-all duration-300 hover:border-synapse-cyan hover:shadow-[0_0_30px_hsl(176_95%_69%/0.2)]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <agent.icon className="w-10 h-10 text-synapse-cyan" />
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
                      <span className="text-synapse-cyan">{agent.status}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-mono text-xl font-bold mb-4 text-foreground">
                    {agent.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
