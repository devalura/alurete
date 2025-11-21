# Alurete Design System - Guia Rápido

## 🚀 Setup (5 minutos)

### JSP/Spring
1. Baixe: `dist/alurete-design-system.css`
2. Coloque em: `src/main/resources/static/css/`
3. Adicione no `<head>`:
```jsp
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/alurete-design-system.css">
```

### React/Next.js
Já está configurado! Só usar os componentes.

---

## 📦 Componentes Disponíveis

### Button
```html
<!-- JSP/Spring -->
<button class="ds-button ds-button--primary ds-button--medium">Clique aqui</button>
<button class="ds-button ds-button--secondary ds-button--small">Cancelar</button>
<button class="ds-button ds-button--ghost ds-button--large">Ghost</button>
```

```tsx
// React
import { Button } from '@/components/Button';

<Button variant="primary" size="medium">Clique aqui</Button>
```

**Variantes:** `primary` | `secondary` | `ghost` | `link`  
**Tamanhos:** `small` | `medium` | `large`

---

### Card
```html
<!-- JSP/Spring -->
<div class="ds-card">
  <div class="ds-card__header">
    <h3 class="ds-card__title">Título</h3>
    <p class="ds-card__description">Descrição</p>
  </div>
  <div class="ds-card__content">
    Conteúdo aqui
  </div>
</div>
```

```tsx
// React
import { Card } from '@/components/Card';

<Card>
  <h3>Título</h3>
  <p>Conteúdo</p>
</Card>
```

---

### Alert
```html
<!-- JSP/Spring -->
<div class="ds-alert ds-alert--success">
  <div class="ds-alert__icon">✓</div>
  <div class="ds-alert__content">
    <div class="ds-alert__title">Sucesso!</div>
    <div class="ds-alert__message">Operação concluída.</div>
  </div>
</div>
```

**Variantes:** `success` | `error` | `warning` | `info`



---

### Input
```html
<!-- JSP/Spring -->
<div class="ds-input-wrapper">
  <label class="ds-input-label" for="email">Email</label>
  <input type="email" id="email" class="ds-input" placeholder="seu@email.com">
  <span class="ds-input-helper">Texto de ajuda</span>
</div>

<!-- Com erro -->
<input class="ds-input ds-input--error">
<span class="ds-input-error">Mensagem de erro</span>
```

---

## 🎨 Design Tokens (Variáveis CSS)

Use diretamente no seu código:

```css
/* Cores */
var(--color-brand-default)
var(--color-text-title)
var(--color-text-body)
var(--color-surface-default)

/* Espaçamento */
var(--spacing-2)    /* 8px */
var(--spacing-4)    /* 16px */
var(--spacing-6)    /* 24px */

/* Bordas */
var(--border-radius)
var(--border-radius-lg)
var(--border-radius-full)
```

**Exemplo:**
```html
<div style="padding: var(--spacing-4); background: var(--color-brand-default);">
  Conteúdo
</div>
```

---

## 🌓 Dark Mode

```javascript
// Ativar dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Voltar para light mode
document.documentElement.setAttribute('data-theme', 'light');
```

---

## 🔄 Atualizando o Design System

### Para o time de DS (React/Next.js):
```bash
npm run build:static
```
Isso gera `dist/alurete-design-system.css` → enviar para o time Java.

### Para o time Java (JSP/Spring):
1. Receba o novo `alurete-design-system.css`
2. Substitua o arquivo em `static/css/`
3. Limpe o cache (Ctrl+Shift+R)

---

## ❓ FAQ

**Posso modificar o CSS?**  
❌ Não! Peça mudanças ao time de DS.

**Como adicionar uma cor nova?**  
Peça ao time de DS para adicionar em `tokens.css`.

**Qual a diferença entre React component e classe BEM?**  
- **React:** Use quando precisar de lógica (eventos, estados)
- **Classes BEM:** Use para HTML estático (JSP, protótipos)

**Onde ver exemplos visuais?**  
Abra `public/jsp-demo.html` no navegador.

---

## 📞 Suporte

- 📁 Exemplos: `public/jsp-demo.html`
- 📖 Tokens completos: `src/styles/tokens.css`
- 🐛 Problemas: Abra issue no repositório
