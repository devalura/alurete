import { ReactNode } from 'react';

interface BrandingLayoutProps {
  children: ReactNode;
}

export default function BrandingLayout({ children }: BrandingLayoutProps) {
  return <>{children}</>;
}
