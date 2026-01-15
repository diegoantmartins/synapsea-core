import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { scrollToSection } from '@/hooks/use-active-section';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag */}
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-border rounded-full bg-secondary/30">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
            <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
              Orquestração Cognitiva
            </span>
          </div>
        </ScrollReveal>
        
        {/* Headline */}
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Automação é execução.</span>
            <br />
            <span className="text-synapse-cyan text-glow">Inteligência é decisão.</span>
          </h1>
        </ScrollReveal>
        
        {/* Subheadline */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Agentes de IA que <span className="text-synapse-cyan">resolvem</span> problemas reais, 
            <span className="text-synapse-cyan"> escalam</span> quando necessário e 
            <span className="text-synapse-cyan"> nunca</span> deixam seu cliente sem resposta.
          </p>
        </ScrollReveal>
        
        {/* CTAs */}
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="synapse" 
              size="xl"
              onClick={() => scrollToSection('contato')}
            >
              Projetar um agente
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="synapseOutline" 
              size="xl"
              onClick={() => scrollToSection('arquitetura')}
            >
              Ver a arquitetura
            </Button>
          </div>
        </ScrollReveal>
        
        {/* Code snippet preview */}
        <ScrollReveal delay={400}>
          <div className="mt-16">
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
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
