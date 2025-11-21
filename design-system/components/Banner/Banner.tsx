import React from 'react';
import { CarouselIndicator } from '@/components/CarouselIndicator';
import styles from './Banner.module.css';

export interface BannerProps {
  backgroundImage?: string;
  logo?: string;
  topLabel?: string;
  bottomLabel?: string;
  totalSlides?: number;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  logo,
  topLabel = 'NOVOS',
  bottomLabel = 'EPISÓDIOS',
  totalSlides = 3,
  currentSlide = 0,
  onSlideChange,
  className,
}) => {
  return (
    <div className={`${styles.banner} ${className || ''}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className={styles.backgroundImage}>
          <img src={backgroundImage} alt="" />
          <div className={styles.overlay} />
        </div>
      )}

      {/* Decorative Elements */}
      <div className={styles.decorativeElements}>
        <div className={styles.pathsShapes} />
        <div className={styles.element02} />
      </div>

      {/* Logo */}
      {logo && (
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
      )}

      {/* Labels */}
      <div className={styles.labelsContainer}>
        <div className={styles.labelTop}>
          <p>{topLabel}</p>
        </div>
        <div className={styles.labelBottom}>
          <p>{bottomLabel}</p>
        </div>
      </div>

      {/* Carousel Indicator */}
      <div className={styles.indicatorContainer}>
        <CarouselIndicator
          total={totalSlides}
          current={currentSlide}
          onDotClick={onSlideChange}
        />
      </div>
    </div>
  );
};
