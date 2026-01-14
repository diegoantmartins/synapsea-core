import { Button } from '@/components/ui/button';
import { useActiveSection, scrollToSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'arquitetura', label: 'Arquitetura' },
  { id: 'modulos', label: 'Módulos' },
];

const Header = () => {
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'text-sm transition-colors relative py-1',
                activeSection === item.id
                  ? 'text-synapse-cyan'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-synapse-cyan" />
              )}
            </button>
          ))}
          <Link 
            to="/docs" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
        </nav>
        
        {/* CTA */}
        <div className="hidden md:block">
          <Button 
            variant="synapseOutline" 
            size="sm"
            onClick={() => handleNavClick('contato')}
          >
            Contato
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border py-4 px-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'text-sm transition-colors text-left py-2',
                  activeSection === item.id
                    ? 'text-synapse-cyan'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </button>
            ))}
            <Link 
              to="/docs" 
              className="text-sm text-muted-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Button 
              variant="synapseOutline" 
              size="sm"
              onClick={() => handleNavClick('contato')}
              className="mt-2"
            >
              Contato
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
