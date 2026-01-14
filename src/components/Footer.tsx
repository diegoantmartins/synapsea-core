const Footer = () => {
  return (
    <footer className="relative py-16 px-6 border-t border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-synapse-cyan flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" className="fill-synapse-abyssal" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight">Synapsea</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Infraestrutura cognitiva para automações que exigem confiança.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors">
                  Arquitetura
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors">
                  Casos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors">
                  Documentação
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors">
                  Falar com arquiteto
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Synapsea. Infraestrutura cognitiva.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-synapse-cyan animate-pulse-glow" />
            sistemas operacionais
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
