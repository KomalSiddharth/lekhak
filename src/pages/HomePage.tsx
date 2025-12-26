import React from 'react';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import CTASection from '@/components/landing/CTASection';
import ExperienceMagicSection from '@/components/landing/ExperienceMagicSection';
import FeaturesCardsSection from '@/components/landing/FeaturesCardsSection';
import Footer from '@/components/landing/Footer';
import GamificationSection from '@/components/landing/GamificationSection';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import MiniCTASection from '@/components/landing/MiniCTASection';
import PricingSection from '@/components/landing/PricingSection';
import ProductDemoSection from '@/components/landing/ProductDemoSection';
import TrustedBySection from '@/components/landing/TrustedBySection';
import VideoSection from '@/components/landing/VideoSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <DarkModeToggle />
      <HeroSection />
      <ProductDemoSection />
      <FeaturesCardsSection />
      <MiniCTASection />
      <HowItWorksSection />
      <VideoSection />
      <ExperienceMagicSection />
      <GamificationSection />
      <PricingSection />
      <TrustedBySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;


