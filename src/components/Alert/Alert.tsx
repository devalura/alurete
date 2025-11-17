import React, { forwardRef, ReactNode, useState } from 'react';
import { Button } from '../Button';
import { CheckCircleIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from '@/components/Icons';
import styles from './Alert.module.css';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  showActions?: boolean;
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    variant = 'info', 
    title, 
    children, 
    closable = true, 
    onClose,
    showActions = false,
    primaryAction = 'BUTTON',
    secondaryAction = 'BUTTON',
    onPrimaryAction,
    onSecondaryAction,
    className, 
    ...props 
  }, ref) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    const icons = {
      success: <CheckCircleIcon size={24} />,
      error: <AlertCircleIcon size={24} />,
      warning: <AlertTriangleIcon size={24} />,
      info: <InfoIcon size={24} />,
    };

    const titles = {
      success: 'SUCCESS',
      error: 'ERROR',
      warning: 'ALERT',
      info: 'INFO',
    };

    return (
      <div
        ref={ref}
        className={`${styles.alert} ${styles[variant]} ${className || ''}`}
        role="alert"
        {...props}
      >
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <div className={styles.titleSection}>
              <span className={styles.icon}>{icons[variant]}</span>
              <h4 className={styles.title}>{title || titles[variant]}</h4>
            </div>
            {closable && (
              <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close alert"
              >
                <XIcon size={20} />
              </button>
            )}
          </div>
          {children && <div className={styles.message}>{children}</div>}
          {showActions && (
            <div className={styles.actions}>
              <Button 
                variant="secondary" 
                size="small"
                onClick={onSecondaryAction}
              >
                {secondaryAction}
              </Button>
              <Button 
                variant="secondary" 
                size="small"
                onClick={onPrimaryAction}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-brand-default)'
                }}
              >
                {primaryAction}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
