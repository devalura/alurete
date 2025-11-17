import React from 'react';

export interface ProgressProps {
  /**
   * Valor atual do progresso (0-100)
   */
  value: number;
  
  /**
   * Valor máximo (padrão: 100)
   */
  max?: number;
  
  /**
   * Tamanho da barra de progresso
   */
  size?: 'small' | 'large';
  
  /**
   * Mostrar o label com porcentagem ou fração
   */
  showLabel?: boolean;
  
  /**
   * Formato do label: 'percentage' para % ou 'fraction' para x/y
   */
  labelFormat?: 'percentage' | 'fraction';
  
  /**
   * Classe CSS adicional
   */
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'small',
  showLabel = true,
  labelFormat = 'percentage',
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const containerClasses = `flex items-center gap-2.5 ${className || ''}`;
  
  const trackClasses = size === 'small' 
    ? 'relative bg-[var(--color-indigo-100)] rounded-full overflow-hidden flex-1 h-2 max-w-[158px]'
    : 'relative bg-[var(--color-indigo-100)] rounded-full overflow-hidden flex-1 h-2';
  
  const fillClasses = 'h-full bg-[var(--color-green-400)] rounded-full transition-[width] duration-300 ease-in-out';

  const getLabel = () => {
    if (!showLabel) return null;
    
    if (labelFormat === 'fraction') {
      return `${value}/${max}`;
    }
    
    return `${Math.round(percentage)}%`;
  };

  return (
    <div className={containerClasses}>
      <div className={trackClasses}>
        <div 
          className={fillClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className="font-[var(--font-family-brand)] text-sm font-normal text-[var(--color-text-body)] leading-[1.1] whitespace-nowrap flex-shrink-0">
          {getLabel()}
        </span>
      )}
    </div>
  );
};

Progress.displayName = 'Progress';
