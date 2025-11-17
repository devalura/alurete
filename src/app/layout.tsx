import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Design System - Showcase',
  description: 'Design System baseado nos design tokens',
};

const menuItems = [
  {
    title: 'Início',
    href: '/',
  },
  {
    title: 'Branding',
    items: [
      { title: 'Overview', href: '/branding' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Alert', href: '/components/alert' },
      { title: 'Avatar', href: '/components/avatar' },
      { title: 'Badge', href: '/components/badge' },
      { title: 'Banner', href: '/components/banner' },
      { title: 'Button', href: '/components/button' },
      { title: 'Card', href: '/components/card' },
      { title: 'Checkbox', href: '/components/checkbox' },
      { title: 'Footer', href: '/components/footer' },
      { title: 'Icons', href: '/components/icons' },
      { title: 'Input', href: '/components/input' },
      { title: 'Progress', href: '/components/progress' },
      { title: 'Radio', href: '/components/radio' },
      { title: 'Tabs', href: '/components/tabs' },
      { title: 'Tag', href: '/components/tag' },
    ],
  },
  {
    title: 'Tokens',
    items: [
      { title: 'Colors', href: '/tokens/colors' },
      { title: 'Typography', href: '/tokens/typography' },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Chakra+Petch:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&family=PT+Serif:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Sidebar items={menuItems} />
        <div style={{ marginLeft: '280px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
