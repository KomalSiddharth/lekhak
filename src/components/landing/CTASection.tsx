import { ArrowRight, Download } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 gradient-mesh opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-gold/20"></div>
      
      {/* Animated Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="glass border-2 border-primary/30 rounded-3xl p-12 xl:p-20 text-center space-y-10 animate-scale-in glow-primary">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full glass border border-gold/30 mb-4">
              <span className="text-sm font-semibold gradient-text-gold">Ready to Start?</span>
            </div>
            <h2 className="text-4xl xl:text-6xl font-black leading-tight">
              <span className="gradient-text block mb-2">Aaj Hi Shuru Karein</span>
              <span className="block">Apni Writing Journey</span>
            </h2>
            <p className="text-lg xl:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Free mein sign up karein aur dekho kaise LEKHAK aapki writing ko transform karta hai
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="text-base xl:text-xl px-10 xl:px-14 py-7 xl:py-9 gradient-gold text-foreground hover:scale-105 transition-transform duration-300 font-black shadow-2xl glow-gold"
            >
              Free mein Start Karein
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base xl:text-xl px-10 xl:px-14 py-7 xl:py-9 border-2 border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300 font-bold"
            >
              <Download className="mr-3 h-6 w-6" />
              App Download Karein
            </Button>
          </div>

          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-wrap gap-8 xl:gap-12 justify-center items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌐</span>
                </div>
                <div className="text-left">
                  <div className="font-bold">Web</div>
                  <div className="text-muted-foreground text-xs">Browser mein use karein</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">📱</span>
                </div>
                <div className="text-left">
                  <div className="font-bold">Android</div>
                  <div className="text-muted-foreground text-xs">Play Store se download</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍎</span>
                </div>
                <div className="text-left">
                  <div className="font-bold">iOS</div>
                  <div className="text-muted-foreground text-xs">App Store se download</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

