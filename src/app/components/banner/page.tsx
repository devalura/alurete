'use client';

import { useState } from 'react';
import { Banner } from '@/components/Banner';
import { CarouselIndicator } from '@/components/CarouselIndicator';
import styles from './page.module.css';

export default function BannerPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [standaloneSlide, setStandaloneSlide] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Banner</h1>
        <p>Componente de banner promocional com indicador de carousel integrado.</p>
      </div>

      <section className={styles.section}>
        <h2>Banner Completo</h2>
        <div className={styles.examples}>
          <Banner
            backgroundImage="http://localhost:3845/assets/2f38d970b6b52734f0839cd3ef750b0c91a412e6.png"
            logo="http://localhost:3845/assets/07d832feb6f864e93a1e78dc87396923156c3be7.svg"
            topLabel="NOVOS"
            bottomLabel="EPISÓDIOS"
            totalSlides={3}
            currentSlide={currentSlide}
            onSlideChange={setCurrentSlide}
          />
        </div>
        <p className={styles.info}>Slide atual: {currentSlide + 1} de 3</p>
      </section>

      <section className={styles.section}>
        <h2>Banner sem Imagem</h2>
        <div className={styles.examples}>
          <Banner
            logo="/images/Product=Alura.svg"
            topLabel="NOVOS"
            bottomLabel="EPISÓDIOS"
            totalSlides={3}
            currentSlide={0}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Banner com Labels Personalizados</h2>
        <div className={styles.examples}>
          <Banner
            backgroundImage="https://via.placeholder.com/1200x400/167BF7/FFFFFF?text=Explore+Conteudos"
            logo="/images/Product=Alura.svg"
            topLabel="EXPLORE"
            bottomLabel="CONTEÚDOS"
            totalSlides={4}
            currentSlide={0}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Múltiplos Slides</h2>
        <div className={styles.examples}>
          <Banner
            backgroundImage="https://via.placeholder.com/1200x400/167BF7/FFFFFF?text=Slide+3+de+5"
            logo="/images/Product=Alura.svg"
            topLabel="NOVOS"
            bottomLabel="EPISÓDIOS"
            totalSlides={5}
            currentSlide={2}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Carousel Indicator (Standalone)</h2>
        <div className={styles.indicatorExample}>
          <div className={styles.indicatorDark}>
            <CarouselIndicator
              total={3}
              current={standaloneSlide}
              onDotClick={setStandaloneSlide}
            />
          </div>
          <p className={styles.info}>Slide: {standaloneSlide + 1}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Carousel Indicators - Variações</h2>
        <div className={styles.indicatorVariations}>
          <div className={styles.variationItem}>
            <span className={styles.variantLabel}>3 slides - Primeiro ativo</span>
            <div className={styles.indicatorDark}>
              <CarouselIndicator total={3} current={0} />
            </div>
          </div>

          <div className={styles.variationItem}>
            <span className={styles.variantLabel}>3 slides - Segundo ativo</span>
            <div className={styles.indicatorDark}>
              <CarouselIndicator total={3} current={1} />
            </div>
          </div>

          <div className={styles.variationItem}>
            <span className={styles.variantLabel}>3 slides - Terceiro ativo</span>
            <div className={styles.indicatorDark}>
              <CarouselIndicator total={3} current={2} />
            </div>
          </div>

          <div className={styles.variationItem}>
            <span className={styles.variantLabel}>5 slides</span>
            <div className={styles.indicatorDark}>
              <CarouselIndicator total={5} current={2} />
            </div>
          </div>

          <div className={styles.variationItem}>
            <span className={styles.variantLabel}>7 slides</span>
            <div className={styles.indicatorDark}>
              <CarouselIndicator total={7} current={3} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Exemplo de Carousel</h2>
        <div className={styles.carouselExample}>
          <div className={styles.carouselSlides}>
            <div className={styles.slide} style={{ backgroundColor: '#1d4ed8' }}>
              <h3>Slide 1</h3>
              <p>Primeiro slide do carousel</p>
            </div>
          </div>
          <div className={styles.carouselControls}>
            <button
              className={styles.carouselButton}
              onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 2))}
            >
              ← Anterior
            </button>
            <CarouselIndicator
              total={3}
              current={currentSlide}
              onDotClick={setCurrentSlide}
            />
            <button
              className={styles.carouselButton}
              onClick={() => setCurrentSlide((prev) => (prev < 2 ? prev + 1 : 0))}
            >
              Próximo →
            </button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Especificações</h2>
        <div className={styles.specs}>
          <div className={styles.specItem}>
            <h3>Banner</h3>
            <ul>
              <li>Tamanho: 194px × 235.212px</li>
              <li>Border radius: 12px</li>
              <li>Background: #0e1731</li>
              <li>Labels: Chakra Petch 18.63px</li>
              <li>Suporta imagem de fundo com overlay</li>
              <li>Elementos decorativos com gradientes</li>
            </ul>
          </div>

          <div className={styles.specItem}>
            <h3>Carousel Indicator</h3>
            <ul>
              <li>Dot inativo: 12px, rgba(255,255,255,0.4)</li>
              <li>Dot ativo: 14px, azul (#1d4ed8)</li>
              <li>Espaçamento: 8px entre dots</li>
              <li>Transição: 0.3s ease</li>
              <li>Acessível: aria-labels e navegação por teclado</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
