import { Star } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    value: '4.9',
    label: '2,000+ reviews',
    icon: 'rating',
  },
  {
    value: '1M+',
    label: 'Words improved',
    icon: 'words',
  },
  {
    value: '12+',
    label: 'Languages',
    icon: 'languages',
  },
];

const TrustedBySection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <Card className="border-2 border-border bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 animate-scale-in">
          <CardContent className="p-12 xl:p-20">
            {/* Header */}
            <div className="text-center space-y-6 mb-12 xl:mb-16">
              <h2 className="text-4xl xl:text-6xl font-black">
                <span className="gradient-text">Trusted by 50,000+ writers across India</span>
              </h2>
              <p className="text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Students se journalists tak, startups se enterprises tak, LEKHAK Indians ko har din better likhne mein madad karta hai.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center space-y-3 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Icon/Value */}
                  <div className="space-y-2">
                    {stat.icon === 'rating' && (
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 xl:w-8 xl:h-8 fill-gold text-gold animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    )}
                    <h3 className="text-5xl xl:text-7xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </h3>
                  </div>

                  {/* Label */}
                  <p className="text-lg xl:text-xl text-muted-foreground font-medium">{stat.label}</p>

                  {/* Separator Dot */}
                  {index < stats.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 w-2 h-2 rounded-full bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TrustedBySection;
