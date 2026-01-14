import { Check, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const forWho = [
  'Arquitetos de sistemas que exigem previsibilidade',
  'Times técnicos que precisam auditar decisões',
  'Empresas que não aceitam caixas-pretas',
  'Operações que escalam com controle'
];

const notForWho = [
  'Quem busca "chatbot rápido"',
  'Projetos sem estrutura de dados',
  'Times que evitam complexidade técnica'
];

const AudienceSection = () => {
  return (
    <section id="publico" className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // público
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Construído para quem entende.
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* For who */}
          <ScrollReveal delay={100} direction="left">
            <div className="p-8 bg-card border border-synapse-cyan/20 rounded-lg h-full">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                <span className="p-1 bg-synapse-cyan/20 rounded">
                  <Check className="w-4 h-4 text-synapse-cyan" />
                </span>
                Synapsea é para
              </h3>
              <ul className="space-y-4">
                {forWho.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-synapse-cyan mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          
          {/* Not for who */}
          <ScrollReveal delay={200} direction="right">
            <div className="p-8 bg-card border border-border rounded-lg h-full">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-muted-foreground">
                <span className="p-1 bg-secondary rounded">
                  <X className="w-4 h-4" />
                </span>
                Não é para
              </h3>
              <ul className="space-y-4">
                {notForWho.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2 flex-shrink-0" />
                    <span>{item}</span>
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

export default AudienceSection;
