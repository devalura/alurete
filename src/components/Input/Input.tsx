import React from 'react';

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
    
    const containerClasses = `flex flex-col gap-1 ${fullWidth ? 'w-full' : ''} ${className || ''}`;

    const sizeClasses = {
      small: "h-8 px-4",
      medium: "h-10 py-2.5 px-4",
      large: "h-12 px-4"
    };

    const inputSizeClasses = {
      small: "text-[13px]",
      medium: "text-[13px]",
      large: "text-base"
    };

    const variantClasses = {
      default: "border-[var(--color-border-default)] hover:border-[var(--color-border-selected)] focus-within:border-[var(--color-border-selected)] focus-within:shadow-[0_0_0_1px_var(--color-border-selected)]",
      error: "border-[var(--color-feedback-error-default)] hover:border-[var(--color-feedback-error-default)] focus-within:border-[var(--color-feedback-error-default)] focus-within:shadow-[0_0_0_1px_var(--color-feedback-error-default)]",
      success: "border-[var(--color-feedback-success-default)] hover:border-[var(--color-feedback-success-default)] focus-within:border-[var(--color-feedback-success-default)] focus-within:shadow-[0_0_0_1px_var(--color-feedback-success-default)]"
    };

    const disabledClasses = disabled 
      ? "bg-[var(--color-surface-subtle)] border-[var(--color-border-subtle)] cursor-not-allowed opacity-60"
      : "bg-[var(--color-surface-interactive)]";

    const helperColorClasses = {
      default: "text-[var(--color-text-body)]",
      error: "text-[var(--color-feedback-error-default)]",
      success: "text-[var(--color-feedback-success-default)]"
    };

    const wrapperClasses = `relative flex items-center gap-2.5 border-[var(--border-width)] border-solid rounded-full transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses}`;

    return (
      <div className={containerClasses}>
        {label && (
          <div className="flex gap-1 items-baseline mb-0.5">
            <label htmlFor={inputId} className="font-[var(--font-family-brand)] text-xs font-medium text-[var(--color-text-title)] leading-[1.5]">
              {label}
            </label>
            {isOptional && (
              <span className="font-[var(--font-family-brand)] text-xs font-medium text-[var(--color-text-body)] leading-[1.5]">(opcional)</span>
            )}
          </div>
        )}
        
        <div className={wrapperClasses}>
          {leftIcon && <span className="flex items-center justify-center text-[var(--color-icon-secondary)] flex-shrink-0 w-5 h-5">{leftIcon}</span>}
          
          <input
            ref={ref}
            id={inputId}
            className={`flex-1 w-full bg-transparent border-none outline-none text-[var(--color-text-title)] font-sans leading-[1.5] placeholder:text-[var(--color-text-body)] disabled:text-[var(--color-text-disabled)] disabled:cursor-not-allowed ${inputSizeClasses[size]} ${leftIcon ? 'pl-0' : ''} ${rightIcon ? 'pr-0' : ''}`}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && <span className={`flex items-center justify-center flex-shrink-0 w-5 h-5 ${disabled ? 'text-[var(--color-text-disabled)]' : 'text-[var(--color-icon-secondary)]'}`}>{rightIcon}</span>}
        </div>
        
        {helperText && (
          <span className={`font-[var(--font-family-brand)] text-xs font-normal leading-[1.5] ${helperColorClasses[variant]}`}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
