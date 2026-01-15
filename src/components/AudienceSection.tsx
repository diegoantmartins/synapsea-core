import { Check, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const forWho = [
  'Empresas que querem escalar atendimento sem perder qualidade',
  'Operações que precisam reduzir custos mantendo excelência',
  'Times que querem focar no que realmente importa',
  'Negócios que valorizam cada cliente'
];

const notForWho = [
  'Quem busca soluções genéricas',
  'Empresas sem processos definidos',
  'Projetos sem comprometimento'
];

const AudienceSection = () => {
  return (
    <section id="publico" className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // para quem é
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Empresas que querem crescer.
              <br />
              <span className="text-muted-foreground">Com inteligência.</span>
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
