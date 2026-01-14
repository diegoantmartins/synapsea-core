import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-border rounded-full bg-secondary/30 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
          <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
            Orquestração Cognitiva
          </span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in animation-delay-200">
          <span className="text-foreground">Automação é execução.</span>
          <br />
          <span className="text-synapse-cyan text-glow">Inteligência é decisão.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in animation-delay-400">
          Synapsea conecta infraestrutura determinística — n8n, APIs, dados — 
          com agentes de IA que operam sob <span className="text-synapse-cyan">regras</span>, <span className="text-synapse-cyan">limites</span> e <span className="text-synapse-cyan">observabilidade</span>.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
          <Button variant="synapse" size="xl">
            Projetar um agente
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="synapseOutline" size="xl">
            Ver a arquitetura
          </Button>
        </div>
        
        {/* Code snippet preview */}
        <div className="mt-16 animate-fade-in animation-delay-600">
          <div className="inline-block bg-secondary/50 border border-border rounded-lg p-4 text-left font-mono text-sm">
            <div className="text-muted-foreground mb-2">// agent.config</div>
            <div>
              <span className="text-synapse-amber">confidence_threshold</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-synapse-cyan">0.85</span>
            </div>
            <div>
              <span className="text-synapse-amber">fallback</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-synapse-cyan">"human_escalation"</span>
            </div>
            <div>
              <span className="text-synapse-amber">audit_mode</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-synapse-cyan">true</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
