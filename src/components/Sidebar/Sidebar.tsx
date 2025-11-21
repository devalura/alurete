'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brand } from '@/components/Brand';
import styles from './Sidebar.module.css';

export interface MenuItem {
  title: string;
  href?: string;
  items?: MenuItem[];
}

export interface SidebarProps {
  menuItems: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
  themeButton?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems, isOpen = false, onClose, themeButton }) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    // Se tem subitens, é um grupo
    if (item.items && item.items.length > 0) {
      return (
        <div key={item.title} className={styles.menuGroup}>
          <div className={styles.menuGroupTitle}>{item.title}</div>
          <div className={styles.menuGroupItems}>
            {item.items.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        </div>
      );
    }

    // Se não tem href, é só um título
    if (!item.href) {
      return (
        <div key={item.title} className={styles.menuGroupTitle}>
          {item.title}
        </div>
      );
    }

    // É um item clicável
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${styles.menuItem} ${isActive(item.href) ? styles.menuItemActive : ''}`}
        onClick={onClose}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoLink} onClick={onClose}>
            <Brand product="alura" width={120} height={56} />
          </Link>
          {themeButton && (
            <div className={styles.themeButtonWrapper}>
              {themeButton}
            </div>
          )}
        </div>

        <nav className={styles.menuList}>
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.footerText}>Design System v1.0</p>
          <p className={styles.footerCopyright}>© 2024 Alura</p>
        </div>
      </aside>
    </>
  );
};
