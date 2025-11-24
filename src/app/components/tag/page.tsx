'use client';

import { useState } from 'react';
import { Tag } from '@/components/Tag';
import { SparklesIcon, CheckIcon, AlertCircleIcon, XCircleIcon, InfoIcon } from '@/components/Icons';
import styles from './page.module.css';

const ICONS_MAP: Record<string, React.ReactNode> = {
  none: null,
  sparkles: <SparklesIcon />,
  info: <InfoIcon />,
  check: <CheckIcon />,
  alert: <AlertCircleIcon />,
  error: <XCircleIcon />,
};

const ICON_NAMES_MAP: Record<string, string> = {
  none: 'None',
  sparkles: 'SparklesIcon',
  info: 'InfoIcon',
  check: 'CheckIcon',
  alert: 'AlertCircleIcon',
  error: 'XCircleIcon',
};

export default function TagPage() {
  const [label, setLabel] = useState('Tag Label');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'attention' | 'error' | 'success'>('primary');
  const [leftIcon, setLeftIcon] = useState('none');
  const [rightIcon, setRightIcon] = useState('none');
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<Tag
  variant="${variant}"${leftIcon !== 'none' ? `\n  leftIcon={<${ICON_NAMES_MAP[leftIcon]} />}` : ''}${rightIcon !== 'none' ? `\n  rightIcon={<${ICON_NAMES_MAP[rightIcon]} />}` : ''}
>
  ${label}
</Tag>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Tag</h1>
        <p className={styles.description}>
          Componente de etiqueta para categorizar, destacar status e adicionar metadados.
          Use o playground abaixo para customizar.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.controls}>
          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label htmlFor="variant">Variante</label>
              <select
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                className={styles.select}
              >
                <option value="primary">Primary (Blue)</option>
                <option value="secondary">Secondary (Gray)</option>
                <option value="attention">Attention (Yellow)</option>
                <option value="error">Error (Red)</option>
                <option value="success">Success (Green)</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="label">Label</label>
              <input
                id="label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label htmlFor="leftIcon">Ícone Esquerda</label>
              <select
                id="leftIcon"
                value={leftIcon}
                onChange={(e) => setLeftIcon(e.target.value)}
                className={styles.select}
              >
                {Object.keys(ICON_NAMES_MAP).map(key => (
                  <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
                ))}
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="rightIcon">Ícone Direita</label>
              <select
                id="rightIcon"
                value={rightIcon}
                onChange={(e) => setRightIcon(e.target.value)}
                className={styles.select}
              >
                {Object.keys(ICON_NAMES_MAP).map(key => (
                  <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview}>
            <div className={styles.previewContent}>
              <Tag
                variant={variant}
                leftIcon={ICONS_MAP[leftIcon]}
                rightIcon={ICONS_MAP[rightIcon]}
              >
                {label}
              </Tag>
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
    </div>
  );
}
