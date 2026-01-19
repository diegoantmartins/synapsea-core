import { Check, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  { value: 80, suffix: '%', label: 'dos leads respondem em menos de 1 minuto' },
  { value: 3, suffix: 'x', label: 'mais reuniões agendadas por mês' },
  { value: 0, suffix: '', label: 'leads esquecidos ou perdidos', prefix: '' },
];

const withConnect = [
  'Resposta instantânea a qualquer hora',
  'Follow-up automático e persistente',
  'Qualificação inteligente de cada lead',
  'Agenda preenchida com reuniões reais',
  'Sua equipe focada em fechar negócios',
];

const withoutConnect = [
  'Leads esperando horas por resposta',
  'Follow-ups esquecidos ou atrasados',
  'Qualificação manual e inconsistente',
  'Oportunidades perdidas todo dia',
  'Equipe sobrecarregada com tarefas repetitivas',
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
              Chega de perder vendas
              <br />
              <span className="text-synapse-cyan">por falta de follow-up.</span>
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 bg-card border border-border rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-synapse-cyan mb-2">
                  {stat.prefix}
                  <AnimatedCounter end={stat.value} duration={2000} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
