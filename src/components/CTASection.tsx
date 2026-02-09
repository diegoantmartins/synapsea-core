import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ContactForm from './ContactForm';

const CTASection = () => {
  return (
    <section id="contato" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(176_95%_69%/0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: CTA content */}
          <ScrollReveal>
            <div>
              <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
                // próximo passo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Se sua operação já atingiu o limite humano, é hora de mudar o sistema.
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Sem pitch comercial. Falamos de arquitetura, gargalos e ROI.
              </p>

              <Button 
                variant="synapse" 
                size="lg"
                className="shadow-[0_0_30px_hsl(176_95%_69%/0.3)] hover:shadow-[0_0_40px_hsl(176_95%_69%/0.5)] transition-shadow w-full sm:w-auto"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar conversa técnica
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </ScrollReveal>
          
          {/* Right: Contact form */}
          <ScrollReveal delay={200}>
            <div id="contact-form" className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-lg font-semibold mb-6">
                Agende uma conversa técnica
              </h3>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
