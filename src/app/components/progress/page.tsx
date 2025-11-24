'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/Progress';
import { Button } from '@/components/Button';
import styles from './page.module.css';

export default function ProgressPage() {
  const [value, setValue] = useState(45);
  const [max, setMax] = useState(100);
  const [size, setSize] = useState<'small' | 'large'>('large');
  const [showLabel, setShowLabel] = useState(true);
  const [labelFormat, setLabelFormat] = useState<'percentage' | 'fraction'>('percentage');
  const [copied, setCopied] = useState(false);

  // State for Upload Example
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            setIsUploading(false);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const startUpload = () => {
    setUploadProgress(0);
    setIsUploading(true);
  };

  const codeSnippet = `<Progress
  value={${value}}
  size="${size}"${max !== 100 ? `\n  max={${max}}` : ''}${!showLabel ? '\n  showLabel={false}' : ''}${labelFormat !== 'percentage' ? `\n  labelFormat="${labelFormat}"` : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Progress</h1>
        <p className={styles.description}>
          Componente de barra de progresso para indicar o andamento de tarefas ou processos.
          Use o playground abaixo para customizar.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.controls}>
          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label htmlFor="value">Valor Atual: {value}</label>
              <input
                id="value"
                type="range"
                min="0"
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className={styles.range}
              />
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="max">Valor Máximo</label>
              <input
                id="max"
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label htmlFor="size">Tamanho</label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                className={styles.select}
              >
                <option value="small">Small (Largura Fixa)</option>
                <option value="large">Large (Largura Total)</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="labelFormat">Formato do Label</label>
              <select
                id="labelFormat"
                value={labelFormat}
                onChange={(e) => setLabelFormat(e.target.value as any)}
                className={styles.select}
                disabled={!showLabel}
              >
                <option value="percentage">Porcentagem (%)</option>
                <option value="fraction">Fração (x/y)</option>
              </select>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={showLabel}
                  onChange={(e) => setShowLabel(e.target.checked)}
                />
                Mostrar Label
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview}>
            <div className={styles.previewContent}>
              <Progress
                value={value}
                max={max}
                size={size}
                showLabel={showLabel}
                labelFormat={labelFormat}
              />
            </div>
          </div>

          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <div className={styles.windowControls}>
                <div className={`${styles.dot} ${styles.dotRed}`} />
                <div className={`${styles.dot} ${styles.dotYellow}`} />
                <div className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <button onClick={handleCopy} className={styles.copyButton}>
                {copied ? 'Copiado!' : 'Copiar Código'}
              </button>
            </div>
            <pre className={styles.codeBlock}>{codeSnippet}</pre>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Casos de Uso</h2>
        <div className={styles.componentGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>

            {/* Upload Simulation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                <h3 style={{ margin: 0 }}>Simulação de Upload</h3>
                <Button
                  size="small"
                  onClick={startUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Enviando...' : uploadProgress === 100 ? 'Concluído' : 'Iniciar Upload'}
                </Button>
              </div>
              <Progress value={uploadProgress} size="large" />
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-subtle)', marginTop: 'var(--spacing-2)' }}>
                {uploadProgress === 100 ? 'Upload finalizado com sucesso!' : isUploading ? 'Enviando arquivos...' : 'Aguardando início.'}
              </p>
            </div>

            {/* Course Progress */}
            <div>
              <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Progresso do Curso</h3>
              <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--border-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-4)'
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, marginBottom: 'var(--spacing-1)' }}>Módulo 1: Introdução</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-subtle)' }}>4 de 12 aulas concluídas</p>
                </div>
                <Progress value={4} max={12} size="small" labelFormat="fraction" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
