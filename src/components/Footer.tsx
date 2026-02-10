import { Link } from 'react-router-dom';
import { scrollToSection } from '@/hooks/use-active-section';

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Synapsea Connect+ Logo" className="w-10 h-10 object-contain" />
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
