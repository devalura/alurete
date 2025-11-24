'use client';

import { useState } from 'react';
import { Radio } from '@/components/Radio';
import styles from './page.module.css';

export default function RadioPage() {
  const [label, setLabel] = useState('Opção Selecionada');
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAuxiliaryButton, setShowAuxiliaryButton] = useState(false);
  const [copied, setCopied] = useState(false);

  // State for Radio Group Example
  const [selectedOption, setSelectedOption] = useState('option1');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedPayment, setSelectedPayment] = useState('credit-card');

  const codeSnippet = `<Radio
  label="${label}"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}${disabled ? '\n  disabled' : ''}${showInfo ? '\n  showInfo\n  onInfoClick={() => alert("Info")}' : ''}${showAuxiliaryButton ? '\n  auxiliaryButton={{ text: "Action", onClick: () => {} }}' : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Radio</h1>
        <p className={styles.description}>
          Componente de seleção única que permite escolher uma opção entre várias.
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
                  checked={showInfo}
                  onChange={(e) => setShowInfo(e.target.checked)}
                />
                Show Info
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
              <Radio
                label={label}
                checked={checked}
                disabled={disabled}
                onChange={(e) => setChecked(e.target.checked)}
                showInfo={showInfo}
                onInfoClick={() => alert('Informação adicional')}
                auxiliaryButton={
                  showAuxiliaryButton ? {
                    text: 'Action',
                    onClick: () => alert('Botão auxiliar clicado')
                  } : undefined
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
        <h2>Radio Group - Opções Simples</h2>
        <div className={styles.componentGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Radio
              label="Opção 1"
              name="options"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <Radio
              label="Opção 2"
              name="options"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <Radio
              label="Opção 3"
              name="options"
              value="option3"
              checked={selectedOption === 'option3'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
          </div>
          <p style={{
            marginTop: 'var(--spacing-4)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-brand-default)',
            fontWeight: 500
          }}>
            Selecionado: {selectedOption}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Radio Group - Formulário de Pagamento</h2>
        <div className={styles.componentGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Radio
              label="Cartão de Crédito"
              showInfo
              onInfoClick={() => alert('Aceitamos Visa, Mastercard, Amex')}
              name="payment"
              value="credit-card"
              checked={selectedPayment === 'credit-card'}
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <Radio
              label="Débito"
              showInfo
              onInfoClick={() => alert('Débito em conta corrente')}
              name="payment"
              value="debit"
              checked={selectedPayment === 'debit'}
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <Radio
              label="PIX"
              auxiliaryButton={{
                text: 'Gerar código',
                onClick: () => alert('Código PIX gerado!')
              }}
              name="payment"
              value="pix"
              checked={selectedPayment === 'pix'}
              onChange={(e) => setSelectedPayment(e.target.value)}
            />
            <Radio
              label="Boleto (indisponível)"
              disabled
              name="payment"
              value="boleto"
            />
          </div>
          <p style={{
            marginTop: 'var(--spacing-4)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-brand-default)',
            fontWeight: 500
          }}>
            Forma de pagamento: {selectedPayment}
          </p>
        </div>
      </section>
    </div>
  );
}
