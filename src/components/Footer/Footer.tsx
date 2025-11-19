import React from 'react';
import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  appLinks?: {
    googlePlay?: string;
    appStore?: string;
  };
  logoSrc?: string;
  responsive?: boolean;
}

const defaultSections: FooterSection[] = [
  {
    title: 'A ALURA',
    links: [
      { label: 'Sobre a Alura', href: '#' },
      { label: 'Dúvidas frequentes', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'SUGIRA',
    links: [
      { label: 'Um curso', href: '#' },
      { label: 'Uma funcionalidade', href: '#' },
    ],
  },
  {
    title: 'EXTENSÕES',
    links: [
      { label: 'Graduação', href: '#' },
      { label: 'Pós - Graduação', href: '#' },
      { label: 'MBA', href: '#' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({
  sections = defaultSections,
  socialLinks = {},
  appLinks = {},
  logoSrc = '/images/Product=Alura.svg',
  responsive = true,
}) => {
  return (
    <footer className={`${styles.footer} ${responsive ? styles.responsive : ''}`}>
      <div className={styles.content}>
        {/* Logo + Sections */}
        <div className={styles.leftSection}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={logoSrc} alt="Alura" className={styles.logo} />
          </div>

          {/* Navigation Sections */}
          <div className={styles.sections}>
            {sections.map((section, index) => (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social + Apps */}
        <div className={styles.rightSection}>
          {/* Social Networks */}
          <div className={styles.socialSection}>
            <h3 className={styles.sectionTitle}>NOSSAS REDES</h3>
            <div className={styles.socialIcons}>
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} className={styles.socialIcon} aria-label="YouTube">
                  <img src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" width="24" height="24" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} className={styles.socialIcon} aria-label="Facebook">
                  <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" width="24" height="24" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className={styles.socialIcon} aria-label="Twitter">
                  <img src="https://cdn.simpleicons.org/x/000000" alt="Twitter" width="24" height="24" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} className={styles.socialIcon} aria-label="Instagram">
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" width="24" height="24" />
                </a>
              )}
              {socialLinks.discord && (
                <a href={socialLinks.discord} className={styles.socialIcon} aria-label="Discord">
                  <img src="https://cdn.simpleicons.org/discord/5865F2" alt="Discord" width="24" height="24" />
                </a>
              )}
            </div>
          </div>

          {/* App Links */}
          <div className={styles.appsSection}>
            <h3 className={styles.sectionTitle}>APPS</h3>
            <div className={styles.appIcons}>
              {appLinks.googlePlay && (
                <a href={appLinks.googlePlay} className={styles.appIcon} aria-label="Google Play">
                  <img src="https://cdn.simpleicons.org/googleplay/414141" alt="Google Play" width="120" height="40" />
                </a>
              )}
              {appLinks.appStore && (
                <a href={appLinks.appStore} className={styles.appIcon} aria-label="App Store">
                  <img src="https://cdn.simpleicons.org/apple/000000" alt="App Store" width="120" height="40" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
