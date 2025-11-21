import React, { forwardRef, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'xsmall';
  icon: ReactNode;
  label?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'primary', size = 'medium', icon, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
        aria-label={label}
        {...props}
      >
        <span className={styles.icon}>{icon}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
