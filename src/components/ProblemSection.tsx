import { AlertTriangle, Eye, HelpCircle } from 'lucide-react';

const problems = [
  {
    icon: HelpCircle,
    title: 'Confusão entre IA e improviso',
    description: 'O mercado trata LLMs como caixas mágicas. Sem estrutura, cada resposta é imprevisível.'
  },
  {
    icon: Eye,
    title: 'Automações opacas',
    description: 'Fluxos que funcionam até falharem. Sem logs, sem rastreabilidade, sem confiança.'
  },
  {
    icon: AlertTriangle,
    title: 'Incerteza operacional',
    description: 'Quando confiar? Quando intervir? A maioria dos sistemas não responde isso.'
  }
];

const ProblemSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
            // diagnóstico
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            O problema não é a IA.
            <br />
            <span className="text-muted-foreground">É a ausência de arquitetura.</span>
          </h2>
        </div>
        
        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-6 bg-secondary/30 border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300"
            >
              <problem.icon className="w-8 h-8 text-synapse-amber mb-4" />
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
