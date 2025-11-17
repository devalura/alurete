'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import styles from './layout.module.css';

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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <Link href="/" className={styles.title}>
            Design System
          </Link>
        </div>
        <div className={styles.headerRight}>
          <Button variant="secondary" onClick={toggleTheme} size="small">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <nav className={styles.nav}>
          <div className={styles.navSection}>
            <div className={styles.navGroup}>Branding</div>
            <Link
              href="/branding"
              className={`${styles.navItem} ${isActive('/branding') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Overview
            </Link>
          </div>

          <div className={styles.navSection}>
            <div className={styles.navGroup}>Design Tokens</div>
            <Link
              href="/tokens/colors"
              className={`${styles.navItem} ${isActive('/tokens/colors') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Colors
            </Link>
            <Link
              href="/tokens/typography"
              className={`${styles.navItem} ${isActive('/tokens/typography') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Typography
            </Link>
          </div>

          <div className={styles.navSection}>
            <div className={styles.navGroup}>Components</div>
            <Link
              href="/components/alert"
              className={`${styles.navItem} ${isActive('/components/alert') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Alert
            </Link>
            <Link
              href="/components/avatar"
              className={`${styles.navItem} ${isActive('/components/avatar') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Avatar
            </Link>
            <Link
              href="/components/badge"
              className={`${styles.navItem} ${isActive('/components/badge') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Badge
            </Link>
            <Link
              href="/components/banner"
              className={`${styles.navItem} ${isActive('/components/banner') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Banner
            </Link>
            <Link
              href="/components/button"
              className={`${styles.navItem} ${isActive('/components/button') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Button
            </Link>
            <Link
              href="/components/card"
              className={`${styles.navItem} ${isActive('/components/card') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Card
            </Link>
            <Link
              href="/components/checkbox"
              className={`${styles.navItem} ${isActive('/components/checkbox') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Checkbox
            </Link>
            <Link
              href="/components/footer"
              className={`${styles.navItem} ${isActive('/components/footer') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Footer
            </Link>
            <Link
              href="/components/icons"
              className={`${styles.navItem} ${isActive('/components/icons') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Icons
            </Link>
            <Link
              href="/components/input"
              className={`${styles.navItem} ${isActive('/components/input') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Input
            </Link>
            <Link
              href="/components/progress"
              className={`${styles.navItem} ${isActive('/components/progress') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Progress
            </Link>
            <Link
              href="/components/radio"
              className={`${styles.navItem} ${isActive('/components/radio') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Radio
            </Link>
            <Link
              href="/components/tabs"
              className={`${styles.navItem} ${isActive('/components/tabs') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Tabs
            </Link>
            <Link
              href="/components/tag"
              className={`${styles.navItem} ${isActive('/components/tag') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Tag
            </Link>
          </div>

          <div className={styles.navSection}>
            <div className={styles.navGroup}>Features</div>
            <Link
              href="/components/exercise-option"
              className={`${styles.navItem} ${isActive('/components/exercise-option') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              ExerciseOption
            </Link>
            <Link
              href="/components/lesson-header"
              className={`${styles.navItem} ${isActive('/components/lesson-header') ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              LessonHeader
            </Link>
          </div>
        </nav>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
