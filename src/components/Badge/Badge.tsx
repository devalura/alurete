import React from 'react';

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
    const baseClasses = "inline-flex items-center justify-center font-sans font-medium rounded-full whitespace-nowrap transition-all";
    
    const sizeClasses = {
      small: "px-2 py-0.5 text-xs leading-4 min-h-[20px]",
      medium: "px-3 py-1 text-sm leading-5 min-h-[24px]",
      large: "px-4 py-1.5 text-base leading-6 min-h-[28px]"
    };

    const variantClasses = {
      solid: {
        success: "bg-[var(--color-feedback-success-default)] text-[var(--color-base-white)]",
        error: "bg-[var(--color-feedback-error-default)] text-[var(--color-base-white)]",
        warning: "bg-[var(--color-feedback-attention-default)] text-[var(--color-base-white)]",
        info: "bg-[var(--color-feedback-info-default)] text-[var(--color-base-white)]",
        neutral: "bg-[var(--color-text-body)] text-[var(--color-base-white)]"
      },
      outline: {
        success: "bg-transparent border-[var(--border-width)] border-solid border-[var(--color-feedback-success-default)] text-[var(--color-feedback-success-default)]",
        error: "bg-transparent border-[var(--border-width)] border-solid border-[var(--color-feedback-error-default)] text-[var(--color-feedback-error-default)]",
        warning: "bg-transparent border-[var(--border-width)] border-solid border-[var(--color-feedback-attention-default)] text-[var(--color-feedback-attention-default)]",
        info: "bg-transparent border-[var(--border-width)] border-solid border-[var(--color-feedback-info-default)] text-[var(--color-feedback-info-default)]",
        neutral: "bg-transparent border-[var(--border-width)] border-solid border-[var(--color-border-default)] text-[var(--color-text-body)]"
      },
      subtle: {
        success: "bg-[var(--color-feedback-success-surface)] text-[var(--color-feedback-success-default)]",
        error: "bg-[var(--color-feedback-error-surface)] text-[var(--color-feedback-error-default)]",
        warning: "bg-[var(--color-feedback-attention-surface)] text-[var(--color-feedback-attention-default)]",
        info: "bg-[var(--color-feedback-info-surface)] text-[var(--color-feedback-info-default)]",
        neutral: "bg-[var(--color-surface-subtle)] text-[var(--color-text-body)]"
      }
    };

    return (
      <span 
        ref={ref} 
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[appearance][variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
      </span>
    );
  }
);

Badge.displayName = 'Badge';
