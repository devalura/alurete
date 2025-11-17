'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';

interface ComponentsLayoutProps {
  children: ReactNode;
}

export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[var(--color-surface-secondary)] border-b border-solid border-[var(--color-border-default)] fixed top-0 left-0 right-0 z-[100] backdrop-blur-[8px] h-16">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-2xl cursor-pointer text-[var(--color-text-title)] p-2 rounded-[var(--border-radius)] transition-colors hover:bg-[var(--color-surface-subtle)]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <Link href="/" className="font-[var(--font-family-brand)] text-xl m-0 no-underline text-[var(--color-text-title)] hover:text-[var(--color-brand-default)]">
            Design System
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="secondary" onClick={toggleTheme} size="small">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/50 z-[85] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-[var(--color-surface-secondary)] border-r border-[var(--color-border-default)] overflow-y-auto z-[90] transition-all duration-300 ease-in-out md:translate-x-0 shadow-lg backdrop-blur-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="py-8 px-2">
          {/* Branding Section */}
          <div className="mb-8">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-body)] opacity-70 mb-3">
              Branding
            </div>
            <Link
              href="/branding"
              className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 ${isActive('/branding') ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Overview
            </Link>
          </div>

          {/* Design Tokens Section */}
          <div className="mb-8">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-body)] opacity-70 mb-3">
              Design Tokens
            </div>
            <Link
              href="/tokens/colors"
              className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 ${isActive('/tokens/colors') ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Colors
            </Link>
            <Link
              href="/tokens/typography"
              className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 ${isActive('/tokens/typography') ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Typography
            </Link>
          </div>

          {/* Components Section */}
          <div className="mb-8">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-body)] opacity-70 mb-3">
              Components
            </div>
            {['alert', 'avatar', 'badge', 'banner', 'button', 'card', 'checkbox', 'footer', 'icons', 'input', 'progress', 'radio', 'tabs', 'tag'].map((component) => (
              <Link
                key={component}
                href={`/components/${component}`}
                className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 capitalize ${isActive(`/components/${component}`) ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {component}
              </Link>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-body)] opacity-70 mb-3">
              Features
            </div>
            <Link
              href="/components/exercise-option"
              className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 ${isActive('/components/exercise-option') ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              ExerciseOption
            </Link>
            <Link
              href="/components/lesson-header"
              className={`block w-full px-4 py-2.5 mx-2 rounded-lg text-left text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)] hover:translate-x-1 ${isActive('/components/lesson-header') ? 'bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] font-semibold shadow-sm' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              LessonHeader
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16">
        {children}
      </main>
    </div>
  );
}

