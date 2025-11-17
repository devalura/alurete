'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import { layoutClasses } from '../components/layoutStyles';

interface BrandingLayoutProps {
  children: ReactNode;
}

export default function BrandingLayout({ children }: BrandingLayoutProps) {
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
    <div className={layoutClasses.container}>
      <header className={layoutClasses.header}>
        <div className={layoutClasses.headerLeft}>
          <button className={layoutClasses.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <Link href="/" className={layoutClasses.title}>
            Design System
          </Link>
        </div>
        <div className={layoutClasses.headerRight}>
          <Button variant="secondary" onClick={toggleTheme} size="small">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      {sidebarOpen && <div className={layoutClasses.overlay} onClick={() => setSidebarOpen(false)} />}

      <aside className={`${layoutClasses.sidebar} ${sidebarOpen ? layoutClasses.sidebarOpen : ''}`}>
        <nav className={layoutClasses.nav}>
          <div className={layoutClasses.navSection}>
            <div className={layoutClasses.navGroup}>Branding</div>
            <Link
              href="/branding"
              className={`${layoutClasses.navItem} ${isActive('/branding') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Overview
            </Link>
          </div>

          <div className={layoutClasses.navSection}>
            <div className={layoutClasses.navGroup}>Design Tokens</div>
            <Link
              href="/tokens/colors"
              className={`${layoutClasses.navItem} ${isActive('/tokens/colors') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Colors
            </Link>
            <Link
              href="/tokens/typography"
              className={`${layoutClasses.navItem} ${isActive('/tokens/typography') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Typography
            </Link>
          </div>

          <div className={layoutClasses.navSection}>
            <div className={layoutClasses.navGroup}>Components</div>
            <Link
              href="/components/alert"
              className={`${layoutClasses.navItem} ${isActive('/components/alert') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Alert
            </Link>
            <Link
              href="/components/avatar"
              className={`${layoutClasses.navItem} ${isActive('/components/avatar') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Avatar
            </Link>
            <Link
              href="/components/badge"
              className={`${layoutClasses.navItem} ${isActive('/components/badge') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Badge
            </Link>
            <Link
              href="/components/banner"
              className={`${layoutClasses.navItem} ${isActive('/components/banner') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Banner
            </Link>
            <Link
              href="/components/button"
              className={`${layoutClasses.navItem} ${isActive('/components/button') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Button
            </Link>
            <Link
              href="/components/card"
              className={`${layoutClasses.navItem} ${isActive('/components/card') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Card
            </Link>
            <Link
              href="/components/checkbox"
              className={`${layoutClasses.navItem} ${isActive('/components/checkbox') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Checkbox
            </Link>
            <Link
              href="/components/footer"
              className={`${layoutClasses.navItem} ${isActive('/components/footer') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Footer
            </Link>
            <Link
              href="/components/icons"
              className={`${layoutClasses.navItem} ${isActive('/components/icons') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Icons
            </Link>
            <Link
              href="/components/input"
              className={`${layoutClasses.navItem} ${isActive('/components/input') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Input
            </Link>
            <Link
              href="/components/progress"
              className={`${layoutClasses.navItem} ${isActive('/components/progress') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Progress
            </Link>
            <Link
              href="/components/radio"
              className={`${layoutClasses.navItem} ${isActive('/components/radio') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Radio
            </Link>
            <Link
              href="/components/tabs"
              className={`${layoutClasses.navItem} ${isActive('/components/tabs') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Tabs
            </Link>
            <Link
              href="/components/tag"
              className={`${layoutClasses.navItem} ${isActive('/components/tag') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Tag
            </Link>
          </div>

          <div className={layoutClasses.navSection}>
            <div className={layoutClasses.navGroup}>Features</div>
            <Link
              href="/components/exercise-option"
              className={`${layoutClasses.navItem} ${isActive('/components/exercise-option') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              ExerciseOption
            </Link>
            <Link
              href="/components/lesson-header"
              className={`${layoutClasses.navItem} ${isActive('/components/lesson-header') ? layoutClasses.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              LessonHeader
            </Link>
          </div>
        </nav>
      </aside>

      <main className={layoutClasses.main}>
        {children}
      </main>
    </div>
  );
}
