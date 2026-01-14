import { MessageSquare, Wallet, Target, Database } from 'lucide-react';

const useCases = [
  {
    icon: MessageSquare,
    module: 'atendimento.agent',
    title: 'Atendimento com Fallback Humano',
    description: 'Agente processa até o limite de confiança. Escala automaticamente para operador quando necessário.',
    config: {
      mode: '"hybrid"',
      escalation: 'confidence < 0.7'
    }
  },
  {
    icon: Wallet,
    module: 'cobranca.agent',
    title: 'Cobrança Contextual',
    description: 'Análise de histórico, tom adaptativo, decisões baseadas em contexto do cliente.',
    config: {
      context: '"full_history"',
      tone: 'adaptive'
    }
  },
  {
    icon: Target,
    module: 'routing.agent',
    title: 'Qualificação por Intenção',
    description: 'Classificação de leads em tempo real. Roteamento baseado em intenção detectada.',
    config: {
      classifier: '"intent_v2"',
      routes: '["sales", "support", "info"]'
    }
  },
  {
    icon: Database,
    module: 'knowledge.agent',
    title: 'Agentes com Memória',
    description: 'RAG controlado. Memória persistente. Contexto limitado e auditável.',
    config: {
      rag: 'enabled',
      memory: '"session_scoped"'
    }
  }
];

const UseCasesSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
            // módulos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Sistemas, não features.
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Cada caso de uso é um módulo configurável. Regras claras. Comportamento previsível.
          </p>
        </div>
        
        {/* Use case grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group p-6 bg-card border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded">
                    <useCase.icon className="w-5 h-5 text-synapse-cyan" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {useCase.module}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {useCase.description}
              </p>
              
              {/* Config preview */}
              <div className="bg-secondary/50 rounded p-4 font-mono text-xs">
                <div className="text-muted-foreground mb-2">// config</div>
                {Object.entries(useCase.config).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-synapse-amber">{key}</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-synapse-cyan">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
