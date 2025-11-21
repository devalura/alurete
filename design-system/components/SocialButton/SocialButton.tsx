import React, { forwardRef, ReactNode } from 'react';
import styles from './SocialButton.module.css';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label?: string;
}

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className || ''}`}
        aria-label={label}
        {...props}
      >
        <span className={styles.icon}>{icon}</span>
      </button>
    );
  }
);

SocialButton.displayName = 'SocialButton';
