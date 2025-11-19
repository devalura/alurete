import { ReactNode } from 'react';

interface TokensLayoutProps {
  children: ReactNode;
}

export default function TokensLayout({ children }: TokensLayoutProps) {
  return <>{children}</>;
}
