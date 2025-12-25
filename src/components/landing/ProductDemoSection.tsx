import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProductDemoSection: React.FC = () => {
  return (
    <section className="w-full py-16 xl:py-24 px-4 xl:px-8 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12 xl:mb-16">
          <h2 className="text-3xl xl:text-5xl font-bold">See It in Action</h2>
          <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how LEKHAK helps you write better with real-time suggestions
          </p>
        </div>

        <Card className="bg-background border-border">
          <CardContent className="p-6 xl:p-12">
            {/* Editor Demo */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 xl:p-8 min-h-[300px] xl:min-h-[400px]">
                <div className="space-y-4 text-base xl:text-lg leading-relaxed">
                  <p className="text-foreground">
                    I am{' '}
                    <span className="relative inline-block">
                      <span className="border-b-2 border-error">writting</span>
                      <span className="absolute -top-8 left-0 bg-popover border border-border rounded-md px-3 py-1 text-sm shadow-lg whitespace-nowrap hidden xl:inline-block">
                        writing
                      </span>
                    </span>
                    {' '}a email to my boss about the{' '}
                    <span className="relative inline-block">
                      <span className="border-b-2 border-tone">project update</span>
                      <span className="absolute -top-8 left-0 bg-popover border border-border rounded-md px-3 py-1 text-sm shadow-lg whitespace-nowrap hidden xl:inline-block">
                        Consider: "project status"
                      </span>
                    </span>
                    .
                  </p>
                  <p className="text-foreground">
                    मैं{' '}
                    <span className="relative inline-block">
                      <span className="border-b-2 border-improvement">बहुत खुश</span>
                      <span className="absolute -top-8 left-0 bg-popover border border-border rounded-md px-3 py-1 text-sm shadow-lg whitespace-nowrap hidden xl:inline-block">
                        Better: "अत्यंत प्रसन्न"
                      </span>
                    </span>
                    {' '}हूं कि आपने मुझे यह opportunity दी।
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 xl:gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-error"></div>
                  <span className="text-muted-foreground">Grammar errors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-tone"></div>
                  <span className="text-muted-foreground">Tone suggestions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-improvement"></div>
                  <span className="text-muted-foreground">Improvements</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProductDemoSection;
