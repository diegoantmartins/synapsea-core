import { Link } from 'react-router-dom';
import { scrollToSection } from '@/hooks/use-active-section';

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
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
            <div className="flex items-baseline gap-1">
              <span className="font-semibold tracking-tight text-foreground">Synapsea</span>
              <span className="font-mono text-xs text-synapse-cyan">[Connect+]</span>
            </div>
          </div>
          
          {/* Links */}
          <nav className="flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('agentes')}
              className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors"
            >
              Agentes
            </button>
            <button 
              onClick={() => scrollToSection('porque')}
              className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors"
            >
              Por que Connect+
            </button>
            <Link 
              to="/docs" 
              className="text-sm text-muted-foreground hover:text-synapse-cyan transition-colors"
            >
              Documentação
            </Link>
          </nav>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground font-mono">
            © 2024 Synapsea. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
