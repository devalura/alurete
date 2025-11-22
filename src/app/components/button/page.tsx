'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { SocialButton } from '@/components/SocialButton';
import { PlayButton } from '@/components/PlayButton';
import {
  PencilIcon,
  DownloadIcon,
  GoogleIcon,
  MicrosoftIcon,
  FacebookIcon,
  AppleIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  MailIcon,
  CheckIcon,
  XIcon
} from '@/components/Icons';
import styles from './page.module.css';

const ICONS_MAP: Record<string, React.ReactNode> = {
  none: null,
  download: <DownloadIcon />,
  arrowRight: <ArrowRightIcon />,
  plus: <PlusIcon />,
  trash: <TrashIcon />,
  search: <SearchIcon />,
  settings: <SettingsIcon />,
  user: <UserIcon />,
  mail: <MailIcon />,
  check: <CheckIcon />,
  x: <XIcon />,
  pencil: <PencilIcon />
};

const ICON_NAMES_MAP: Record<string, string> = {
  none: 'None',
  download: 'DownloadIcon',
  arrowRight: 'ArrowRightIcon',
  plus: 'PlusIcon',
  trash: 'TrashIcon',
  search: 'SearchIcon',
  settings: 'SettingsIcon',
  user: 'UserIcon',
  mail: 'MailIcon',
  check: 'CheckIcon',
  x: 'XIcon',
  pencil: 'PencilIcon'
};

export default function ButtonPage() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost' | 'link'>('primary');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [children, setChildren] = useState('Button Text');
  const [disabled, setDisabled] = useState(false);
  const [startIcon, setStartIcon] = useState('none');
  const [endIcon, setEndIcon] = useState('none');
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<Button
  variant="${variant}"
  size="${size}"${disabled ? '\n  disabled' : ''}${startIcon !== 'none' ? `\n  startIcon={<${ICON_NAMES_MAP[startIcon]} />}` : ''}${endIcon !== 'none' ? `\n  endIcon={<${ICON_NAMES_MAP[endIcon]} />}` : ''}
>
  ${children}
</Button>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Button</h1>
        <p className={styles.description}>
          Componente de botão com múltiplas variantes, tamanhos e estados para diferentes contextos de uso.
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
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="ghost">Ghost</option>
                <option value="link">Link</option>
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
              <label htmlFor="children">Texto</label>
              <input
                id="children"
                type="text"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.controlGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={startIcon !== 'none'}
                  onChange={(e) => setStartIcon(e.target.checked ? 'download' : 'none')}
                />
                Ícone Esquerda
              </label>
              {startIcon !== 'none' && (
                <select
                  value={startIcon}
                  onChange={(e) => setStartIcon(e.target.value)}
                  className={styles.select}
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
                  checked={endIcon !== 'none'}
                  onChange={(e) => setEndIcon(e.target.checked ? 'arrowRight' : 'none')}
                />
                Ícone Direita
              </label>
              {endIcon !== 'none' && (
                <select
                  value={endIcon}
                  onChange={(e) => setEndIcon(e.target.value)}
                  className={styles.select}
                >
                  {Object.keys(ICON_NAMES_MAP).filter(k => k !== 'none').map(key => (
                    <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
                  ))}
                </select>
              )}
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox} style={{ height: '100%', marginTop: '28px' }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>
            Preview
          </div>
          <div className={styles.preview}>
            <div className={styles.previewContent}>
              <Button
                variant={variant}
                size={size}
                disabled={disabled}
                startIcon={ICONS_MAP[startIcon]}
                endIcon={ICONS_MAP[endIcon]}
              >
                {children}
              </Button>
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
            <pre className={styles.codeBlock}>
              {codeSnippet}
            </pre>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Botões Apenas Ícone</h2>
        <p className={styles.hint}>
          Botões circulares que contêm apenas um ícone, ideais para toolbars e ações compactas.
        </p>
        <IconButtonPlayground />
      </section>

      <section className={styles.section}>
        <h2>Botões de Redes Sociais</h2>
        <p className={styles.hint}>
          Botões especiais para login/compartilhamento em redes sociais.
        </p>
        <SocialButtonPlayground />
      </section>

      <section className={styles.section}>
        <h2>Botões de Play</h2>
        <p className={styles.hint}>
          Botões especiais com ícone de play, ideais para conteúdo de vídeo.
        </p>
        <PlayButtonPlayground />
      </section>
    </div>
  );
}

function IconButtonPlayground() {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost'>('primary');
  const [size, setSize] = useState<'xsmall' | 'small' | 'medium' | 'large'>('medium');
  const [icon, setIcon] = useState('pencil');
  const [disabled, setDisabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<IconButton
  variant="${variant}"
  size="${size}"
  icon={<${ICON_NAMES_MAP[icon]} />}${disabled ? '\n  disabled' : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <label htmlFor="iconBtnVariant">Variante</label>
            <select
              id="iconBtnVariant"
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              className={styles.select}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="iconBtnSize">Tamanho</label>
            <select
              id="iconBtnSize"
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
              className={styles.select}
            >
              <option value="xsmall">X-Small</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="iconBtnIcon">Ícone</label>
            <select
              id="iconBtnIcon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className={styles.select}
            >
              {Object.keys(ICON_NAMES_MAP).filter(k => k !== 'none').map(key => (
                <option key={key} value={key}>{ICON_NAMES_MAP[key]}</option>
              ))}
            </select>
          </div>

          <div className={`${styles.controlGroup} ${styles.auto}`}>
            <label className={styles.checkbox} style={{ height: '100%', marginTop: '28px' }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
        </div>
      </div>

      <div className={styles.previewArea}>
        <div className={styles.previewHeader}>Preview</div>
        <div className={styles.preview}>
          <div className={styles.previewContent}>
            <IconButton
              variant={variant}
              size={size}
              icon={ICONS_MAP[icon]}
              disabled={disabled}
              aria-label="Exemplo de botão ícone"
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
  );
}

function SocialButtonPlayground() {
  const [icon, setIcon] = useState('google');
  const [disabled, setDisabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const SOCIAL_ICONS_MAP: Record<string, React.ReactNode> = {
    google: <GoogleIcon />,
    microsoft: <MicrosoftIcon />,
    facebook: <FacebookIcon />,
    apple: <AppleIcon />
  };

  const SOCIAL_ICON_NAMES: Record<string, string> = {
    google: 'GoogleIcon',
    microsoft: 'MicrosoftIcon',
    facebook: 'FacebookIcon',
    apple: 'AppleIcon'
  };

  const LABELS: Record<string, string> = {
    google: 'Login com Google',
    microsoft: 'Login com Microsoft',
    facebook: 'Login com Facebook',
    apple: 'Login com Apple'
  };

  const codeSnippet = `<SocialButton
  icon={<${SOCIAL_ICON_NAMES[icon]} />}
  label="${LABELS[icon]}"${disabled ? '\n  disabled' : ''}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <label htmlFor="socialBtnIcon">Rede Social</label>
            <select
              id="socialBtnIcon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className={styles.select}
            >
              <option value="google">Google</option>
              <option value="microsoft">Microsoft</option>
              <option value="facebook">Facebook</option>
              <option value="apple">Apple</option>
            </select>
          </div>

          <div className={`${styles.controlGroup} ${styles.auto}`}>
            <label className={styles.checkbox} style={{ height: '100%', marginTop: '28px' }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
        </div>
      </div>

      <div className={styles.previewArea}>
        <div className={styles.previewHeader}>Preview</div>
        <div className={styles.preview}>
          <div className={styles.previewContent}>
            <SocialButton
              icon={SOCIAL_ICONS_MAP[icon]}
              label={LABELS[icon]}
              disabled={disabled}
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
  );
}

function PlayButtonPlayground() {
  const [size, setSize] = useState<'small' | 'large'>('large');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [children, setChildren] = useState('Continuar de onde parou');
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<PlayButton
  size="${size}"
  device="${device}"
>
  ${children}
</PlayButton>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <label htmlFor="playBtnSize">Tamanho</label>
            <select
              id="playBtnSize"
              value={size}
              onChange={(e) => setSize(e.target.value as any)}
              className={styles.select}
            >
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="playBtnDevice">Dispositivo</label>
            <select
              id="playBtnDevice"
              value={device}
              onChange={(e) => setDevice(e.target.value as any)}
              className={styles.select}
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="playBtnText">Texto</label>
            <input
              id="playBtnText"
              type="text"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.previewArea}>
        <div className={styles.previewHeader}>Preview</div>
        <div className={styles.preview}>
          <div className={styles.previewContent}>
            <PlayButton size={size} device={device}>
              {children}
            </PlayButton>
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
  );
}
