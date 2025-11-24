'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs';
import { UserIcon, LockIcon, SettingsIcon } from '@/components/Icons';
import styles from './page.module.css';

export default function TabsPage() {
  const [disabledTab, setDisabledTab] = useState(false);
  const [withIcons, setWithIcons] = useState(true);
  const [copied, setCopied] = useState(false);

  const codeSnippet = `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account"${withIcons ? ' leftIcon={<UserIcon />}' : ''}>Account</TabsTrigger>
    <TabsTrigger value="password"${withIcons ? ' leftIcon={<LockIcon />}' : ''}>Password</TabsTrigger>
    <TabsTrigger value="settings"${withIcons ? ' leftIcon={<SettingsIcon />}' : ''}${disabledTab ? ' disabled' : ''}>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div>
      <h3>Account Settings</h3>
      <p>Manage your account details here.</p>
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div>
      <h3>Password</h3>
      <p>Change your password here.</p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div>
      <h3>Preferences</h3>
      <p>Adjust your preferences here.</p>
    </div>
  </TabsContent>
</Tabs>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Tabs</h1>
        <p className={styles.description}>
          Componente de abas para organizar conteúdo em diferentes visualizações.
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
                  checked={withIcons}
                  onChange={(e) => setWithIcons(e.target.checked)}
                />
                With Icons
              </label>
            </div>

            <div className={`${styles.controlGroup} ${styles.auto}`}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={disabledTab}
                  onChange={(e) => setDisabledTab(e.target.checked)}
                />
                Disable "Settings" Tab
              </label>
            </div>
          </div>
        </div>

        <div className={styles.previewArea}>
          <div className={styles.previewHeader}>Preview</div>
          <div className={styles.preview}>
            <div className={styles.previewContent} style={{ width: '100%' }}>
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account" leftIcon={withIcons ? <UserIcon /> : undefined}>
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="password" leftIcon={withIcons ? <LockIcon /> : undefined}>
                    Password
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    leftIcon={withIcons ? <SettingsIcon /> : undefined}
                    disabled={disabledTab}
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
                <div className={styles.exampleContainer}>
                  <TabsContent value="account">
                    <div className={styles.exampleCard}>
                      <h3 className={styles.exampleTitle}>Account Settings</h3>
                      <p className={styles.exampleText}>Manage your account details here. This is the content for the Account tab.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="password">
                    <div className={styles.exampleCard}>
                      <h3 className={styles.exampleTitle}>Password</h3>
                      <p className={styles.exampleText}>Change your password here. This is the content for the Password tab.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className={styles.exampleCard}>
                      <h3 className={styles.exampleTitle}>Preferences</h3>
                      <p className={styles.exampleText}>Adjust your preferences here. This is the content for the Settings tab.</p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
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
