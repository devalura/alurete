import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppLayout } from './AppLayout';

export const metadata: Metadata = {
  title: 'Design System - Showcase',
  description: 'Design System baseado nos design tokens',
};

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
