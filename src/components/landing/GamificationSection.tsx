import { Award, Star, Trophy } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const badges = [
  {
    icon: Award,
    title: 'Shishu',
    subtitle: 'Beginner',
    description: 'Complete your first 10 writing sessions',
    color: 'bg-chart-3',
  },
  {
    icon: Star,
    title: 'Vidwan',
    subtitle: 'Scholar',
    description: 'Maintain 90% accuracy for 30 days',
    color: 'bg-primary',
  },
  {
    icon: Trophy,
    title: 'Lekhak',
    subtitle: 'Master Writer',
    description: 'Write 100,000 words with excellence',
    color: 'bg-secondary',
  },
];

const GamificationSection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold">Level Up Your Writing</h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn badges and track your journey from beginner to master
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 mb-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Card key={index} className="border-border bg-background text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6 xl:p-8 space-y-4">
                  <div className={`w-20 h-20 xl:w-24 xl:h-24 rounded-full ${badge.color} flex items-center justify-center mx-auto`}>
                    <Icon className="w-10 h-10 xl:w-12 xl:h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl xl:text-3xl font-bold">{badge.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {badge.subtitle}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm xl:text-base">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress Stats Preview */}
        <Card className="border-border bg-background max-w-4xl mx-auto">
          <CardContent className="p-6 xl:p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl xl:text-4xl font-bold text-primary">85</div>
                <div className="text-sm text-muted-foreground">Writing Score</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl xl:text-4xl font-bold text-improvement">12</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl xl:text-4xl font-bold text-secondary">45K</div>
                <div className="text-sm text-muted-foreground">Words Written</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GamificationSection;
