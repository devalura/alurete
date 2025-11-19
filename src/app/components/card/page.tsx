'use client';

import { Card } from '@/components/Card';
import { CourseProgressCard } from '@/components/CourseProgressCard';
import { AssessmentCard } from '@/components/AssessmentCard';
import { CareerCard } from '@/components/CareerCard';
import styles from './page.module.css';

export default function CardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cards</h1>
        <p>Componentes de card para diferentes contextos e conteúdos.</p>
      </div>

      <section className={styles.section}>
        <h2>Course Progress Card</h2>
        <p className={styles.description}>Card para exibir progresso de cursos com botão de continuar.</p>
        <div className={styles.examples}>
          <CourseProgressCard
            courseTitle="HTML e CSS"
            courseSubtitle="ambientes de desenvolvimento, estrutura de arquivos e tags"
            progress={0.6}
            currentClass="Documentação e HTML"
            classDuration="33min"
            onContinue={() => alert('Continuar curso')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Assessment Card</h2>
        <p className={styles.description}>Card para avaliações e testes.</p>
        <div className={styles.examples}>
          <AssessmentCard
            title="Avaliação de conhecimentos em React: hooks, componentes e estado"
            tag="Criada pela sua empresa"
            actionLabel="FAZER AVALIAÇÃO"
            onAction={() => alert('Iniciar avaliação')}
          />
          
          <AssessmentCard
            title="Teste de JavaScript Avançado"
            tag="Criada pela Alura"
            actionLabel="COMEÇAR TESTE"
            onAction={() => alert('Iniciar teste')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Career Card</h2>
        <p className={styles.description}>Card para carreiras e trilhas de aprendizado.</p>
        <div className={styles.examples}>
          <CareerCard
            title="Especialista em IA"
            image="https://via.placeholder.com/400x200/4A90E2/FFFFFF?text=Especialista+em+IA"
            tag="CARREIRA"
            onClick={() => alert('Ver carreira')}
          />
          
          <CareerCard
            title="Análise de Dados"
            image="https://via.placeholder.com/400x200/E24A90/FFFFFF?text=Analise+de+Dados"
            tag="CARREIRA"
            onClick={() => alert('Ver carreira')}
          />
          
          <CareerCard
            title="Ciência de Dados"
            image="https://via.placeholder.com/400x200/90E24A/FFFFFF?text=Ciencia+de+Dados"
            tag="CARREIRA"
            showLockIcon
            onClick={() => alert('Carreira bloqueada')}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Card Base (Genérico)</h2>
        <p className={styles.description}>Componente de card genérico para uso geral.</p>
        <div className={styles.examples}>
          <Card padding="medium" hoverable style={{ width: '300px' }}>
            <h3>Card com Hover</h3>
            <p>Este é um card com efeito hover.</p>
          </Card>

          <Card 
            padding="medium"
            header={<h3>Card com Header</h3>}
            footer={<button>Ação</button>}
            style={{ width: '300px' }}
          >
            <p>Conteúdo do card com header e footer.</p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Grid de Carreiras</h2>
        <div className={styles.careerGrid}>
          <CareerCard
            title="Desenvolvimento Back-End Java"
            image="https://via.placeholder.com/400x200/E2904A/FFFFFF?text=Back-End+Java"
            tag="CARREIRA"
          />
          <CareerCard
            title="AppSec: Desenvolvimento Seguro"
            image="https://via.placeholder.com/400x200/4AE290/FFFFFF?text=AppSec"
            tag="CARREIRA"
          />
          <CareerCard
            title="Ciência de Dados"
            image="https://via.placeholder.com/400x200/90E24A/FFFFFF?text=Ciencia+Dados"
            tag="CARREIRA"
          />
          <CareerCard
            title="Engenharia de IA"
            image="https://via.placeholder.com/400x200/E24A4A/FFFFFF?text=Engenharia+IA"
            tag="CARREIRA"
          />
        </div>
      </section>
    </div>
  );
}
