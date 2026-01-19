import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import { scrollToSection } from '@/hooks/use-active-section';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-20">
      {/* Gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Status badge */}
            <ScrollReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-synapse-cyan/30 rounded bg-secondary/30 font-mono text-xs text-synapse-cyan">
                <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
                SYSTEM.STATUS: AGENTS_ACTIVE
              </div>
            </ScrollReveal>
            
            {/* Headline */}
            <ScrollReveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                <span className="text-foreground">Sua equipe precisa dormir.</span>
                <br />
                <span className="text-synapse-cyan text-glow">O Connect+ não.</span>
              </h1>
            </ScrollReveal>
            
            {/* Terminal-style subtitle */}
            <ScrollReveal delay={150}>
              <div className="font-mono text-sm text-synapse-cyan/80 mb-6">
                {'>'} System.status: <span className="text-synapse-amber">AGENTS_ACTIVE</span> // 24_7_365
              </div>
            </ScrollReveal>
            
            {/* Description */}
            <ScrollReveal delay={200}>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Implemente Agentes de IA Autônomos que <span className="text-synapse-cyan">prospectam</span>, 
                <span className="text-synapse-cyan"> qualificam</span> e 
                <span className="text-synapse-cyan"> agendam reuniões</span> sem intervenção humana.
              </p>
            </ScrollReveal>
            
            {/* CTA */}
            <ScrollReveal delay={300}>
              <Button 
                variant="synapse" 
                size="xl"
                className="shadow-[0_0_30px_hsl(176_95%_69%/0.3)] hover:shadow-[0_0_40px_hsl(176_95%_69%/0.5)] transition-shadow"
                onClick={() => scrollToSection('contato')}
              >
                [ INICIAR PROTOCOLO DE VENDAS ]
              </Button>
            </ScrollReveal>
          </div>
          
          {/* Right: Terminal visualization */}
          <ScrollReveal delay={400}>
            <div className="relative">
              {/* Terminal window */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-synapse-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-synapse-cyan/60" />
                  <span className="ml-4 font-mono text-xs text-muted-foreground">connect+.terminal</span>
                </div>
                
                {/* Terminal content */}
                <div className="p-6 font-mono text-sm space-y-3">
                  <div className="text-muted-foreground">
                    <span className="text-synapse-cyan">$</span> agent.init({'{'}mode: "autonomous"{'}'})
                  </div>
                  <div className="text-[hsl(var(--code))]">
                    [INFO] Carregando módulos...
                  </div>
                  <div className="text-[hsl(var(--code))]">
                    [INFO] HUNTER_V1 ✓
                  </div>
                  <div className="text-[hsl(var(--code))]">
                    [INFO] CLOSER_CORE ✓
                  </div>
                  <div className="text-[hsl(var(--code))]">
                    [INFO] DATA_NODE ✓
                  </div>
                  <div className="text-synapse-cyan mt-4">
                    {'>'} Swarm conectado. 3 agentes ativos.
                  </div>
                  <div className="text-synapse-amber animate-pulse">
                    {'>'} Aguardando leads...
                  </div>
                </div>
              </div>
              
              {/* Glow effect behind terminal */}
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.1)_0%,transparent_70%)] -z-10 blur-xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
