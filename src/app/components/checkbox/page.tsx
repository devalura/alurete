'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { ChevronDownIcon } from '@/components/Icons';
import styles from './page.module.css';

export default function CheckboxPage() {
  const [label, setLabel] = useState('Aceito os termos e condições');
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [showAuxiliaryButton, setShowAuxiliaryButton] = useState(false);
  const [copied, setCopied] = useState(false);

  // State for other examples
  const [acceptTerms, setAcceptTerms] = useState(false);

  // State for List Example
  const [listState, setListState] = useState({
    js: true,
    ts: false,
    python: false,
    java: false,
    cpp: false
  });

  // State for Form Example
  const [formState, setFormState] = useState({
    email: false,
    push: false,
    newsletter: false
  });

  const codeSnippet = `<Checkbox
  label="${label}"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}${disabled ? '\n  disabled' : ''}${showInfoIcon ? '\n  showInfoIcon\n  onInfoClick={() => alert("Info")}' : ''}${showAuxiliaryButton ? '\n  auxiliaryButton={<Button size="small">Action</Button>}' : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleListOption = (key: keyof typeof listState) => {
    setListState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFormOption = (key: keyof typeof formState) => {
    setFormState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Checkbox</h1>
        <p className={styles.description}>
          Componente de checkbox para seleção de opções individuais ou múltiplas.
          Use o playground abaixo para customizar.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.controls}>
          <div className={styles.controlRow}>
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
            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                Checked
              </label>
            </div>

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
                  checked={showInfoIcon}
                  onChange={(e) => setShowInfoIcon(e.target.checked)}
                />
                Info Icon
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={showAuxiliaryButton}
                  onChange={(e) => setShowAuxiliaryButton(e.target.checked)}
                />
                Auxiliary Button
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview}>
            <div className={styles.previewContent}>
              <Checkbox
                label={label}
                checked={checked}
                disabled={disabled}
                onChange={(e) => setChecked(e.target.checked)}
                showInfoIcon={showInfoIcon}
                onInfoClick={() => alert('Informação adicional')}
                auxiliaryButton={
                  showAuxiliaryButton ? (
                    <Button
                      variant="secondary"
                      size="small"
                      style={{
                        height: '24px',
                        padding: '0 12px',
                        fontSize: '12px',
                      }}
                    >
                      Action
                    </Button>
                  ) : undefined
                }
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
        <h2>Lista de Opções</h2>
        <p className={styles.hint}>
          Múltiplos checkboxes para seleção.
        </p>
        <div className={styles.componentGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Checkbox
              label="JavaScript"
              checked={listState.js}
              onChange={() => toggleListOption('js')}
            />
            <Checkbox
              label="TypeScript"
              checked={listState.ts}
              onChange={() => toggleListOption('ts')}
            />
            <Checkbox
              label="Python"
              checked={listState.python}
              onChange={() => toggleListOption('python')}
            />
            <Checkbox
              label="Java"
              checked={listState.java}
              onChange={() => toggleListOption('java')}
            />
            <Checkbox
              label="C++"
              disabled
              checked={listState.cpp}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Formulário de Exemplo</h2>
        <div className={styles.componentGroup}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--color-surface-subtle)',
            borderRadius: 'var(--border-radius-lg)',
          }}>
            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Configurações de Notificação</h3>

            <Checkbox
              label="Receber notificações por email"
              showInfoIcon
              checked={formState.email}
              onChange={() => toggleFormOption('email')}
              onInfoClick={() => alert('Você receberá atualizações importantes por email')}
            />
            <Checkbox
              label="Notificações push no navegador"
              checked={formState.push}
              onChange={() => toggleFormOption('push')}
            />
            <Checkbox
              label="Newsletter semanal"
              checked={formState.newsletter}
              onChange={() => toggleFormOption('newsletter')}
            />

            <div style={{ marginTop: 'var(--spacing-4)' }}>
              <Checkbox
                label="Aceito os termos e condições"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
            </div>

            <Button
              style={{ marginTop: 'var(--spacing-2)', alignSelf: 'flex-start' }}
              disabled={!acceptTerms}
            >
              Salvar Preferências
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
