import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
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
        </a>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#arquitetura" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Arquitetura
          </a>
          <a href="#modulos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Módulos
          </a>
          <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
        </nav>
        
        {/* CTA */}
        <Button variant="synapseOutline" size="sm">
          Contato
        </Button>
      </div>
    </header>
  );
};

export default Header;
