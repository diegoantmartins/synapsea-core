import { Layers, Brain, Users, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const layers = [
  {
    number: '01',
    icon: Layers,
    title: 'Camada Determinística',
    subtitle: 'Previsível. Auditável.',
    items: ['Fluxos n8n', 'Regras de negócio', 'Eventos e webhooks', 'Dados estruturados'],
    color: 'synapse-grey'
  },
  {
    number: '02',
    icon: Brain,
    title: 'Inteligência Assistida',
    subtitle: 'LLMs sob controle.',
    items: ['Prompts como código', 'Limites de confiança', 'Decisões rastreáveis', 'Contexto controlado'],
    color: 'synapse-cyan'
  },
  {
    number: '03',
    icon: Users,
    title: 'Orquestração Cognitiva',
    subtitle: 'Agentes cooperando.',
    items: ['Múltiplos agentes', 'Estados de confiança', 'Escalonamento humano', 'Memória compartilhada'],
    color: 'synapse-amber'
  }
];

const ArchitectureSection = () => {
  return (
    <section id="arquitetura" className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // arquitetura
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Três camadas. Um sistema.
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Architecture diagram */}
        <div className="relative">
          {/* Flow lines connecting layers */}
          <div className="hidden lg:block absolute top-1/2 left-[calc(33.33%-40px)] w-20 h-px bg-gradient-to-r from-synapse-grey/50 to-synapse-cyan/50" />
          <div className="hidden lg:block absolute top-1/2 left-[calc(66.66%-40px)] w-20 h-px bg-gradient-to-r from-synapse-cyan/50 to-synapse-amber/50" />
          
          <div className="grid lg:grid-cols-3 gap-6">
            {layers.map((layer, index) => (
              <ScrollReveal key={index} delay={index * 150} direction="up">
                <div className="relative group h-full">
                  {/* Layer card */}
                  <div className="h-full p-8 bg-card border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300">
                    {/* Layer number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`font-mono text-4xl font-bold text-${layer.color}/30`}>
                        {layer.number}
                      </span>
                      <layer.icon className={`w-8 h-8 text-${layer.color}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{layer.subtitle}</p>
                    
                    {/* Items */}
                    <ul className="space-y-3">
                      {layer.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${layer.color}`} />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Arrow for mobile */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-synapse-cyan/50 rotate-90" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* Flow visualization */}
        <ScrollReveal delay={500}>
          <div className="mt-16 p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-center gap-4 overflow-x-auto py-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded font-mono text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-synapse-grey" />
                input
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded font-mono text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-synapse-grey" />
                validate
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded font-mono text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
                agent.process()
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded font-mono text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-synapse-cyan" />
                evaluate
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded font-mono text-sm whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-synapse-amber" />
                output
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ArchitectureSection;
