import React from 'react';
import styles from './Progress.module.css';

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

  const getLabel = () => {
    if (!showLabel) return null;
    
    if (labelFormat === 'fraction') {
      return `${value}/${max}`;
    }
    
    return `${Math.round(percentage)}%`;
  };

  return (
    <div className={`${styles.container} ${styles[size]} ${className || ''}`}>
      <div className={styles.track}>
        <div 
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>
          {getLabel()}
        </span>
      )}
    </div>
  );
};

Progress.displayName = 'Progress';
