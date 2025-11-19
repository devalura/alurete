'use client';

import { useState } from 'react';
import { LessonHeader } from '@/features/lesson';
import styles from './page.module.css';

export default function LessonHeaderPage() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>LessonHeader (Feature-Specific)</h1>
        <p>Componente específico para a tela de aula, localizado em <code>/features/lesson</code></p>
      </div>

      <section className={styles.section}>
        <h2>Design Pattern: Feature-Based Components</h2>
        <div className={styles.infoBox}>
          <h3>📁 Estrutura de Pastas</h3>
          <pre className={styles.code}>{`src/
├── components/        # Design System (genéricos)
│   ├── Button/
│   ├── Avatar/
│   └── ...
│
├── features/         # Componentes específicos
│   ├── lesson/
│   │   ├── LessonHeader/
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── DashboardHeader/
│       └── index.ts`}</pre>
          <p>
            <strong>LessonHeader</strong> está em <code>/features/lesson</code> porque:
          </p>
          <ul>
            <li>✅ É usado <strong>apenas</strong> na tela de aula</li>
            <li>✅ Tem lógica específica (botão voltar, título da aula, dropdown de usuário)</li>
            <li>✅ Usa componentes do DS internamente (Avatar, ícones)</li>
            <li>❌ Não seria reutilizável em outras contexts (dashboard, marketing, etc.)</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>LessonHeader - Completo</h2>
        <p className={styles.description}>Header usado durante a visualização de uma aula.</p>
        <div className={styles.demo}>
          <LessonHeader
            lessonTitle="Framer: usando IA para criar um site"
            lessonThumbnail="https://via.placeholder.com/26x26"
            userName="Alice"
            userPhoto="https://i.pravatar.cc/150?img=1"
            onBack={() => alert('Voltando para a lista de aulas...')}
            onUserMenuClick={() => setUserMenuOpen(!userMenuOpen)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>LessonHeader - Título Longo</h2>
        <p className={styles.description}>Com text-overflow quando o título é muito grande.</p>
        <div className={styles.demo}>
          <LessonHeader
            lessonTitle="Como criar aplicações web modernas com React, TypeScript, Next.js e todas as melhores práticas do mercado"
            userName="João Silva"
            onBack={() => console.log('Back clicked')}
            onUserMenuClick={() => console.log('User menu clicked')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>LessonHeader - Sem Thumbnail</h2>
        <p className={styles.description}>Versão sem thumbnail da aula.</p>
        <div className={styles.demo}>
          <LessonHeader
            lessonTitle="Introdução ao JavaScript"
            userName="Maria Santos"
            userPhoto="https://i.pravatar.cc/150?img=5"
            onBack={() => console.log('Back clicked')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>LessonHeader - Com Avatar Padrão</h2>
        <p className={styles.description}>Quando o usuário não tem foto.</p>
        <div className={styles.demo}>
          <LessonHeader
            lessonTitle="Python para Data Science"
            userName="Carlos Mendes"
            onBack={() => console.log('Back clicked')}
            onUserMenuClick={() => console.log('User menu clicked')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Mobile Preview (Responsivo)</h2>
        <p className={styles.description}>O header se adapta em telas menores.</p>
        <div className={styles.mobileDemo}>
          <LessonHeader
            lessonTitle="Framer: usando IA para criar um site"
            lessonThumbnail="https://via.placeholder.com/26x26"
            userName="Alice"
            userPhoto="https://i.pravatar.cc/150?img=1"
            onBack={() => console.log('Back clicked')}
            onUserMenuClick={() => console.log('User menu clicked')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Especificações Técnicas</h2>
        <div className={styles.specs}>
          <div className={styles.specItem}>
            <h3>Layout</h3>
            <ul>
              <li>Width: 100% (até 1440px)</li>
              <li>Height: Auto (min 56px)</li>
              <li>Background: Indigo 50 (#e0e7ff)</li>
              <li>Padding: 12px 24px</li>
              <li>Display: Flex (space-between)</li>
            </ul>
          </div>

          <div className={styles.specItem}>
            <h3>Seções</h3>
            <ul>
              <li><strong>Left:</strong> Botão voltar (42px) + Logo (90×56px)</li>
              <li><strong>Center:</strong> Thumbnail (26px) + Título (16px bold)</li>
              <li><strong>Right:</strong> Avatar (40px) + Nome + Dropdown</li>
            </ul>
          </div>

          <div className={styles.specItem}>
            <h3>Interações</h3>
            <ul>
              <li>Botão voltar: onClick callback</li>
              <li>Dropdown usuário: onClick callback</li>
              <li>Hover: background em botões</li>
              <li>Mobile: oculta nome, thumbnail</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Quando usar /features vs /components?</h2>
        <div className={styles.comparison}>
          <div className={styles.comparisonItem}>
            <h3>✅ Use /features quando:</h3>
            <ul>
              <li>Componente usado em <strong>apenas 1 contexto</strong></li>
              <li>Tem <strong>lógica de negócio específica</strong></li>
              <li>Não faz sentido em outros lugares</li>
              <li>Exemplo: LessonHeader, DashboardStats</li>
            </ul>
          </div>

          <div className={styles.comparisonItem}>
            <h3>✅ Use /components quando:</h3>
            <ul>
              <li>Componente <strong>100% reutilizável</strong></li>
              <li>Agnóstico de contexto</li>
              <li>Parte do Design System</li>
              <li>Exemplo: Button, Avatar, Card</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Exemplo de Uso</h2>
        <div className={styles.codeExample}>
          <pre>{`import { LessonHeader } from '@/features/lesson';

export default function LessonPage() {
  return (
    <>
      <LessonHeader
        lessonTitle="Framer: usando IA para criar um site"
        userName="Alice"
        onBack={() => router.push('/cursos')}
        onUserMenuClick={() => setMenuOpen(true)}
      />
      
      {/* Resto da página da aula */}
      <VideoPlayer />
      <LessonSidebar />
    </>
  );
}`}</pre>
        </div>
      </section>
    </div>
  );
}
