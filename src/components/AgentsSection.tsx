import { Target, Calendar, BarChart3 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const solutions = [
  {
    icon: Target,
    title: 'Prospecção Ativa',
    description: 'Encontra e engaja leads qualificados automaticamente, mesmo enquanto você dorme.',
    benefit: 'Nunca mais perca uma oportunidade',
  },
  {
    icon: Calendar,
    title: 'Agendamento Automático',
    description: 'Negocia horários, envia convites e confirma reuniões sem intervenção humana.',
    benefit: 'Sua agenda sempre cheia',
  },
  {
    icon: BarChart3,
    title: 'Qualificação Inteligente',
    description: 'Filtra leads por potencial real de compra antes de chegar ao seu time.',
    benefit: 'Só reuniões que valem a pena',
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
              Um time de vendas que
              <br />
              <span className="text-synapse-cyan">nunca para.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Três agentes trabalhando juntos para transformar leads frios em reuniões confirmadas.
            </p>
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
