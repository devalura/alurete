import React, { forwardRef, InputHTMLAttributes } from 'react';
import { CheckIcon } from '@/components/Icons';

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
    
    const containerClasses = `flex items-center gap-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`;
    
    const checkboxClasses = `w-[22px] h-[22px] bg-[var(--color-surface-interactive)] border border-solid border-[var(--color-border-default)] rounded-[var(--border-radius)] flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${
      !disabled ? 'hover:border-[var(--color-border-selected)] hover:bg-[var(--color-surface-subtle)]' : 'cursor-not-allowed opacity-50'
    } ${
      checked ? 'bg-[var(--color-brand-default)] border-[var(--color-brand-default)]' : ''
    } ${
      checked && !disabled ? 'hover:bg-[var(--color-brand-hover)] hover:border-[var(--color-brand-hover)]' : ''
    }`;
    
    const labelClasses = `font-[var(--font-family-brand)] text-base font-medium text-[var(--color-text-body)] leading-[1.3] cursor-pointer select-none ${disabled ? 'cursor-not-allowed' : ''} ${labelClassName || ''}`;

    return (
      <div className={containerClasses}>
        <div className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="absolute opacity-0 w-0 h-0 pointer-events-none focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2"
            disabled={disabled}
            checked={checked}
            {...props}
          />
          <div className={checkboxClasses}>
            {checked && (
              <CheckIcon size={12} className="text-[var(--color-icon-on-brand)] [stroke-width:3]" />
            )}
          </div>
        </div>
        
        {label && (
          <div className="flex items-center gap-2 flex-1">
            <label htmlFor={checkboxId} className={labelClasses}>
              {label}
            </label>
            
            {showInfoIcon && (
              <button
                type="button"
                className="flex items-center justify-center w-3 h-3 bg-transparent border-none cursor-pointer text-[var(--color-brand-default)] p-0 flex-shrink-0 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
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
              <div className="flex items-center flex-shrink-0">
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
