import React, { forwardRef, ReactNode } from 'react';
import { PlayIcon } from '@/components/Icons';
import styles from './PlayButton.module.css';

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'large';
  device?: 'desktop' | 'mobile';
  children: ReactNode;
}

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(
  ({ size = 'large', device = 'desktop', children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[size]} ${styles[device]} ${className || ''}`}
        {...props}
      >
        <span className={styles.text}>{children}</span>
        <div className={styles.playIcon}>
          <div className={styles.playCircle}>
            <PlayIcon size={20} strokeWidth={0} fill="#1d4ed8" />
          </div>
        </div>
      </button>
    );
  }
);

PlayButton.displayName = 'PlayButton';
