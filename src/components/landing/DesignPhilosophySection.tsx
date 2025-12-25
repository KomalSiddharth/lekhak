import { Briefcase, Eye, Zap } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const principles = [
  {
    icon: Zap,
    title: 'Utility Over Beauty',
    description: 'Every feature serves a purpose. No distractions, just results.',
  },
  {
    icon: Eye,
    title: 'Invisibility & Speed',
    description: 'Suggestions appear instantly without interrupting your flow.',
  },
  {
    icon: Briefcase,
    title: 'Professional Maturity',
    description: 'Built for serious writers who value clarity and precision.',
  },
];

const DesignPhilosophySection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold">Our Design Philosophy</h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with intention, designed for impact
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card key={index} className="border-border text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6 xl:p-8 space-y-4">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 xl:w-10 xl:h-10 text-primary" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-semibold">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 xl:mt-16 text-center">
          <blockquote className="text-lg xl:text-xl italic text-muted-foreground max-w-4xl mx-auto">
            "Indian-smart, not Indian-loud. We believe great tools should be felt, not seen."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophySection;
