import CircuitBackground from '@/components/CircuitBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AgentsSection from '@/components/AgentsSection';
import WhyConnectSection from '@/components/WhyConnectSection';
import ArchitectureSection from '@/components/ArchitectureSection';
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
          <AgentsSection />
          <WhyConnectSection />
          <ArchitectureSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
