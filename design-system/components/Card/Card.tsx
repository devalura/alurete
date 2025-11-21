import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante visual do card
   */
  variant?: 'default' | 'secondary';
  
  /**
   * Padding interno do card
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
  
  /**
   * Header do card
   */
  header?: React.ReactNode;
  
  /**
   * Footer do card
   */
  footer?: React.ReactNode;
  
  /**
   * Conteúdo do card
   */
  children: React.ReactNode;
  
  /**
   * Se o card deve ter hover effect
   */
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'medium',
      header,
      footer,
      children,
      hoverable = false,
      className,
      ...props
    },
    ref
  ) => {
    const cardClasses = [
      styles.card,
      styles[variant],
      styles[`padding-${padding}`],
      hoverable && styles.hoverable,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {header && <div className={styles.header}>{header}</div>}
        
        <div className={styles.content}>{children}</div>
        
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
