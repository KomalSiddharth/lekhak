import { Award, Languages, Smartphone, TrendingUp, Zap } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Languages,
    title: 'Multilingual Support',
    description: 'Hindi, English, aur Hinglish ke beech seamlessly switch karein. Humara AI code-mixing ko naturally samajhta hai.',
    gradient: 'from-blue-500 to-blue-600',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Real-time Corrections',
    description: 'Jaise hi aap type karte hain, instant grammar, spelling, aur punctuation fixes milte hain. No waiting, no interruptions.',
    gradient: 'from-purple-500 to-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
  },
  {
    icon: Award,
    title: 'Context-Aware',
    description: 'Indian context, cultural nuances, aur local expressions ko samajhta hai. Sirf translation nahi.',
    gradient: 'from-pink-500 to-pink-600',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Browser extension, mobile keyboard, aur web app. Kisi bhi device, kisi bhi platform par better likhein.',
    gradient: 'from-rose-500 to-rose-600',
    iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
  },
  {
    icon: Award,
    title: 'Tone & Style',
    description: 'Formal emails, casual chats, ya professional documents ke liye apni writing style automatically adapt karein.',
    gradient: 'from-orange-500 to-orange-600',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Learn & Improve',
    description: 'Apni progress track karein, personalized insights paayein, aur time ke saath better writer banein.',
    gradient: 'from-green-500 to-green-600',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
  },
];

const FeaturesCardsSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 border-border bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 xl:p-10 space-y-6">
                  {/* Icon */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className={`w-16 h-16 xl:w-20 xl:h-20 rounded-2xl ${feature.iconBg} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <Icon className="w-8 h-8 xl:w-10 xl:h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl xl:text-3xl font-black">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
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

export default FeaturesCardsSection;
