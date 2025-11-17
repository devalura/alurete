import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label do input
   */
  label?: string;
  
  /**
   * Indica se o campo é opcional
   */
  isOptional?: boolean;
  
  /**
   * Texto de ajuda abaixo do input
   */
  helperText?: string;
  
  /**
   * Estado visual do input
   */
  variant?: 'default' | 'error' | 'success';
  
  /**
   * Tamanho do input
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Ícone à esquerda
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Ícone à direita
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Indica se o input ocupa toda a largura disponível
   */
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      isOptional = false,
      helperText,
      variant = 'default',
      size = 'medium',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const containerClasses = [
      styles.container,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.inputWrapper,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
      leftIcon && styles.hasLeftIcon,
      rightIcon && styles.hasRightIcon,
    ]
      .filter(Boolean)
      .join(' ');

    const helperClasses = [
      styles.helperText,
      variant === 'error' && styles.helperError,
      variant === 'success' && styles.helperSuccess,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <div className={styles.labelWrapper}>
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
            {isOptional && (
              <span className={styles.optional}>(opcional)</span>
            )}
          </div>
        )}
        
        <div className={wrapperClasses}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        
        {helperText && (
          <span className={helperClasses}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
