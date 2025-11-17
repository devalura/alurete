'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

interface BrandingLayoutProps {
  children: ReactNode;
}

export default function BrandingLayout({ children }: BrandingLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

