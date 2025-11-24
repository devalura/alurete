import React from 'react';
import styles from './Tag.module.css';

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
  const tagClasses = [
    styles.tag,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={tagClasses}
      {...props}
    >
      {leftIcon && (
        <span className={styles.icon}>
          {leftIcon}
        </span>
      )}
      <span className={styles.label}>
        {children}
      </span>
      {rightIcon && (
        <span className={styles.icon}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};
