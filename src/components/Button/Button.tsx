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
    const baseClasses = "font-sans font-bold uppercase inline-flex items-center justify-center gap-2 border-none cursor-pointer transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[var(--color-brand-default)] focus-visible:outline-offset-2";
    
    const variantClasses = {
      primary: "bg-[var(--color-brand-default)] text-[var(--color-text-on-brand)] shadow-[inset_0_0_10px_0_rgba(2,6,23,0.3)] hover:bg-[#1e40af] active:bg-[#1e3a8a] disabled:bg-[#93c5fd] disabled:cursor-not-allowed disabled:opacity-60",
      secondary: "bg-[#f8fafc] text-[var(--color-brand-default)] border-[0.5px] border-solid border-[var(--color-brand-default)] shadow-none hover:bg-[#eff6ff] active:bg-[#dbeafe] disabled:text-[#cbd5e1] disabled:border-[#cbd5e1] disabled:cursor-not-allowed disabled:opacity-60",
      ghost: "bg-transparent text-[var(--color-brand-default)] border-none shadow-none hover:bg-[#eff6ff] active:bg-[#dbeafe] disabled:text-[#cbd5e1] disabled:cursor-not-allowed disabled:opacity-60",
      link: "bg-transparent text-[var(--color-brand-default)] border-none shadow-none p-0 min-h-0 hover:underline hover:bg-transparent active:opacity-80 disabled:text-[#cbd5e1] disabled:cursor-not-allowed disabled:opacity-60 disabled:no-underline"
    };
    
    const sizeClasses = {
      small: variant === 'link' ? '' : "px-4 py-[6px] text-xs leading-none min-h-[28px]",
      medium: variant === 'link' ? '' : "px-4 py-2 text-sm leading-none min-h-[35px]",
      large: variant === 'link' ? '' : "px-5 py-3 text-base leading-none min-h-[46px]"
    };

    const iconSizeClasses = {
      small: "w-4 h-4",
      medium: "w-4 h-4",
      large: "w-[22px] h-[22px]"
    };

    const roundedClass = variant === 'link' ? '' : 'rounded-full';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${className || ''}`}
        {...props}
      >
        {startIcon && <span className={`inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses[size]}`}>{startIcon}</span>}
        {children}
        {endIcon && <span className={`inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses[size]}`}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
