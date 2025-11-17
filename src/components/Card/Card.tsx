import React from 'react';

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
    const baseClasses = 'border border-solid border-[var(--color-border-default)] rounded-xl transition-all duration-200 ease-in-out flex flex-col';
    
    const variantClasses = {
      default: 'bg-[var(--card-surface)]',
      secondary: 'bg-[var(--card-secondary)]',
    };
    
    const paddingClasses = {
      none: 'p-0',
      small: 'p-3',
      medium: 'p-6',
      large: 'p-8',
    };
    
    const hoverClasses = hoverable 
      ? 'cursor-pointer hover:border-[var(--color-border-selected)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
      : '';
    
    const headerPaddingFix = padding === 'none' ? 'px-6 pt-6' : '';
    const footerPaddingFix = padding === 'none' ? 'px-6 pb-6' : '';

    return (
      <div 
        ref={ref} 
        className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className || ''}`}
        {...props}
      >
        {header && (
          <div className={`pb-4 border-b border-solid border-[var(--color-border-subtle)] mb-4 ${headerPaddingFix}`}>
            {header}
          </div>
        )}
        
        <div className="flex-1">{children}</div>
        
        {footer && (
          <div className={`pt-4 border-t border-solid border-[var(--color-border-subtle)] mt-4 ${footerPaddingFix}`}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
