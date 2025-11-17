import React, { forwardRef, ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', startIcon, endIcon, children, className, ...props }, ref) => {
    const baseClasses = 'font-sans font-bold uppercase inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-all border-none cursor-pointer';
    
    const variantClasses = {
      primary: 'bg-[var(--color-brand-default)] text-[var(--color-text-on-brand)] shadow-[inset_0_0_10px_0_rgba(2,6,23,0.3)] hover:enabled:bg-[var(--color-blue-800)] active:enabled:bg-[var(--color-blue-900)] disabled:bg-[var(--color-blue-300)] disabled:cursor-not-allowed disabled:opacity-60',
      secondary: 'bg-[var(--color-slate-50)] text-[var(--color-brand-default)] border border-solid border-[var(--color-brand-default)] shadow-none hover:enabled:bg-[var(--color-blue-50)] active:enabled:bg-[var(--color-blue-100)] disabled:text-[var(--color-slate-300)] disabled:border-[var(--color-slate-300)] disabled:cursor-not-allowed disabled:opacity-60',
      ghost: 'bg-transparent text-[var(--color-brand-default)] shadow-none hover:enabled:bg-[var(--color-blue-50)] active:enabled:bg-[var(--color-blue-100)] disabled:text-[var(--color-slate-300)] disabled:cursor-not-allowed disabled:opacity-60',
      link: 'bg-transparent text-[var(--color-brand-default)] shadow-none underline hover:enabled:no-underline disabled:text-[var(--color-slate-300)] disabled:cursor-not-allowed disabled:opacity-60',
    };
    
    const sizeClasses = {
      small: 'px-4 py-[6px] text-xs leading-none min-h-[28px]',
      medium: 'px-4 py-2 text-sm leading-none min-h-[35px]',
      large: 'px-5 py-3 text-base leading-none min-h-[46px]',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
        {...props}
      >
        {startIcon && <span>{startIcon}</span>}
        {children}
        {endIcon && <span>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
