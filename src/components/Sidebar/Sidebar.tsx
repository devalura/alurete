'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface MenuItem {
  title: string;
  href?: string;
  items?: { title: string; href: string }[];
}

interface SidebarProps {
  items: MenuItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Branding', 'Components', 'Tokens'])
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/" className={styles.logoLink}>
          <h2 className={styles.logo}>Design System</h2>
        </Link>
      </div>

      <div className={styles.menuList}>
        {items.map((item) => (
          <div key={item.title} className={styles.menuSection}>
            {item.items ? (
              <>
                <button
                  className={`${styles.sectionTitle} ${
                    expandedSections.has(item.title) ? styles.expanded : ''
                  }`}
                  onClick={() => toggleSection(item.title)}
                >
                  <span>{item.title}</span>
                  <svg
                    className={styles.chevron}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {expandedSections.has(item.title) && (
                  <div className={styles.submenu}>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`${styles.menuItem} ${
                          isActive(subItem.href) ? styles.active : ''
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              item.href && (
                <Link
                  href={item.href}
                  className={`${styles.menuItem} ${styles.topLevel} ${
                    isActive(item.href) ? styles.active : ''
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
