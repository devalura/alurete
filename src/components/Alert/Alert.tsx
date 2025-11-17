import React, { forwardRef, ReactNode, useState } from 'react';
import { Button } from '../Button';
import { CheckCircleIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, XIcon } from '@/components/Icons';

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

    const borderTopColors = {
      success: 'border-t-[#a7f3d0]',
      error: 'border-t-[#fecaca]',
      warning: 'border-t-[#fef08a]',
      info: 'border-t-[#bfdbfe]'
    };

    const iconColors = {
      success: 'text-[#10b981]',
      error: 'text-[#ef4444]',
      warning: 'text-[#f59e0b]',
      info: 'text-[#3b82f6]'
    };

    return (
      <div
        ref={ref}
        className={`border border-[#e0e7ff] rounded-[var(--border-radius-lg)] overflow-hidden ${className || ''}`}
        role="alert"
        {...props}
      >
        <div className={`bg-[#f8fafc] p-5 px-6 flex flex-col gap-5 rounded-[var(--border-radius-lg)] border-t-[6px] ${borderTopColors[variant]}`}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-2 flex-1">
              <span className={`w-6 h-6 flex-shrink-0 ${iconColors[variant]}`}>{icons[variant]}</span>
              <h4 className="font-[var(--font-family-brand)] text-base font-bold uppercase text-[#334155] m-0 leading-[1.3]">{title || titles[variant]}</h4>
            </div>
            {closable && (
              <button
                className="bg-none border-none cursor-pointer p-0 w-6 h-6 text-[#64748b] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                onClick={handleClose}
                aria-label="Close alert"
              >
                <XIcon size={20} />
              </button>
            )}
          </div>
          {children && <div className="font-sans text-sm font-normal text-[#63717d] leading-[1.3] mt-1.5">{children}</div>}
          {showActions && (
            <div className="flex gap-2 items-center">
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
