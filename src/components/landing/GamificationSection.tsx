import { Award, Star, Trophy } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const badges = [
  {
    icon: Award,
    title: 'Shishu',
    subtitle: 'Beginner',
    description: 'Apne pehle 10 writing sessions complete karein',
    color: 'from-chart-3 to-chart-3/70',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.5)]',
  },
  {
    icon: Star,
    title: 'Vidwan',
    subtitle: 'Scholar',
    description: '30 din tak 90% accuracy maintain karein',
    color: 'from-primary to-primary-glow',
    glow: 'shadow-[0_0_30px_rgba(99,102,241,0.5)]',
  },
  {
    icon: Trophy,
    title: 'Lekhak',
    subtitle: 'Master Writer',
    description: 'Excellence ke saath 1,00,000 words likhein',
    color: 'gradient-gold',
    glow: 'glow-gold',
  },
];

const GamificationSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-4 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-4 py-2 rounded-full glass border border-gold/30 mb-4">
            <span className="text-sm font-semibold gradient-text-gold">Gamification</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            Apni Writing Ko
            <br />
            <span className="gradient-text-gold">Level Up Karein</span>
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Badges earn karein aur beginner se master tak ka safar track karein
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-10 mb-16">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-border bg-card/50 backdrop-blur-xl text-center hover:scale-105 hover:border-gold/50 transition-all duration-500 animate-scale-in group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 xl:p-10 space-y-6">
                  {/* Badge Icon with Glow */}
                  <div className="relative inline-block">
                    <div className={`absolute inset-0 ${badge.glow} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className={`w-24 h-24 xl:w-28 xl:h-28 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-12 h-12 xl:w-14 xl:h-14 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl xl:text-4xl font-black gradient-text">{badge.title}</h3>
                    <Badge variant="secondary" className="text-xs font-bold px-4 py-1">
                      {badge.subtitle}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Premium Progress Stats */}
        <Card className="border-2 border-gold/30 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl max-w-5xl mx-auto glow-gold animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-8 xl:p-12">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12 text-center">
              <div className="space-y-3 group">
                <div className="text-5xl xl:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">85</div>
                <div className="text-sm xl:text-base text-muted-foreground font-semibold">Writing Score</div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full animate-pulse" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-3 group">
                <div className="text-5xl xl:text-6xl font-black gradient-text-gold group-hover:scale-110 transition-transform duration-300">12</div>
                <div className="text-sm xl:text-base text-muted-foreground font-semibold">Badges Earned</div>
                <div className="flex justify-center gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 group">
                <div className="text-5xl xl:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">45K</div>
                <div className="text-sm xl:text-base text-muted-foreground font-semibold">Words Written</div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-gold rounded-full animate-pulse" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GamificationSection;

