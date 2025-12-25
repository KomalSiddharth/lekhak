import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 xl:py-16 px-4 xl:px-8 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 xl:gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">LEKHAK</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI Writing Assistant for Indian Languages. Write confidently in English, Hindi, or Hinglish.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-primary transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="#updates" className="hover:text-primary transition-colors">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#help" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col xl:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 LEKHAK. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#twitter" className="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#linkedin" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#facebook" className="hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#instagram" className="hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
