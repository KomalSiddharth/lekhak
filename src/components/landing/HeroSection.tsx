import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-16 xl:py-24 px-4 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center xl:text-left space-y-6 xl:space-y-8">
            <h1 className="text-4xl xl:text-6xl font-bold leading-tight tracking-tight">
              AI Writing Assistant for{' '}
              <span className="text-primary">Indian Languages</span>
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-2xl mx-auto xl:mx-0 leading-relaxed">
              Write confidently in English, Hindi, or Hinglish with intelligent suggestions. 
              Like Grammarly, but built for India.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-start">
              <Button size="lg" className="text-base xl:text-lg px-6 xl:px-8 py-5 xl:py-6">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base xl:text-lg px-6 xl:px-8 py-5 xl:py-6">
                Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 xl:gap-6 justify-center xl:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Works everywhere</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative bg-card border border-border rounded-lg shadow-sm overflow-hidden">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/449d6db0-1d60-4f7f-a729-305e8ab00e83.jpg"
                alt="LEKHAK editor interface showing real-time writing suggestions"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
