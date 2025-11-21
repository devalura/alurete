import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante visual do badge
   */
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  
  /**
   * Estilo do badge
   */
  appearance?: 'solid' | 'outline' | 'subtle';
  
  /**
   * Tamanho do badge
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Conteúdo do badge
   */
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      appearance = 'solid',
      size = 'medium',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const badgeClasses = [
      styles.badge,
      styles[variant],
      styles[appearance],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
