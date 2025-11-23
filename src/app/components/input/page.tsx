'use client';

import { useState } from 'react';
import { Input } from '@/components/Input';
import {
  SearchIcon, MailIcon, LockIcon, UserIcon,
  CheckIcon, EyeIcon, EyeOffIcon, AlertCircleIcon,
  CalendarIcon, PhoneIcon
} from '@/components/Icons';
import styles from './page.module.css';

const ICONS_MAP: Record<string, React.ReactNode> = {
  none: null,
  search: <SearchIcon size={18} />,
  mail: <MailIcon size={18} />,
  lock: <LockIcon size={18} />,
  user: <UserIcon size={18} />,
  check: <CheckIcon size={18} />,
  eye: <EyeIcon size={18} />,
  eyeOff: <EyeOffIcon size={18} />,
  alert: <AlertCircleIcon size={18} />,
  calendar: <CalendarIcon size={18} />,
  phone: <PhoneIcon size={18} />,
};

const ICON_NAMES_MAP: Record<string, string> = {
  none: 'None',
  search: 'SearchIcon',
  mail: 'MailIcon',
  lock: 'LockIcon',
  user: 'UserIcon',
  check: 'CheckIcon',
  eye: 'EyeIcon',
  eyeOff: 'EyeOffIcon',
  alert: 'AlertCircleIcon',
  calendar: 'CalendarIcon',
  phone: 'PhoneIcon',
};

export default function InputPage() {
  const [variant, setVariant] = useState<'default' | 'error' | 'success'>('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [label, setLabel] = useState('Email');
  const [placeholder, setPlaceholder] = useState('seu@email.com');
  const [helperText, setHelperText] = useState('Digite seu email principal');
  const [leftIcon, setLeftIcon] = useState('mail');
  const [rightIcon, setRightIcon] = useState('none');
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [isOptional, setIsOptional] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<Input
  label="${label}"
  placeholder="${placeholder}"
  variant="${variant}"
  size="${size}"${helperText ? `\n  helperText="${helperText}"` : ''}${leftIcon !== 'none' ? `\n  leftIcon={<${ICON_NAMES_MAP[leftIcon]} size={18} />}` : ''}${rightIcon !== 'none' ? `\n  rightIcon={<${ICON_NAMES_MAP[rightIcon]} size={18} />}` : ''}${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  fullWidth' : ''}${isOptional ? '\n  isOptional' : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Input</h1>
        <p className={styles.description}>
          Componente de entrada de texto com suporte a ícones, estados de validação e helper text.
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
                <option value="default">Default</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="size">Tamanho</label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                className={styles.select}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
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
              <label htmlFor="placeholder">Placeholder</label>
              <input
                id="placeholder"
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="helperText">Helper Text</label>
              <input
                id="helperText"
                type="text"
                value={helperText}
                onChange={(e) => setHelperText(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={leftIcon !== 'none'}
                  onChange={(e) => setLeftIcon(e.target.checked ? 'mail' : 'none')}
                />
                Ícone Esquerda
              </label>
              {leftIcon !== 'none' && (
                <select
                  value={leftIcon}
                  onChange={(e) => setLeftIcon(e.target.value)}
                  className={styles.select}
                  style={{ marginTop: '8px' }}
                >
                  {Object.keys(ICON_NAMES_MAP).filter(k => k !== 'none').map(key => (
                    <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
                  ))}
                </select>
              )}
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rightIcon !== 'none'}
                  onChange={(e) => setRightIcon(e.target.checked ? 'check' : 'none')}
                />
                Ícone Direita
              </label>
              {rightIcon !== 'none' && (
                <select
                  value={rightIcon}
                  onChange={(e) => setRightIcon(e.target.value)}
                  className={styles.select}
                  style={{ marginTop: '8px' }}
                >
                  {Object.keys(ICON_NAMES_MAP).filter(k => k !== 'none').map(key => (
                    <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={fullWidth}
                  onChange={(e) => setFullWidth(e.target.checked)}
                />
                Full Width
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={isOptional}
                  onChange={(e) => setIsOptional(e.target.checked)}
                />
                Opcional
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview}>
            <div className={styles.previewContent} style={{ width: fullWidth ? '100%' : 'auto' }}>
              <Input
                variant={variant}
                size={size}
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                leftIcon={ICONS_MAP[leftIcon]}
                rightIcon={ICONS_MAP[rightIcon]}
                disabled={disabled}
                fullWidth={fullWidth}
                isOptional={isOptional}
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
    </div>
  );
}
