import { Target, Calendar, BarChart3 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const solutions = [
  {
    icon: Target,
    title: 'SDR Operacional',
    description: 'Prospecta e qualifica leads com lógica de decisão e contexto contínuo.',
    benefit: 'Pipeline com critério técnico',
  },
  {
    icon: Calendar,
    title: 'Onboarding Coordenado',
    description: 'Orquestra handoff humano, agenda e integração com seu CRM.',
    benefit: 'Transições sem perda de contexto',
  },
  {
    icon: BarChart3,
    title: 'Suporte e Retenção',
    description: 'Resolve fluxos de suporte com memória operacional e regras de negócio.',
    benefit: 'Operação contínua e previsível',
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
              // como funciona
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Agentes não são scripts. São funções de negócio.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossos agentes são desenvolvidos em Node.js, com acesso controlado a bases de conhecimento (RAG),
              lógica de decisão e contexto contínuo. Cada agente executa uma função clara dentro da operação:
              SDR, suporte, onboarding ou qualificação.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-synapse-cyan" />
                RAG com base vetorial
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-synapse-cyan" />
                Controle de contexto
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-synapse-cyan" />
                Zero árvore de decisão fixa
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-synapse-cyan" />
                Comportamento adaptativo
              </li>
            </ul>
          </div>
        </ScrollReveal>
        
        {/* Solutions grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="group relative h-full">
                {/* Card */}
                <div className="h-full p-8 bg-card border border-border rounded-lg transition-all duration-300 hover:border-synapse-cyan/50 hover:shadow-[0_0_30px_hsl(176_95%_69%/0.1)]">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-synapse-cyan/10 flex items-center justify-center mb-6">
                    <solution.icon className="w-7 h-7 text-synapse-cyan" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {solution.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {solution.description}
                  </p>
                  
                  {/* Benefit tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-synapse-cyan/10 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-synapse-cyan" />
                    <span className="text-xs text-synapse-cyan font-medium">{solution.benefit}</span>
                  </div>
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
