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
  const baseClasses = 'inline-flex items-center gap-1 px-2 py-1 rounded-md font-sans text-xs font-medium leading-4';
  
  const variantClasses = {
    primary: 'bg-[var(--color-brand-light)] text-[var(--color-brand-default)]',
    secondary: 'bg-[var(--color-surface-subtle)] text-[var(--color-text-body)]',
    attention: 'bg-[var(--color-yellow-100)] text-[var(--color-yellow-700)]',
    error: 'bg-[var(--color-red-200)] text-[var(--color-red-800)]',
    success: 'bg-[var(--color-emerald-200)] text-[var(--color-emerald-800)]',
  };
  
  const iconClasses = {
    primary: 'text-[var(--color-brand-default)]',
    secondary: 'text-[var(--color-text-body)]',
    attention: 'text-[var(--color-yellow-700)]',
    error: 'text-[var(--color-red-800)]',
    success: 'text-[var(--color-emerald-800)]',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      {leftIcon && (
        <span className={`flex items-center justify-center w-4 h-4 ${iconClasses[variant]}`}>
          {leftIcon}
        </span>
      )}
      <span className="font-sans text-xs font-medium leading-4">
        {children}
      </span>
      {rightIcon && (
        <span className={`flex items-center justify-center w-4 h-4 ${iconClasses[variant]}`}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};
