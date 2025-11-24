'use client';

import { useState } from 'react';
import { Footer } from '@/components/Footer';
import styles from './page.module.css';

export default function FooterPage() {
  const [responsive, setResponsive] = useState(true);
  const [showSocial, setShowSocial] = useState(true);
  const [showApps, setShowApps] = useState(true);
  const [copied, setCopied] = useState(false);

  const socialLinks = showSocial ? {
    youtube: '#',
    facebook: '#',
    twitter: '#',
    instagram: '#',
    discord: '#'
  } : {};

  const appLinks = showApps ? {
    googlePlay: '#',
    appStore: '#'
  } : {};

  const codeSnippet = `<Footer
  responsive={${responsive}}
  socialLinks={${showSocial ? JSON.stringify(socialLinks, null, 4).replace(/"([^"]+)":/g, '$1:') : '{}'}}
  appLinks={${showApps ? JSON.stringify(appLinks, null, 4).replace(/"([^"]+)":/g, '$1:') : '{}'}}
/>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Footer</h1>
        <p className={styles.description}>
          Rodapé padrão da aplicação com links de navegação, redes sociais e apps.
          Use o playground abaixo para customizar.
        </p>
      </div>

      <div className={styles.playground}>
        <div className={styles.controls}>
          <div className={styles.controlRow}>
            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={responsive}
                  onChange={(e) => setResponsive(e.target.checked)}
                />
                Responsive
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={showSocial}
                  onChange={(e) => setShowSocial(e.target.checked)}
                />
                Show Social Links
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={showApps}
                  onChange={(e) => setShowApps(e.target.checked)}
                />
                Show App Links
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview} style={{ padding: 0, display: 'block' }}>
            <div className={styles.previewContent} style={{ width: '100%', maxWidth: 'none' }}>
              <Footer
                responsive={responsive}
                socialLinks={socialLinks}
                appLinks={appLinks}
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
