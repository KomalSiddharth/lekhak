import { ArrowRight, Download } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-primary rounded-2xl p-8 xl:p-16 text-center text-primary-foreground">
          <div className="max-w-3xl mx-auto space-y-6 xl:space-y-8">
            <h2 className="text-3xl xl:text-5xl font-bold">
              Ready to Write Better?
            </h2>
            <p className="text-lg xl:text-xl opacity-90">
              Join thousands of writers who trust LEKHAK for their daily writing needs.
              Start free, no credit card required.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base xl:text-lg px-6 xl:px-8 py-5 xl:py-6">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base xl:text-lg px-6 xl:px-8 py-5 xl:py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Download className="mr-2 h-5 w-5" />
                Download App
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 xl:gap-8 justify-center text-sm opacity-80 pt-4">
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span>Web App</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>Android</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🍎</span>
                <span>iOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
