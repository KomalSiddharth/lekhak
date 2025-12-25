import React from 'react';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import CTASection from '@/components/landing/CTASection';
import DesignPhilosophySection from '@/components/landing/DesignPhilosophySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import GamificationSection from '@/components/landing/GamificationSection';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ProductDemoSection from '@/components/landing/ProductDemoSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <DarkModeToggle />
      <HeroSection />
      <ProductDemoSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DesignPhilosophySection />
      <GamificationSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;

