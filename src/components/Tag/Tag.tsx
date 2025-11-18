import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'attention' | 'error' | 'success';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'primary',
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[var(--radius-pill,9999px)] font-[family-name:var(--font-family-brand)] text-[12px] font-semibold leading-normal text-nowrap';
  
  const variantClasses = {
    primary: 'bg-[var(--color-surface-brand,#dbeafe)] text-[var(--color-brand-default,#1d4ed8)]',
    secondary: 'bg-[var(--color-surface-secondary,#eef2ff)] text-[var(--color-text-title,#334155)]',
    attention: 'bg-[var(--color-feedback-attention-surface,#fef3c7)] text-[var(--color-feedback-attention-default,#f59e0b)]',
    error: 'bg-[var(--color-feedback-error-surface,#fee2e2)] text-[var(--color-feedback-error-default,#dc2626)]',
    success: 'bg-[var(--color-feedback-success-surface,#dcfce7)] text-[var(--color-feedback-success-default,#059669)]',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center justify-center shrink-0 size-[12px]">
          {leftIcon}
        </span>
      )}
      <span className="flex flex-col justify-center leading-[0]">
        <p className="leading-normal whitespace-pre">{children}</p>
      </span>
      {rightIcon && (
        <span className="flex items-center justify-center shrink-0 size-[12px]">
          {rightIcon}
        </span>
      )}
    </div>
  );
};
