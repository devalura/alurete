import React, { useState } from 'react';
import { Tag } from '@/components/Tag';
import { Button } from '@/components/Button';
import styles from './AssessmentCard.module.css';

export interface AssessmentCardProps {
  title: string;
  tag?: string;
  onAction?: () => void;
  actionLabel?: string;
  responsive?: boolean;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  tag = 'Criada pela sua empresa',
  onAction,
  actionLabel = 'FAZER AVALIAÇÃO',
  responsive = true,
}) => {
  return (
    <div className={`${styles.card} ${responsive ? styles.responsive : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>AVALIAÇÃO</span>
        <Tag variant="secondary">{tag}</Tag>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Title */}
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* Action Button */}
      <Button 
        variant="primary" 
        size="medium"
        onClick={onAction}
        className={styles.button}
      >
        {actionLabel}
      </Button>
    </div>
  );
};
