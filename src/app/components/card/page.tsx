'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Progress } from '@/components/Progress';
import { PlayButton } from '@/components/PlayButton';
import { Button } from '@/components/Button';
import { LockIcon } from '@/components/Icons';
import styles from './page.module.css';

export default function CardPage() {
    const [exampleType, setExampleType] = useState<'generic' | 'course-progress' | 'evaluation' | 'career'>('generic');

    // Generic Card State
    const [variant, setVariant] = useState<'default' | 'secondary'>('default');
    const [padding, setPadding] = useState<'none' | 'small' | 'medium' | 'large'>('medium');
    const [borderVariant, setBorderVariant] = useState<'default' | 'subtle'>('default');
    const [hoverable, setHoverable] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    // Course Progress State
    const [progress, setProgress] = useState(60);
    const [courseTitle, setCourseTitle] = useState('HTML e CSS');
    const [courseSubtitle, setCourseSubtitle] = useState('ambientes de desenvolvimento, estrutura de arquivos e tags');

    // Evaluation Card State
    const [evaluationTitle, setEvaluationTitle] = useState('{Nome dado à avaliação durante o cadastro com limite de 3 linhas}');
    const [evaluationTag, setEvaluationTag] = useState('Criada pela sua empresa');
    const [evaluationButtonText, setEvaluationButtonText] = useState('FAZER AVALIAÇÃO');

    // Career Card State
    const [careerTitle, setCareerTitle] = useState('Desenvolvimento Back-End Java');
    const [isLocked, setIsLocked] = useState(false);

    const [copied, setCopied] = useState(false);

    const getCodeSnippet = () => {
        if (exampleType === 'course-progress') {
            return `<Card
  borderVariant="subtle"
  padding="none"
>
  <div className={styles.content}>
    <Progress value={${progress}} size="small" showLabel />
    
    <div className={styles.header}>
      <span className={styles.label}>CURSO</span>
      <h3 className={styles.title}>
        <strong>${courseTitle}:</strong> <span>${courseSubtitle}</span>
      </h3>
    </div>

    <div className={styles.actions}>
      <PlayButton>Continuar de onde parou</PlayButton>
      
      <div className={styles.status}>
        <span>Aula atual:</span> Documentação e HTML - 33min
      </div>
    </div>
  </div>
</Card>`;
        }

        if (exampleType === 'evaluation') {
            return `<Card
  padding="none"
  className={styles.fullWidth}
>
  <div className={styles.content}>
    <div className={styles.header}>
      <span className={styles.label}>AVALIAÇÃO</span>
      <div className={styles.tag}>
        ${evaluationTag}
      </div>
    </div>

    <p className={styles.title}>
      ${evaluationTitle}
    </p>

    <div className={styles.actions}>
      <Button className={styles.fullWidth}>
        ${evaluationButtonText}
      </Button>
    </div>
  </div>
</Card>`;
        }

        if (exampleType === 'career') {
            return `<Card
  padding="none"
  padding="none"
  className={styles.fullWidth}
>
  <div className={styles.content}>
    <div className={styles.image}>
      {/* Placeholder Image */}
      <div className={styles.placeholder} />
      ${isLocked ? `
      {/* Locked Icon */}
      <div className={styles.lockedOverlay}>
        <div className={styles.lockIcon}>
          <LockIcon size={16} />
        </div>
      </div>` : ''}
    </div>
    
    <div className={styles.info}>
      <span className={styles.type}>
        CARREIRA
      </span>
      <h3 className={styles.title}>
        ${careerTitle}
      </h3>
    </div>
  </div>
</Card>`;
        }

        return `<Card
  variant="${variant}"
  padding="${padding}"${borderVariant !== 'default' ? `\n  borderVariant="${borderVariant}"` : ''}${hoverable ? '\n  hoverable' : ''}${showHeader ? '\n  header={<h3>Card Header</h3>}' : ''}${showFooter ? '\n  footer={<button>Action</button>}' : ''}
>
  <p>This is the main content of the card.</p>
  <p>It can contain any elements.</p>
</Card>`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getCodeSnippet());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Card</h1>
                <p className={styles.description}>
                    Componente de container versátil para agrupar conteúdo relacionado.
                    Use o playground abaixo para customizar.
                </p>
            </div>

            <div className={styles.playground}>
                <div className={styles.controls}>
                    {/* Example Type Selector */}
                    <div className={styles.controlRow} style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '24px', marginBottom: '0' }}>
                        <div className={styles.controlGroup}>
                            <label>Tipo de Exemplo</label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="exampleType"
                                        value="generic"
                                        checked={exampleType === 'generic'}
                                        onChange={(e) => setExampleType(e.target.value as any)}
                                    />
                                    Customizável
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="exampleType"
                                        value="course-progress"
                                        checked={exampleType === 'course-progress'}
                                        onChange={(e) => setExampleType(e.target.value as any)}
                                    />
                                    Card de Curso
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="exampleType"
                                        value="evaluation"
                                        checked={exampleType === 'evaluation'}
                                        onChange={(e) => setExampleType(e.target.value as any)}
                                    />
                                    Card de Avaliação
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="exampleType"
                                        value="career"
                                        checked={exampleType === 'career'}
                                        onChange={(e) => setExampleType(e.target.value as any)}
                                    />
                                    Card de Carreira
                                </label>
                            </div>
                        </div>
                    </div>

                    {exampleType === 'generic' && (
                        <>
                            <div className={styles.controlRow}>
                                <div className={styles.controlGroup}>
                                    <label htmlFor="variant">Variante</label>
                                    <select
                                        id="variant"
                                        value={variant}
                                        onChange={(e) => setVariant(e.target.value as any)}
                                        className={styles.select}
                                    >
                                        <option value="default">Default</option>
                                        <option value="secondary">Secondary</option>
                                    </select>
                                </div>

                                <div className={styles.controlGroup}>
                                    <label htmlFor="padding">Padding</label>
                                    <select
                                        id="padding"
                                        value={padding}
                                        onChange={(e) => setPadding(e.target.value as any)}
                                        className={styles.select}
                                    >
                                        <option value="none">None</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>

                                <div className={styles.controlGroup}>
                                    <label htmlFor="borderVariant">Borda</label>
                                    <select
                                        id="borderVariant"
                                        value={borderVariant}
                                        onChange={(e) => setBorderVariant(e.target.value as any)}
                                        className={styles.select}
                                    >
                                        <option value="default">Default</option>
                                        <option value="subtle">Subtle (Blue)</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.controlRow}>
                                <div className={`${styles.controlGroup} ${styles.auto}`}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={hoverable}
                                            onChange={(e) => setHoverable(e.target.checked)}
                                        />
                                        Hoverable
                                    </label>
                                </div>

                                <div className={`${styles.controlGroup} ${styles.auto}`}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={showHeader}
                                            onChange={(e) => setShowHeader(e.target.checked)}
                                        />
                                        Show Header
                                    </label>
                                </div>

                                <div className={`${styles.controlGroup} ${styles.auto}`}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={showFooter}
                                            onChange={(e) => setShowFooter(e.target.checked)}
                                        />
                                        Show Footer
                                    </label>
                                </div>
                            </div>
                        </>
                    )}


                    {exampleType === 'course-progress' && (
                        <div className={styles.controlRow}>
                            <div className={styles.controlGroup}>
                                <label htmlFor="progress" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    Progresso <span>{progress}%</span>
                                </label>
                                <input
                                    id="progress"
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={(e) => setProgress(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                            <div className={styles.controlGroup}>
                                <label htmlFor="courseTitle">Título (Negrito)</label>
                                <input
                                    id="courseTitle"
                                    type="text"
                                    value={courseTitle}
                                    onChange={(e) => setCourseTitle(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.controlGroup}>
                                <label htmlFor="courseSubtitle">Subtítulo</label>
                                <input
                                    id="courseSubtitle"
                                    type="text"
                                    value={courseSubtitle}
                                    onChange={(e) => setCourseSubtitle(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    )}

                    {exampleType === 'evaluation' && (
                        <div className={styles.controlRow}>
                            <div className={styles.controlGroup}>
                                <label htmlFor="evaluationTag">Tag</label>
                                <input
                                    id="evaluationTag"
                                    type="text"
                                    value={evaluationTag}
                                    onChange={(e) => setEvaluationTag(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.controlGroup}>
                                <label htmlFor="evaluationTitle">Título da Avaliação</label>
                                <input
                                    id="evaluationTitle"
                                    type="text"
                                    value={evaluationTitle}
                                    onChange={(e) => setEvaluationTitle(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.controlGroup}>
                                <label htmlFor="evaluationButtonText">Texto do Botão</label>
                                <input
                                    id="evaluationButtonText"
                                    type="text"
                                    value={evaluationButtonText}
                                    onChange={(e) => setEvaluationButtonText(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    )}

                    {exampleType === 'career' && (
                        <div className={styles.controlRow}>
                            <div className={styles.controlGroup}>
                                <label htmlFor="careerTitle">Título da Carreira</label>
                                <input
                                    id="careerTitle"
                                    type="text"
                                    value={careerTitle}
                                    onChange={(e) => setCareerTitle(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={`${styles.controlGroup} ${styles.auto}`}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={isLocked}
                                        onChange={(e) => setIsLocked(e.target.checked)}
                                    />
                                    Bloqueado
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.previewArea}>
                    <div className={styles.previewHeader}>Preview</div>
                    <div className={styles.preview}>
                        <div className={styles.previewContent} style={{ width: '100%', maxWidth: (exampleType === 'generic' || exampleType === 'course-progress') ? '100%' : exampleType === 'career' ? '220px' : '360px' }}>
                            {exampleType === 'generic' ? (
                                <Card
                                    variant={variant}
                                    padding={padding}
                                    borderVariant={borderVariant}
                                    hoverable={hoverable}
                                    header={showHeader ? <h3 className={styles.genericCardHeader}>Card Header</h3> : undefined}
                                    footer={showFooter ? <button className={styles.genericCardAction}>Action</button> : undefined}
                                >
                                    <div className={styles.genericCardContent}>
                                        <p className={styles.genericCardText}>This is the main content of the card.</p>
                                        <p className={styles.genericCardText}>It can contain any elements you need to display grouped together.</p>
                                    </div>
                                </Card>
                            ) : exampleType === 'course-progress' ? (
                                /* Course Progress Card Example Structure */
                                <Card
                                    borderVariant="subtle"
                                    padding="none"
                                    className={styles.fullWidth}
                                >
                                    <div className={styles.courseCardContent}>
                                        {/* Progress Section */}
                                        <div className="w-full">
                                            <Progress value={progress} size="small" showLabel />
                                        </div>

                                        {/* Title Section */}
                                        <div className={styles.courseTitleSection}>
                                            <span className={styles.courseLabel}>CURSO</span>
                                            <h3 className={styles.courseTitle}>
                                                <strong className={styles.courseTitleStrong}>{courseTitle}:</strong> <span className={styles.courseSubtitle}>{courseSubtitle}</span>
                                            </h3>
                                        </div>

                                        {/* Action Section */}
                                        <div className={styles.courseActionSection}>
                                            <PlayButton>Continuar de onde parou</PlayButton>

                                            <div className={styles.courseStatus}>
                                                <span className={styles.courseStatusLabel}>Aula atual:</span> Documentação e HTML - 33min
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ) : exampleType === 'evaluation' ? (
                                /* Evaluation Card Example Structure */
                                <Card
                                    padding="none"
                                    className={styles.fullWidth}
                                >
                                    <div className={styles.evaluationCardContent}>
                                        <div className={styles.evaluationHeader}>
                                            <span className={styles.evaluationLabel}>AVALIAÇÃO</span>
                                            <div className={styles.evaluationTag}>
                                                {evaluationTag}
                                            </div>
                                        </div>

                                        <p className={styles.evaluationTitle}>
                                            {evaluationTitle}
                                        </p>

                                        <div className={styles.evaluationButton}>
                                            <Button className="w-full uppercase" style={{ width: '100%' }}>
                                                {evaluationButtonText}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ) : (
                                /* Career Card Example Structure */
                                <Card
                                    padding="none"
                                    className={styles.fullWidth}
                                >
                                    <div className={styles.careerCardContent}>
                                        <div className={styles.careerImage} style={{ position: 'relative' }}>
                                            {/* Placeholder for image */}
                                            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />

                                            {isLocked && (
                                                <div className={styles.careerLockedOverlay}>
                                                    <div className={styles.careerLockIcon}>
                                                        <LockIcon size={16} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.careerInfo}>
                                            <span className={styles.careerType}>
                                                CARREIRA
                                            </span>
                                            <h3 className={styles.careerTitle}>
                                                {careerTitle}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
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
                    <pre className={styles.codeBlock}>{getCodeSnippet()}</pre>
                </div>
            </div>
        </div>
    );
}
