import { Check, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ExperienceMagicSection: React.FC = () => {
  const [activeWord, setActiveWord] = useState<string | null>('needs');

  const suggestions = {
    market: {
      word: 'market',
      suggestion: 'मार्केट',
      explanation: 'Hinglish suggestion: Hindi script mein better readability',
      type: 'tone',
    },
    needs: {
      word: 'need',
      suggestion: 'need',
      explanation: 'Subject-verb agreement: Use "need" with "I"',
      type: 'grammar',
    },
    vegetables: {
      word: 'sabziyan',
      suggestion: 'sabziyan',
      explanation: 'Style improvement: Hinglish word better fits context',
      type: 'style',
    },
  };

  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-6 py-3 rounded-full glass border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Try It Now</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            <span className="gradient-text">Khud magic experience karein</span>
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Underlined words par click karein aur dekhein kaise LEKHAK aapki writing ko improve karta hai
          </p>
        </div>

        {/* Interactive Demo Card */}
        <Card className="border-2 border-border bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in max-w-5xl mx-auto">
          <CardContent className="p-8 xl:p-12">
            {/* Document Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-muted-foreground">Document.txt</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">LEKHAK Active</span>
                </div>
              </div>
              <span className="text-sm text-primary font-semibold">3 suggestions</span>
            </div>

            {/* Text with Underlines */}
            <div className="mb-8 relative">
              <p className="text-2xl xl:text-3xl leading-relaxed">
                मैं आज{' '}
                <span
                  className="underline decoration-blue-500 decoration-2 underline-offset-4 cursor-pointer hover:decoration-4 transition-all"
                  onClick={() => setActiveWord('market')}
                >
                  market
                </span>{' '}
                जा रहा हूं। I{' '}
                <span
                  className="underline decoration-red-500 decoration-2 underline-offset-4 cursor-pointer hover:decoration-4 transition-all"
                  onClick={() => setActiveWord('needs')}
                >
                  needs
                </span>{' '}
                to buy{' '}
                <span
                  className="underline decoration-green-500 decoration-2 underline-offset-4 cursor-pointer hover:decoration-4 transition-all"
                  onClick={() => setActiveWord('vegetables')}
                >
                  vegetables
                </span>{' '}
                और fruits।
              </p>

              {/* Suggestion Popup */}
              {activeWord && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-full max-w-md animate-slide-up">
                  <Card className="border-2 border-primary/30 bg-card shadow-2xl glow-primary">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-xl font-black">{suggestions[activeWord as keyof typeof suggestions].suggestion}</h4>
                        <p className="text-sm text-muted-foreground">
                          {suggestions[activeWord as keyof typeof suggestions].explanation}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 gradient-primary text-white hover:scale-105 transition-transform">
                          <Check className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                        <Button variant="outline" className="flex-1 hover:scale-105 transition-transform">
                          <X className="mr-2 h-4 w-4" />
                          Ignore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mb-8">
              Click on underlined text to see suggestions
            </p>

            {/* Stats Bar */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium">1 Grammar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">2 Improvements</span>
                </div>
              </div>
              <span className="text-lg font-bold text-primary">Score: 87/100</span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <div className="w-6 h-1 bg-red-500 rounded"></div>
                </div>
                <div>
                  <p className="font-semibold text-red-600 dark:text-red-400">Red underline</p>
                  <p className="text-xs text-muted-foreground">Grammar error</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <div className="w-6 h-1 bg-blue-500 rounded"></div>
                </div>
                <div>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">Blue underline</p>
                  <p className="text-xs text-muted-foreground">Tone suggestion</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <div className="w-6 h-1 bg-green-500 rounded"></div>
                </div>
                <div>
                  <p className="font-semibold text-green-600 dark:text-green-400">Green underline</p>
                  <p className="text-xs text-muted-foreground">Style improvement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExperienceMagicSection;
