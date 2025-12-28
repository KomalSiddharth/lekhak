import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center py-20 xl:py-32 px-4 xl:px-8 overflow-hidden">
      {/* Premium Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60"></div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center xl:text-left space-y-8 xl:space-y-10 animate-slide-up">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-2 border-primary/20 animate-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="text-sm font-semibold gradient-text-gold">AI-Powered Writing Assistant</span>
            </div>

            <h1 className="text-5xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="block mb-2">Likho</span>
              <span className="gradient-text block mb-2">Indian Languages</span>
              <span className="block">mein Confidently</span>
            </h1>

            <p className="text-lg xl:text-2xl text-muted-foreground max-w-2xl mx-auto xl:mx-0 leading-relaxed">
              English, Hindi, ya Hinglish - kisi bhi language mein likho aur intelligent suggestions pao.
              <span className="gradient-text-gold font-semibold"> Grammarly jaisa, lekin India ke liye.</span>
            </p>

            <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-start">
              <Button
                size="lg"
                className="text-base xl:text-lg px-8 xl:px-10 py-6 xl:py-7 gradient-primary glow-primary hover:scale-105 transition-transform duration-300 font-bold"
                onClick={() => window.location.href = '/editor'}
              >
                Free mein Start Karein
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base xl:text-lg px-8 xl:px-10 py-6 xl:py-7 border-2 hover:bg-accent/10 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Demo Dekhein
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 xl:gap-8 justify-center xl:justify-start text-sm">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <span className="text-gold text-xl">✓</span>
                <span className="font-medium">Free mein shuru karein</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <span className="text-gold text-xl">✓</span>
                <span className="font-medium">Credit card ki zarurat nahi</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <span className="text-gold text-xl">✓</span>
                <span className="font-medium">Har jagah kaam karta hai</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Premium Card with Glow */}
          <div className="flex-1 w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 gradient-purple rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10"></div>
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/449d6db0-1d60-4f7f-a729-305e8ab00e83.jpg"
                  alt="LEKHAK editor interface showing real-time writing suggestions"
                  className="w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

