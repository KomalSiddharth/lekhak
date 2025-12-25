import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProductDemoSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-4 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-4 py-2 rounded-full glass border border-primary/20 mb-4">
            <span className="text-sm font-semibold gradient-text">Live Demo</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            <span className="gradient-text">Action mein Dekhein</span>
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            LEKHAK kaise real-time suggestions ke saath aapki writing ko better banata hai
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all duration-500 animate-scale-in">
          <CardContent className="p-8 xl:p-16">
            {/* Editor Demo with Premium Styling */}
            <div className="space-y-8">
              <div className="glass rounded-2xl p-8 xl:p-12 min-h-[300px] xl:min-h-[400px] relative overflow-hidden group">
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-gold to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                
                <div className="space-y-6 text-base xl:text-lg leading-relaxed relative z-10">
                  <p className="text-foreground font-medium">
                    Main{' '}
                    <span className="relative inline-block group/word">
                      <span className="border-b-2 border-error animate-pulse">writting</span>
                      <span className="absolute -top-12 left-0 bg-popover border-2 border-error rounded-xl px-4 py-2 text-sm shadow-2xl whitespace-nowrap opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 glow-primary">
                        <span className="text-error font-semibold">✗ Galat spelling</span>
                        <br />
                        <span className="text-improvement">✓ writing</span>
                      </span>
                    </span>
                    {' '}ek email apne boss ko{' '}
                    <span className="relative inline-block group/word">
                      <span className="border-b-2 border-tone animate-pulse" style={{ animationDelay: '0.5s' }}>project update</span>
                      <span className="absolute -top-12 left-0 bg-popover border-2 border-tone rounded-xl px-4 py-2 text-sm shadow-2xl whitespace-nowrap opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 glow-primary">
                        <span className="text-tone font-semibold">💡 Better option</span>
                        <br />
                        <span className="text-improvement">✓ project status</span>
                      </span>
                    </span>
                    {' '}ke baare mein likh raha hoon.
                  </p>
                  <p className="text-foreground font-medium">
                    मैं{' '}
                    <span className="relative inline-block group/word">
                      <span className="border-b-2 border-improvement animate-pulse" style={{ animationDelay: '1s' }}>बहुत खुश</span>
                      <span className="absolute -top-12 left-0 bg-popover border-2 border-improvement rounded-xl px-4 py-2 text-sm shadow-2xl whitespace-nowrap opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 glow-gold">
                        <span className="text-improvement font-semibold">✨ Improvement</span>
                        <br />
                        <span className="gradient-text-gold">✓ अत्यंत प्रसन्न</span>
                      </span>
                    </span>
                    {' '}हूं कि आपने मुझे यह opportunity दी।
                  </p>
                </div>
              </div>

              {/* Premium Legend with Icons */}
              <div className="flex flex-wrap gap-6 xl:gap-8 justify-center text-sm">
                <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-1 bg-error rounded-full animate-pulse"></div>
                  <span className="font-semibold">Grammar errors</span>
                </div>
                <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-1 bg-tone rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="font-semibold">Tone suggestions</span>
                </div>
                <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-1 bg-improvement rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="font-semibold">Improvements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProductDemoSection;

