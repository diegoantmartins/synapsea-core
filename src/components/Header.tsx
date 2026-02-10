import { Button } from '@/components/ui/button';
import { useActiveSection, scrollToSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'agentes', label: 'Agentes' },
  { id: 'porque', label: 'Por que Connect+' },
  { id: 'contato', label: 'Contato' },
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
          <img src="/logo.png" alt="Synapsea Connect+ Logo" className="w-12 h-12 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-lg tracking-tight text-foreground">Synapsea</span>
            <span className="font-mono text-sm text-synapse-cyan">[Connect+]</span>
          </div>
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
            className="font-mono"
          >
            LOGIN_SYSTEM
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
              className="mt-2 font-mono"
            >
              LOGIN_SYSTEM
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
