import { Check, Sparkles } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const pricingPlans = [
  {
    name: 'Free',
    nameHindi: 'निःशुल्क',
    description: 'Casual writers aur students ke liye perfect',
    price: '₹0',
    period: '/forever',
    buttonText: 'शुरू करें',
    buttonVariant: 'outline' as const,
    features: [
      'प्रति दिन 100 सुझाव',
      'बेसिक grammar checking',
      'Hindi & English support',
      'Web app access',
      'Mobile keyboard',
    ],
    popular: false,
    gradient: 'from-muted to-muted',
    borderColor: 'border-border',
  },
  {
    name: 'Pro',
    nameHindi: 'विद्वान',
    description: 'Professionals aur content creators ke liye',
    price: '₹299',
    period: '/per month',
    buttonText: 'Free Trial शुरू करें',
    buttonVariant: 'default' as const,
    features: [
      'असीमित सुझाव',
      'Advanced grammar & style',
      'Hinglish support',
      'Tone detection',
      'Browser extension',
      'Priority support',
      'Writing analytics',
      'Custom dictionary',
    ],
    popular: true,
    gradient: 'from-primary to-primary-glow',
    borderColor: 'border-primary',
  },
  {
    name: 'Teams',
    nameHindi: 'टीम्स',
    description: 'Teams aur organizations ke liye',
    price: '₹999',
    period: '/per month',
    buttonText: 'Sales से संपर्क करें',
    buttonVariant: 'outline' as const,
    features: [
      'Pro में सब कुछ',
      '10 team members तक',
      'Admin dashboard',
      'Team analytics',
      'Centralized billing',
      'API access',
      'Custom integrations',
      'Dedicated support',
    ],
    popular: false,
    gradient: 'from-muted to-muted',
    borderColor: 'border-border',
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 xl:mb-20 animate-slide-up">
          <div className="inline-block px-6 py-3 rounded-full glass border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Pricing</span>
          </div>
          <h2 className="text-4xl xl:text-6xl font-black">
            <span className="gradient-text">Simple, transparent pricing</span>
          </h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Free mein shuru karein, jab zarurat ho tab upgrade karein. Koi hidden fees nahi, kabhi bhi cancel karein.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 ${plan.borderColor} bg-card/80 backdrop-blur-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group animate-scale-in ${
                plan.popular ? 'xl:scale-110 shadow-xl' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-6 py-2 rounded-full gradient-primary text-white font-bold text-sm shadow-lg glow-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="p-8 xl:p-10 space-y-6">
                {/* Plan Name */}
                <div className="space-y-2">
                  <h3 className="text-3xl xl:text-4xl font-black">
                    {plan.name} <span className="text-xl text-muted-foreground">{plan.nameHindi}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl xl:text-6xl font-black">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className={`w-full text-lg py-6 font-bold hover:scale-105 transition-transform ${
                    plan.popular ? 'gradient-primary text-white glow-primary' : ''
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardHeader>

              <CardContent className="p-8 xl:p-10 pt-0 space-y-4">
                <p className="font-bold text-sm">क्या शामिल है:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-primary' : 'bg-muted'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-16 xl:mt-20 animate-fade-in">
          <p className="text-muted-foreground mb-4">Pricing ke baare mein questions hain?</p>
          <Button variant="link" className="text-primary font-semibold text-lg hover:scale-105 transition-transform">
            FAQ देखें →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
