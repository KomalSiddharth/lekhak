import { BarChart3, Languages, Monitor, Smartphone } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Monitor,
    title: 'Live Writing Editor',
    description: 'Full-width text editor with real-time error detection and intelligent suggestions.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/2463ab44-d1fb-4676-b2ed-4a652dcc3046.jpg',
  },
  {
    icon: Smartphone,
    title: 'Mobile Keyboard Integration',
    description: 'Native keyboard experience with suggestion bar and floating bubble assistant.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/6eeccc5c-c09c-4513-96ac-0e66943953fc.jpg',
  },
  {
    icon: BarChart3,
    title: 'Dashboard & Progress',
    description: 'Track your writing score, weekly progress, and language usage statistics.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/aca392c2-7d03-415e-822f-518c60756e6d.jpg',
  },
  {
    icon: Languages,
    title: 'Multi-language Support',
    description: 'Seamlessly write in English, Hindi, or Hinglish with context-aware suggestions.',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/db40df1f-ff83-477f-ac38-b142b4ddf736.jpg',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold">Powerful Features</h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for professional writing
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border bg-background overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-accent relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl xl:text-2xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
