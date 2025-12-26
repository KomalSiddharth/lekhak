import { Play } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const VideoSection: React.FC = () => {
  return (
    <section className="w-full py-20 xl:py-32 px-4 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden gradient-primary p-16 xl:p-24 text-center animate-scale-in">
          {/* Starry Background Effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-8 xl:space-y-10">
            <h2 className="text-4xl xl:text-6xl font-black text-white">
              LEKHAK ko action mein dekhein
            </h2>
            <p className="text-xl xl:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Dekhein kaise LEKHAK aapko Hindi, English, aur Hinglish mein better likhne mein madad karta hai real-time AI suggestions ke saath
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg xl:text-xl px-12 xl:px-16 py-7 xl:py-8 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold shadow-2xl rounded-2xl"
            >
              <Play className="mr-3 h-6 w-6 fill-current" />
              2-minute Demo Dekhein
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
