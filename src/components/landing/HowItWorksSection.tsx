import { Edit3, MousePointer, Sparkles, TrendingUp } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Edit3,
    title: 'Write Naturally',
    description: 'Type in English, Hindi, or mix both languages freely. LEKHAK understands your context.',
  },
  {
    icon: Sparkles,
    title: 'Get Instant Suggestions',
    description: 'See color-coded underlines for grammar, tone, and improvements as you type.',
  },
  {
    icon: MousePointer,
    title: 'Accept with One Click',
    description: 'Click on any suggestion to see alternatives and apply changes instantly.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Monitor your writing score and see how you improve over time.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold">How It Works</h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to better writing
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 xl:p-8">
                  <div className="flex gap-4 xl:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 xl:w-7 xl:h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                      </div>
                      <h3 className="text-xl xl:text-2xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
