import CircuitBackground from '@/components/CircuitBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ArchitectureSection from '@/components/ArchitectureSection';
import UseCasesSection from '@/components/UseCasesSection';
import AudienceSection from '@/components/AudienceSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated circuit background */}
      <CircuitBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <section id="arquitetura">
            <ArchitectureSection />
          </section>
          <section id="modulos">
            <UseCasesSection />
          </section>
          <AudienceSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
