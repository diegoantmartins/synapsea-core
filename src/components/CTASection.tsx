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
        <div className="max-w-2xl mx-auto">
          {/* CTA Header */}
          <ScrollReveal>
            <div className="mb-8">
              <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
                // conversa técnica
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
                Se sua operação já atingiu o limite humano, é hora de mudar o sistema.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sem pitch comercial. Falamos de arquitetura, gargalos, e como escalar mantendo qualidade técnica.
              </p>
            </div>
          </ScrollReveal>
          
          {/* Contact form */}
          <ScrollReveal delay={100}>
            <div id="contact-form" className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-lg font-semibold mb-6">
                Conversa com um arquiteto
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
