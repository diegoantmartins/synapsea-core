import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';

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
                // iniciar protocolo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Pronto para automatizar
                <br />
                <span className="text-synapse-cyan">suas vendas?</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Converse com nossa equipe e descubra como o Connect+ pode 
                transformar sua operação comercial em uma máquina autônoma.
              </p>
              
              {/* Terminal-style info */}
              <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm mb-8">
                <div className="text-muted-foreground mb-2">$ connect+ --info</div>
                <div className="text-[hsl(var(--code))]">
                  <div>→ Setup em até 2 semanas</div>
                  <div>→ Integração com seu CRM</div>
                  <div>→ Suporte dedicado 24/7</div>
                  <div>→ ROI mensurável</div>
                </div>
              </div>
              
              <Link to="/docs">
                <Button variant="synapseOutline" size="lg" className="font-mono">
                  VER DOCUMENTAÇÃO
                </Button>
              </Link>
            </div>
          </ScrollReveal>
          
          {/* Right: Contact form */}
          <ScrollReveal delay={200}>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="font-mono text-lg font-semibold mb-6 text-synapse-cyan">
                // nova conexão
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
