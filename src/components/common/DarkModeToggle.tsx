import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Check localStorage aur system preference
    const applyTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
      const stored = localStorage.getItem('theme');
      const prefersDark = e ? (e as MediaQueryList).matches : mediaQuery.matches;
      const shouldBeDark = stored === 'dark' || (!stored && prefersDark);

      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

    // Listen for system changes
    const handler = (e: MediaQueryListEvent) => applyTheme(e);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDarkMode}
      className="rounded-full w-10 h-10 glow-hover border shadow-sm shrink-0"
      aria-label="Dark mode toggle"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gold" />
      ) : (
        <Moon className="h-4 w-4 text-primary" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
