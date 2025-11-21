import React from 'react';
import { Progress } from '@/components/Progress';
import { PlayButton } from '@/components/PlayButton';
import styles from './CourseProgressCard.module.css';

export interface CourseProgressCardProps {
  courseTitle: string;
  courseSubtitle?: string;
  progress: number;
  currentClass: string;
  classDuration: string;
  onContinue?: () => void;
  responsive?: boolean;
}

export const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  courseTitle,
  courseSubtitle,
  progress,
  currentClass,
  classDuration,
  onContinue,
  responsive = true,
}) => {
  const progressLabel = progress >= 1 
    ? `${Math.round(progress * 100)}%` 
    : `${Math.round(progress * 10)}/10`;

  return (
    <div className={`${styles.card} ${responsive ? styles.responsive : ''}`}>
      <div className={styles.content}>
        {/* Progress Section */}
        <div className={styles.progressSection}>
          <Progress 
            value={progress * 100}
            size="small"
            showLabel
            labelFormat={progress >= 1 ? 'percentage' : 'fraction'}
            max={progress >= 1 ? 100 : 10}
            className={styles.progress}
          />
        </div>

        {/* Title Section */}
        <div className={styles.titleSection}>
          <span className={styles.tag}>CURSO</span>
          <h3 className={styles.title}>
            <strong>{courseTitle}:</strong>
            {courseSubtitle && <span className={styles.subtitle}> {courseSubtitle}</span>}
          </h3>
        </div>

        {/* Action Section */}
        <div className={styles.actionSection}>
          <PlayButton 
            onClick={onContinue}
            size="large"
          >
            Continuar de onde parou
          </PlayButton>
          
          <div className={styles.currentClass}>
            <span className={styles.currentClassLabel}>Aula atual:</span>
            <span className={styles.currentClassInfo}>
              {currentClass} - {classDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
