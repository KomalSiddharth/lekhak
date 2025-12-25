import { BarChart3, Languages, Monitor, Smartphone } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Monitor,
    title: 'Live Writing Editor',
    description: 'Real-time error detection ke saath full-width text editor aur intelligent suggestions.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/2463ab44-d1fb-4676-b2ed-4a652dcc3046.jpg',
    gradient: 'from-primary to-primary-glow',
  },
  {
    icon: Smartphone,
    title: 'Mobile Keyboard Integration',
    description: 'Native keyboard experience suggestion bar aur floating bubble assistant ke saath.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/6eeccc5c-c09c-4513-96ac-0e66943953fc.jpg',
    gradient: 'from-gold to-gold-light',
  },
  {
    icon: BarChart3,
    title: 'Dashboard & Progress',
    description: 'Apni writing score, weekly progress, aur language usage statistics track karein.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/aca392c2-7d03-415e-822f-518c60756e6d.jpg',
    gradient: 'from-accent to-primary',
  },
  {
    icon: Languages,
    title: 'Multi-language Support',
    description: 'English, Hindi, ya Hinglish mein seamlessly likho context-aware suggestions ke saath.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/db40df1f-ff83-477f-ac38-b142b4ddf736.jpg',
    gradient: 'from-chart-3 to-chart-4',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-4 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-4 py-2 rounded-full glass border border-primary/20 mb-4">
            <span className="text-sm font-semibold gradient-text">Features</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional writing ke liye sab kuch jo aapko chahiye
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-border bg-card/50 backdrop-blur-xl overflow-hidden hover:scale-105 hover:border-primary/50 transition-all duration-500 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {/* Image Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}></div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl xl:text-2xl font-black">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

