import { MessageSquare, Wallet, Target, Database } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const useCases = [
  {
    icon: MessageSquare,
    module: 'atendimento',
    title: 'Atendimento 24/7',
    description: 'Responda clientes a qualquer hora. Resolva dúvidas instantaneamente. Escale para humanos só quando necessário.',
    results: {
      metric: '80%',
      label: 'dos atendimentos resolvidos sem intervenção'
    }
  },
  {
    icon: Wallet,
    module: 'cobrança',
    title: 'Cobrança Inteligente',
    description: 'Abordagem personalizada para cada cliente. Tom adaptativo. Mais acordos, menos desgaste.',
    results: {
      metric: '3x',
      label: 'mais eficiência na recuperação de dívidas'
    }
  },
  {
    icon: Target,
    module: 'vendas',
    title: 'Qualificação de Leads',
    description: 'Identifique os melhores leads automaticamente. Priorize quem está pronto para comprar.',
    results: {
      metric: '45%',
      label: 'mais conversões com leads qualificados'
    }
  },
  {
    icon: Database,
    module: 'suporte',
    title: 'Base de Conhecimento Viva',
    description: 'Agentes que aprendem com cada interação. Respostas cada vez mais precisas.',
    results: {
      metric: '90%',
      label: 'de satisfação nas respostas automáticas'
    }
  }
];

const UseCasesSection = () => {
  return (
    <section id="modulos" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // soluções
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Resultados reais.
              <br />
              <span className="text-muted-foreground">Não promessas.</span>
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Use case grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group p-6 bg-card border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded">
                      <useCase.icon className="w-5 h-5 text-synapse-cyan" />
                    </div>
                    <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
                      {useCase.module}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                
                {/* Results highlight */}
                <div className="bg-secondary/50 rounded p-4 border-l-2 border-synapse-cyan">
                  <div className="text-3xl font-bold text-synapse-cyan mb-1">
                    {useCase.results.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {useCase.results.label}
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

export default UseCasesSection;
