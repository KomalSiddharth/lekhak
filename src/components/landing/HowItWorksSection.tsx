import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    icon: '🚀',
    title: 'LEKHAK Install Karein',
    description: 'Apna browser extension add karein ya mobile keyboard download karein. 30 seconds se kam time lagta hai.',
  },
  {
    number: '02',
    icon: '✍️',
    title: 'Writing Start Karein',
    description: 'Kahin bhi likhein - Gmail, WhatsApp, Word, ya koi bhi app. LEKHAK background mein seamlessly kaam karta hai.',
  },
  {
    number: '03',
    icon: '✨',
    title: 'Smart Suggestions Paayein',
    description: 'Real-time corrections aur suggestions dekhein. Click karke accept ya ignore karein. Itna simple.',
  },
  {
    number: '04',
    icon: '📈',
    title: 'Time Ke Saath Improve Karein',
    description: 'Apni writing stats track karein, mistakes se seekhein, aur week by week apni skills grow hote dekhein.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-6 py-3 rounded-full glass border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">How It Works</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            Minutes mein shuru karein
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Koi complex setup nahi. Koi learning curve nahi. Bas install karein aur turant better likhna shuru karein.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="border-2 border-border bg-card/50 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-500 group animate-scale-in relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-black text-2xl shadow-2xl glow-primary z-10">
                {step.number}
              </div>

              <CardContent className="p-8 xl:p-10 space-y-6 pt-12">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl xl:text-2xl font-black">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm xl:text-base">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
