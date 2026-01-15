import { AlertTriangle, Eye, HelpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const problems = [
  {
    icon: HelpCircle,
    title: 'Clientes esperando respostas',
    description: 'Filas intermináveis, demora no atendimento, clientes frustrados que vão embora.'
  },
  {
    icon: Eye,
    title: 'Equipe sobrecarregada',
    description: 'Tarefas repetitivas consomem tempo precioso que poderia ir para casos complexos.'
  },
  {
    icon: AlertTriangle,
    title: 'Oportunidades perdidas',
    description: 'Leads esfriando, cobranças atrasadas, informações que não chegam na hora certa.'
  }
];

const ProblemSection = () => {
  return (
    <section id="problema" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // o desafio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Sua operação tem gargalos.
              <br />
              <span className="text-muted-foreground">Nós automatizamos a solução.</span>
            </h2>
          </div>
        </ScrollReveal>
        
        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group p-6 bg-secondary/30 border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300 h-full">
                <problem.icon className="w-8 h-8 text-synapse-amber mb-4" />
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
