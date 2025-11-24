import React, { forwardRef } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: '24' | '32' | '40' | '110';
  src?: string;
  alt?: string;
  name?: string;
}

const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = '40', src, alt, name = '', className, ...props }, ref) => {
    const initials = !src && name ? getInitials(name) : '';

    const sizeClass = styles[`size${size}`];
    const textClass = styles[`text${size}`];

    return (
      <div
        ref={ref}
        className={`${styles.avatar} ${sizeClass} ${!src ? styles.hasBackground : ''} ${className || ''}`}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className={styles.image}
          />
        ) : (
          <p className={`${styles.initials} ${textClass}`}>
            {initials}
          </p>
        )}
        {size === '110' && src && (
          <div className={styles.overlay} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
