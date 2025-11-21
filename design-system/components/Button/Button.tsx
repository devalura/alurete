import React, { forwardRef, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', startIcon, endIcon, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
        {...props}
      >
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
