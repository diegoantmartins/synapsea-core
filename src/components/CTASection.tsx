import { Button } from '@/components/ui/button';
import { FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import ContactForm from './ContactForm';

const CTASection = () => {
  return (
    <section id="contato" className="relative py-32 px-6">
      {/* Gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // próximo passo
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Pronto para arquitetar?
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Sem demos genéricas. Sem trials de 14 dias. 
              Começamos pela sua arquitetura.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal delay={100}>
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <ContactForm />
          </div>
        </ScrollReveal>

        {/* Docs link */}
        <ScrollReveal delay={200}>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Prefere explorar por conta própria?
            </p>
            <Button variant="synapseOutline" size="lg" asChild>
              <Link to="/docs">
                Ver documentação
                <FileCode className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
        
        {/* Trust indicators */}
        <ScrollReveal delay={300}>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mt-12">
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
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
