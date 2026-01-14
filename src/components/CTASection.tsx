import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, FileCode } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-32 px-6">
      {/* Gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
          // próximo passo
        </span>
        
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
          Pronto para arquitetar?
        </h2>
        
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Sem demos genéricas. Sem trials de 14 dias. 
          Começamos pela sua arquitetura.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="synapse" size="xl">
            Falar com um arquiteto
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button variant="synapseOutline" size="xl">
            Ver documentação
            <FileCode className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan" />
            Auditável
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan" />
            Observável
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan" />
            Controlável
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
