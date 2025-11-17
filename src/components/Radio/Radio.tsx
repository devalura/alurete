import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showInfo?: boolean;
  onInfoClick?: () => void;
  auxiliaryButton?: {
    text: string;
    onClick: () => void;
  };
}

export const Radio: React.FC<RadioProps> = ({
  label,
  showInfo = false,
  onInfoClick,
  auxiliaryButton,
  className,
  disabled,
  ...props
}) => {
  return (
    <div className={`${styles.radioWrapper} ${className || ''}`}>
      <label className={`${styles.radioContainer} ${disabled ? styles.disabled : ''}`}>
        <input
          type="radio"
          className={styles.radioInput}
          disabled={disabled}
          {...props}
        />
        <span className={styles.radioCustom}>
          <span className={styles.radioDot}></span>
        </span>
        
        {label && (
          <span className={styles.radioLabel}>
            {label}
          </span>
        )}
        
        {showInfo && !disabled && (
          <button
            type="button"
            className={styles.infoButton}
            onClick={onInfoClick}
            aria-label="More information"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="currentColor" />
            </svg>
          </button>
        )}
      </label>
      
      {auxiliaryButton && !disabled && (
        <button
          type="button"
          className={styles.auxiliaryButton}
          onClick={auxiliaryButton.onClick}
        >
          {auxiliaryButton.text}
        </button>
      )}
    </div>
  );
};
