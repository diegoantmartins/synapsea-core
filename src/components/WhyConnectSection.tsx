import ScrollReveal from './ScrollReveal';

const WhyConnectSection = () => {
  return (
    <section id="porque" className="relative py-32 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Persuasive text */}
          <ScrollReveal>
            <div>
              <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
                // por que connect+
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Fim do desperdício
                <br />
                <span className="text-synapse-cyan">de leads.</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Cada lead que entra no seu funil recebe atenção imediata. 
                  <span className="text-foreground"> Sem filas. Sem esquecimento. Sem desculpas.</span>
                </p>
                <p className="leading-relaxed">
                  O Connect+ não é um chatbot genérico. É um <span className="text-synapse-cyan">sistema de decisão autônomo</span> que 
                  entende contexto, qualifica com precisão e age com persistência calculada.
                </p>
                <p className="leading-relaxed">
                  Enquanto sua equipe foca em fechar negócios, nossos agentes trabalham 
                  <span className="text-synapse-amber"> 24 horas por dia</span>, 
                  <span className="text-synapse-amber"> 7 dias por semana</span>, 
                  <span className="text-synapse-amber"> 365 dias por ano</span>.
                </p>
              </div>
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card border border-border rounded-lg">
                  <div className="font-mono text-2xl font-bold text-synapse-cyan">24/7</div>
                  <div className="text-xs text-muted-foreground mt-1">Disponibilidade</div>
                </div>
                <div className="text-center p-4 bg-card border border-border rounded-lg">
                  <div className="font-mono text-2xl font-bold text-synapse-cyan">{'<'}30s</div>
                  <div className="text-xs text-muted-foreground mt-1">Tempo de resposta</div>
                </div>
                <div className="text-center p-4 bg-card border border-border rounded-lg">
                  <div className="font-mono text-2xl font-bold text-synapse-cyan">100%</div>
                  <div className="text-xs text-muted-foreground mt-1">Cobertura</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Right: Code visualization */}
          <ScrollReveal delay={200}>
            <div className="relative">
              {/* VS Code style window */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Editor header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-synapse-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-synapse-cyan/60" />
                  <span className="ml-4 font-mono text-xs text-muted-foreground">lead_qualified.json</span>
                </div>
                
                {/* JSON content */}
                <div className="p-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-[hsl(var(--code))]">
{`{
  "lead": {
    "id": "lead_7x9k2m",
    "source": "linkedin_outbound",
    "status": "qualified",
    "score": 87
  },
  "qualification": {
    "budget": true,
    "authority": true,
    "need": true,
    "timeline": "Q1_2025"
  },
  "enrichment": {
    "company_size": "50-200",
    "industry": "SaaS",
    "decision_maker": true
  },
  "next_action": "schedule_demo",
  "assigned_agent": "CLOSER_CORE"
}`}
                  </pre>
                </div>
              </div>
              
              {/* Accent decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-synapse-cyan/30 rounded-br-lg" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyConnectSection;
