import React from 'react';
import styles from './CarouselIndicator.module.css';

export interface CarouselIndicatorProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
}

export const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  total,
  current,
  onDotClick,
}) => {
  return (
    <div className={styles.indicator}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.dot} ${index === current ? styles.active : ''}`}
          onClick={() => onDotClick?.(index)}
          aria-label={`Ir para slide ${index + 1}`}
          aria-current={index === current ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};
