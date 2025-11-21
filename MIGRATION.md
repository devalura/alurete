# Migração CSS Modules → Tailwind CSS

## Status da Migração

### ✅ Componentes Migrados para Tailwind CSS

Os seguintes componentes foram completamente migrados para usar Tailwind CSS com classes utilitárias:

1. **Button** (`src/components/Button/`)
   - Todas as variants: primary, secondary, ghost, link
   - Todos os sizes: small, medium, large
   - Estados: hover, active, disabled
   - ✅ Tema dinâmico preservado via variáveis CSS



3. **Tag** (`src/components/Tag/`)
   - Todas as variants: primary, secondary, attention, error, success
   - Suporte a leftIcon e rightIcon
   - ✅ Tema dinâmico preservado via variáveis CSS

4. **Avatar** (`src/components/Avatar/`)
   - Todos os sizes: 24, 32, 40, 110
   - Suporte a imagem e iniciais
   - Shadow overlay para size 110
   - ✅ Tema dinâmico preservado via variáveis CSS

5. **Progress** (`src/components/Progress/`)
   - Sizes: small, large
   - Label formats: percentage, fraction
   - Animação de width suave
   - ✅ Tema dinâmico preservado via variáveis CSS

6. **Card** (`src/components/Card/`)
   - Variants: default, secondary
   - Padding options: none, small, medium, large
   - Header e Footer com bordas
   - Hoverable state
   - ✅ Tema dinâmico preservado via variáveis CSS

### 🔄 Componentes que Permanecem em CSS Modules

Os seguintes componentes foram mantidos em CSS Modules devido à sua complexidade:

#### Alta Complexidade - Manter CSS Modules

1. **Banner** (`src/components/Banner/`)
   - ❌ Muito complexo para Tailwind
   - Razão: Gradientes complexos, filters, absolute positioning com valores decimais precisos
   - Patterns: `filter: blur(40px)`, `rotate(330.652deg)`, posicionamento com valores como `29.82px`

2. **ExerciseOption** (`src/features/lesson/ExerciseOption/`)
   - ❌ Muito complexo para Tailwind
   - Razão: Múltiplos estados complexos (default/hover/success/error), seletores aninhados
   - Patterns: `.option.default:hover:not(:disabled) .iconContainer`

3. **Checkbox** (`src/components/Checkbox/`)
   - ❌ Complexidade moderada
   - Razão: Input hidden com custom styling via sibling selectors, pseudo-elementos
   - Patterns: `input:checked + .customCheckbox`, `::before` para checkmark

4. **Radio** (`src/components/Radio/`)
   - ❌ Complexidade moderada
   - Razão: Input hidden com custom styling, transforms com scale
   - Patterns: `input:checked + .radioCustom .radioDot { transform: scale(1) }`

5. **Footer** (`src/components/Footer/`)
   - ❌ Layout complexo
   - Razão: Multi-column layout com breakpoints específicos, estrutura aninhada complexa

6. **Alert** (`src/components/Alert/`)
   - ❌ Complexidade moderada
   - Razão: Múltiplas variantes com ícones, estados closable, actions
   - Pode ser migrado futuramente

7. **Input** (`src/components/Input/`)
   - ❌ Complexidade moderada
   - Razão: Left/right icons com positioning, `:focus-within` states
   - Pode ser migrado futuramente

8. **Tabs** (`src/components/Tabs/`)
   - ❌ Complexidade moderada
   - Razão: Context API, múltiplos componentes (List, Trigger, Content)
   - Pode ser migrado futuramente

9. **LessonHeader** (`src/features/lesson/LessonHeader/`)
   - ❌ Layout responsivo complexo
   - Razão: Media queries específicas, layout multi-seção

10. **IconButton**, **PlayButton**, **SocialButton**, **CarouselIndicator**
    - ⚠️ Baixa prioridade para migração
    - Podem ficar em CSS Modules ou serem migrados depois

11. **Cards específicos**: **AssessmentCard**, **CareerCard**, **CourseProgressCard**
    - ⚠️ Componentes de caso de uso específico
    - Podem ficar em CSS Modules

### 📋 Páginas e Layouts

Status: Pendente de migração
- `src/app/page.tsx` e `page.module.css`
- `src/app/components/layout.tsx` e `layout.module.css`
- `src/app/branding/layout.tsx` e `layout.module.css`
- `src/app/tokens/layout.tsx` e `layout.module.css`
- Páginas de demonstração de componentes

## Configuração do Tailwind CSS v4

### Arquivo: `postcss.config.js`
```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Arquivo: `src/styles/globals.css`
- ✅ Tailwind importado via `@import 'tailwindcss'`
- ✅ Design tokens preservados via `@import './tokens.css'`
- ✅ Configuração `@theme` mapeia variáveis CSS para Tailwind
- ✅ Tema dinâmico funciona via `[data-theme="dark"]` no HTML

### Variáveis CSS Mapeadas
Todas as variáveis dos design tokens foram mapeadas no `@theme`:
- Cores (surface, text, brand, feedback, border)
- Spacing (0 até 32)
- Border radius (none, sm, base, md, lg, xl, full)
- Font sizes, weights, line heights
- Shadows

## Padrões de Uso

### ✅ Correto - Usar variáveis CSS com Tailwind
```tsx
className="bg-[var(--color-brand-default)] text-[var(--color-text-on-brand)]"
```

### ❌ Evitar - Cores hardcoded
```tsx
className="bg-blue-700 text-white" // Não responde ao tema
```

### ✅ Correto - Combinar classes base com variants
```tsx
const baseClasses = 'font-sans font-bold rounded-full';
const variantClasses = {
  primary: 'bg-[var(--color-brand-default)] text-white',
  secondary: 'bg-transparent border border-[var(--color-brand-default)]',
};

<button className={`${baseClasses} ${variantClasses[variant]}`}>
```

## Próximos Passos

### Fase 1: Migração de Layouts (Recomendado) ✅ READY
- Migrar `src/app/components/layout.tsx` - Header e Sidebar
- Migrar `src/app/branding/layout.tsx`
- Migrar `src/app/tokens/layout.tsx`
- Migrar `src/app/page.tsx` - Página home

### Fase 2: Componentes Médios (Opcional)
- IconButton, PlayButton, SocialButton, CarouselIndicator
- Cards específicos (AssessmentCard, CareerCard, CourseProgressCard)

### Fase 3: Componentes Complexos (Futuro)
- Avaliar migração de Alert, Input, Tabs
- Manter Banner, ExerciseOption, Checkbox, Radio, Footer em CSS Modules

## Validação

### Checklist de Validação Pós-Migração
- [ ] Todos os componentes migrados renderizam identicamente
- [ ] Tema claro/escuro funciona em todos os componentes
- [ ] Estados hover/active/disabled funcionam corretamente
- [ ] Responsividade mantida
- [ ] Sem regressões visuais
- [ ] Build sem erros ou warnings

### Como Testar
1. Rodar `npm run dev`
2. Navegar por todas as páginas de demonstração
3. Testar toggle de tema claro/escuro
4. Testar todos os estados dos componentes
5. Verificar responsividade em diferentes tamanhos de tela

## Notas Técnicas

### Tailwind CSS v4 - Mudanças Importantes
- Usa `@tailwindcss/postcss` ao invés de `tailwindcss` direto
- Configuração via `@theme` em CSS ao invés de `tailwind.config.js`
- Import via `@import 'tailwindcss'` ao invés de diretivas `@tailwind`

### Preservação do Tema Dinâmico
- Variáveis CSS em `tokens.css` são a fonte da verdade
- `[data-theme="dark"]` no  element sobrescreve variáveis
- Tailwind usa `var(--color-*)` para referenciar as variáveis
- Tema continua funcionando porque as variáveis CSS mudam dinamicamente

### Abordagem Híbrida
Este projeto usa **abordagem híbrida**:
- Componentes simples/médios: Tailwind CSS (melhor DX, menos código)
- Componentes complexos: CSS Modules (melhor para casos específicos)
- **Ambos** convivem no mesmo projeto sem conflitos
