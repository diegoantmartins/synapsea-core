import ScrollReveal from './ScrollReveal';

const architectureItems = [
  'Docker para isolamento e deploy previsível',
  'Supabase / PostgreSQL para dados e vetores',
  'Meta API oficial para estabilidade',
  'Integração nativa com CRM',
];

const ArchitectureSection = () => {
  return (
    <section id="arquitetura" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // arquitetura
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              Arquitetura pensada para escalar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Se não escala ou desperdiça recursos, não entra na nossa stack.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-2 gap-6">
            {architectureItems.map((item) => (
              <div
                key={item}
                className="p-6 bg-card border border-border rounded-lg flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-synapse-cyan" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ArchitectureSection;
