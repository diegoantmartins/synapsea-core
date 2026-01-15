import { Star, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const testimonials = [
  {
    name: 'Ricardo Mendes',
    role: 'Diretor de Operações',
    company: 'TechFinance',
    image: null,
    content: 'Reduzimos o tempo de resposta de 4 horas para 30 segundos. Nossa equipe agora foca nos casos que realmente precisam de atenção humana.',
    metrics: { value: 85, suffix: '%', label: 'redução no tempo de resposta' }
  },
  {
    name: 'Camila Santos',
    role: 'Head de Customer Success',
    company: 'E-commerce Plus',
    image: null,
    content: 'O NPS subiu de 32 para 78 em 3 meses. Os clientes elogiam a rapidez e precisão das respostas.',
    metrics: { value: 78, suffix: '', label: 'NPS atual' }
  },
  {
    name: 'Fernando Costa',
    role: 'CEO',
    company: 'Credify',
    image: null,
    content: 'Triplicamos a recuperação de dívidas sem aumentar a equipe. O tom adaptativo fez toda diferença nos acordos.',
    metrics: { value: 3, suffix: 'x', label: 'mais acordos fechados' }
  }
];

const stats = [
  { value: 500, suffix: '+', label: 'Empresas atendidas' },
  { value: 2, suffix: 'M+', label: 'Interações/mês' },
  { value: 94, suffix: '%', label: 'Satisfação média' },
  { value: 45, suffix: 's', label: 'Tempo médio de resposta' }
];

const TestimonialsSection = () => {
  return (
    <section id="resultados" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="font-mono text-sm text-synapse-cyan tracking-wider uppercase">
              // resultados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Quem usa, recomenda.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Empresas que transformaram sua operação com Synapsea.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-secondary/30 border border-border rounded-lg">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2500}
                  className="text-3xl md:text-4xl font-bold text-synapse-cyan"
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="group h-full p-6 bg-card border border-border rounded-lg hover:border-synapse-cyan/30 transition-all duration-300 flex flex-col">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-synapse-cyan/30 mb-4" />
                
                {/* Content */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                
                {/* Metric highlight */}
                <div className="bg-secondary/50 rounded p-4 mb-6 border-l-2 border-synapse-cyan">
                  <AnimatedCounter
                    end={testimonial.metrics.value}
                    suffix={testimonial.metrics.suffix}
                    duration={2000}
                    className="text-2xl font-bold text-synapse-cyan"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {testimonial.metrics.label}
                  </div>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-synapse-cyan">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-synapse-amber text-synapse-amber" />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust badges */}
        <ScrollReveal delay={500}>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Tecnologia confiável por empresas de todos os tamanhos
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {['TechFinance', 'E-commerce Plus', 'Credify', 'DataCorp', 'SalesHub'].map((company, index) => (
                <div 
                  key={index} 
                  className="font-mono text-sm text-muted-foreground px-4 py-2 border border-border/50 rounded"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
