import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { scrollToSection } from '@/hooks/use-active-section';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-20">
      {/* Gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Status badge */}
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-synapse-cyan/30 rounded-full bg-secondary/30">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">
              Infraestrutura de IA ativa 24/7 para operações que precisam escalar
            </span>
          </div>
        </ScrollReveal>
        
        {/* Headline */}
        <ScrollReveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-foreground">Sua operação não pode parar.</span>
            <br />
            <span className="text-synapse-cyan text-glow">O Connect+ também não.</span>
          </h1>
        </ScrollReveal>
        
        {/* Description */}
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            O Connect+ é um sistema omnichanel com agentes de IA projetados para prospectar,
            qualificar e orquestrar conversas em escala — com handoff humano, memória operacional
            e integração total ao seu CRM.
          </p>
        </ScrollReveal>
        
        {/* CTAs */}
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="synapse" 
              size="xl"
              className="shadow-[0_0_30px_hsl(176_95%_69%/0.3)] hover:shadow-[0_0_40px_hsl(176_95%_69%/0.5)] transition-shadow"
              onClick={() => scrollToSection('contato')}
            >
              Quero escalar minha operação
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="synapseOutline" 
              size="xl"
              onClick={() => scrollToSection('arquitetura')}
            >
              Ver arquitetura do sistema
            </Button>
          </div>
        </ScrollReveal>
        
        {/* Quick benefits */}
        <ScrollReveal delay={400}>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <Clock className="w-5 h-5 text-synapse-cyan" />
              <span className="text-sm text-muted-foreground">Resposta em segundos, não minutos</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <Zap className="w-5 h-5 text-synapse-cyan" />
              <span className="text-sm text-muted-foreground">Histórico e contexto preservados</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <TrendingUp className="w-5 h-5 text-synapse-cyan" />
              <span className="text-sm text-muted-foreground">Operação ativa 24/7 sem aumentar headcount</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
