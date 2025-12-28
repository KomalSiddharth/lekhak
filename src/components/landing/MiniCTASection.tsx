import React from 'react';
import { Button } from '@/components/ui/button';

import { useNavigate } from 'react-router-dom';

const MiniCTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-16 xl:py-20 px-4 xl:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <h3 className="text-2xl xl:text-3xl font-bold text-muted-foreground">
            Apni writing ko transform karne ke liye ready hain?
          </h3>
          <Button
            size="lg"
            className="text-lg xl:text-xl px-12 xl:px-16 py-7 xl:py-8 gradient-primary text-white hover:scale-105 transition-transform duration-300 font-bold shadow-2xl glow-primary rounded-2xl"
            onClick={() => navigate('/editor')}
          >
            LEKHAK Free mein Try Karein
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MiniCTASection;
