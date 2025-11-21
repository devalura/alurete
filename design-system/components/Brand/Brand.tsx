import React from 'react';
import styles from './Brand.module.css';
import { brandLogos } from '@/utils/brandLogos';

export type BrandProduct = 'alura' | 'fiap' | 'pm3' | 'empresas' | 'alun';
export type BrandVariant = 'default' | 'negative';

export interface BrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Produto/marca a ser exibida */
  product: BrandProduct;
  /** Variante de cor (default: escuro, negative: branco) */
  variant?: BrandVariant;
  /** Largura customizada */
  width?: number | string;
  /** Altura customizada */
  height?: number | string;
}

const brandNames = {
  alura: 'Alura',
  fiap: 'FIAP',
  pm3: 'PM3',
  empresas: 'Alura para Empresas',
  alun: 'Alun',
};

const defaultSizes = {
  alura: { width: 140, height: 65 },
  fiap: { width: 140, height: 55 },
  pm3: { width: 152, height: 72 },
  empresas: { width: 166, height: 42 },
  alun: { width: 145, height: 36 },
};

export const Brand = React.forwardRef<HTMLDivElement, BrandProps>(
  ({ product, variant = 'default', width, height, className, ...props }, ref) => {
    const size = defaultSizes[product];
    const src = brandLogos[product][variant];
    const alt = brandNames[product];

    return (
      <div
        ref={ref}
        className={`${styles.brand} ${styles[variant]} ${className || ''}`}
        style={{
          width: width || size.width,
          height: height || size.height,
        }}
        {...props}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    );
  }
);

Brand.displayName = 'Brand';
