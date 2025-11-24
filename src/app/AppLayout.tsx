'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/Button';
import type { MenuItem } from '@/components/Sidebar';
import styles from './AppLayout.module.css';

// Estrutura de menu com arquitetura de informação bem organizada
const menuItems: MenuItem[] = [
  {
    title: 'Início',
    href: '/',
  },
  {
    title: 'Fundamentos',
    items: [
      { title: 'Branding', href: '/branding' },
      { title: 'Colors', href: '/tokens/colors' },
      { title: 'Typography', href: '/tokens/typography' },
    ],
  },
  {
    title: 'Componentes Base',
    items: [
      { title: 'Alert', href: '/components/alert' },
      { title: 'Avatar', href: '/components/avatar' },
      { title: 'Button', href: '/components/button' },
      { title: 'Checkbox', href: '/components/checkbox' },
      { title: 'Icons', href: '/components/icons' },
      { title: 'Input', href: '/components/input' },
      { title: 'Progress', href: '/components/progress' },
      { title: 'Radio', href: '/components/radio' },
      { title: 'Tag', href: '/components/tag' },
    ],
  },
  {
    title: 'Componentes de Layout',
    items: [
      { title: 'Card', href: '/components/card' },
      { title: 'Footer', href: '/components/footer' },
      { title: 'Tabs', href: '/components/tabs' },
    ],
  },
  {
    title: 'Componentes Específicos',
    items: [
      { title: 'Banner', href: '/components/banner' },
      { title: 'ExerciseOption', href: '/components/exercise-option' },
      { title: 'LessonHeader', href: '/components/lesson-header' },
    ],
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className={styles.appLayout}>
      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        themeButton={
          <Button variant="secondary" onClick={toggleTheme} size="small">
            {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </Button>
        }
      />

      <div className={styles.mainWrapper}>
        <button
          className={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};
