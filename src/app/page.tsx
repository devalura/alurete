'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import styles from './page.module.css';

export default function Home() {
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Design System</h1>
        <div className={styles.headerActions}>
          <nav className={styles.mainNav}>
            <Link href="/components/button" className={styles.navLink}>
              Components
            </Link>
            <Link href="/tokens/colors" className={styles.navLink}>
              Tokens
            </Link>
          </nav>
          <Button variant="secondary" onClick={toggleTheme} size="small">
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Bem-vindo ao Design System</h2>
          <p className={styles.heroDescription}>
            Sistema de design completo baseado em tokens semânticos, com componentes React reutilizáveis
            e suporte a tema claro/escuro.
          </p>
        </section>

        <section className={styles.overviewSection}>
          <h3>Components</h3>
          <p className={styles.sectionDescription}>
            Biblioteca de componentes React com TypeScript, CSS Modules e design tokens.
          </p>
          <div className={styles.cardGrid}>
            <Link href="/components/button" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Button</h4>
                  <p>Botões com variantes primary e secondary, 3 tamanhos e estados completos.</p>
                  <div className={styles.cardDemo}>
                    <Button variant="primary" size="small">Demo</Button>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/components/input" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Input</h4>
                  <p>Campos de entrada com validação, ícones e helper text.</p>
                </div>
              </Card>
            </Link>

            <Link href="/components/card" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Card</h4>
                  <p>Containers versáteis com header, footer e padding configurável.</p>
                </div>
              </Card>
            </Link>

            <Link href="/components/alert" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Alert</h4>
                  <p>Mensagens de feedback com 4 variantes e opção de fechar.</p>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        <section className={styles.overviewSection}>
          <h3>Design Tokens</h3>
          <p className={styles.sectionDescription}>
            Tokens de design semânticos para cores, tipografia, espaçamento e mais.
          </p>
          <div className={styles.cardGrid}>
            <Link href="/tokens/colors" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Colors</h4>
                  <p>50+ tokens de cor semânticos organizados por função e contexto.</p>
                  <div className={styles.colorPreview}>
                    <div style={{ backgroundColor: 'var(--color-brand-default)' }} />
                    <div style={{ backgroundColor: 'var(--color-feedback-success-default)' }} />
                    <div style={{ backgroundColor: 'var(--color-feedback-error-default)' }} />
                    <div style={{ backgroundColor: 'var(--color-feedback-warning-default)' }} />
                    <div style={{ backgroundColor: 'var(--color-feedback-info-default)' }} />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/tokens/typography" className={styles.cardLink}>
              <Card hoverable>
                <div className={styles.cardContent}>
                  <h4>Typography</h4>
                  <p>Sistema tipográfico com 4 famílias de fontes e escalas de tamanho.</p>
                  <div className={styles.typographyPreview}>
                    <span style={{ fontFamily: 'var(--font-family-brand)', fontSize: 'var(--font-size-xl)' }}>Aa</span>
                    <span style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-base)' }}>Typography</span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h4>🎨 Theme Support</h4>
            <p>Suporte completo a tema claro e escuro com persistência local.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>♿ Accessible</h4>
            <p>Componentes construídos com acessibilidade e semântica HTML.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>🔧 TypeScript</h4>
            <p>Totalmente tipado com interfaces TypeScript para todos os componentes.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>📱 Responsive</h4>
            <p>Design responsivo que funciona em todos os tamanhos de tela.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Design System • Baseado em design-tokens.json • Theme: {theme}</p>
      </footer>
    </div>
  );
}
