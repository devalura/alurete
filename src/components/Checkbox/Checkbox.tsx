import React, { forwardRef, InputHTMLAttributes } from 'react';
import { CheckIcon } from '@/components/Icons';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label do checkbox
   */
  label?: string;
  
  /**
   * Ícone de informação ao lado do label
   */
  showInfoIcon?: boolean;
  
  /**
   * Callback para o clique no ícone de informação
   */
  onInfoClick?: () => void;
  
  /**
   * Botão auxiliar ao lado do label
   */
  auxiliaryButton?: React.ReactNode;
  
  /**
   * Classe CSS adicional para o container
   */
  className?: string;
  
  /**
   * Classe CSS adicional para o label
   */
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      showInfoIcon,
      onInfoClick,
      auxiliaryButton,
      className,
      labelClassName,
      disabled,
      checked,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    const containerClasses = [
      styles.container,
      disabled && styles.containerDisabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    
    const checkboxClasses = [
      styles.checkbox,
      checked && styles.checkboxChecked,
      disabled && styles.checkboxDisabled,
    ]
      .filter(Boolean)
      .join(' ');
    
    const labelClasses = [
      styles.label,
      disabled && styles.labelDisabled,
      labelClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <div className={styles.checkboxWrapper}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={styles.input}
            disabled={disabled}
            checked={checked}
            {...props}
          />
          <div className={checkboxClasses}>
            {checked && (
              <CheckIcon size={12} className={styles.checkIcon} />
            )}
          </div>
        </div>
        
        {label && (
          <div className={styles.labelWrapper}>
            <label htmlFor={checkboxId} className={labelClasses}>
              {label}
            </label>
            
            {showInfoIcon && (
              <button
                type="button"
                className={styles.infoIcon}
                onClick={onInfoClick}
                disabled={disabled}
                aria-label="Mais informações"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
                  <text
                    x="6"
                    y="9"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    i
                  </text>
                </svg>
              </button>
            )}
            
            {auxiliaryButton && (
              <div className={styles.auxiliaryButton}>
                {auxiliaryButton}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
