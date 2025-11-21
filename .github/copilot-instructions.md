# Alurete Design System - AI Coding Instructions

## Project Overview
Next.js 15 design system for Alura with React 18, TypeScript, and semantic design tokens. This is a **living documentation site** showcasing reusable UI components with light/dark theme support.

## Architecture

### Dual Component Structure
Components exist in **two locations** serving different purposes:
- **`design-system/components/`** - Source of truth for publishable components (future npm package)
- **`src/components/`** - Application-specific implementations and Next.js integration

When creating/updating components:
1. Core component logic goes in `design-system/components/ComponentName/`
2. App-specific variations or Next.js wrappers go in `src/components/`

### Directory Structure
```
src/
├── app/              # Next.js 15 App Router pages (all use 'use client')
│   ├── AppLayout.tsx # Global layout with sidebar navigation & theme switcher
│   ├── components/   # Component demo pages (/components/button, etc.)
│   ├── branding/     # Brand guidelines page
│   └── tokens/       # Design token showcase pages
├── components/       # Component implementations (import from here with @/)
├── features/         # Domain-specific components (lesson/, etc.)
└── styles/
    ├── globals.css   # Imports tokens.css and sets base styles
    └── tokens.css    # CSS custom properties from design-tokens.json
```

## Component Development Patterns

### Component Structure
Every component follows this exact pattern:
```
ComponentName/
├── ComponentName.tsx       # Component logic with TypeScript interface
├── ComponentName.module.css # Scoped CSS using design tokens
└── index.ts               # Re-exports: export { Component } from './Component'
```

### TypeScript Conventions
- **Always** export component interface: `export interface ComponentProps extends React.HTMLAttributes<HTMLElement>`
- Use `React.forwardRef` for components that need ref forwarding (Button, Input, etc.)
- Export both component and types from `index.ts`

### CSS Module Patterns
- **Never hardcode colors, spacing, or typography** - use CSS variables exclusively
- Common token usage:
  ```css
  background-color: var(--color-brand-default);
  color: var(--color-text-body);
  padding: var(--spacing-4);
  font-family: var(--font-family-sans);
  border-radius: var(--border-radius-md);
  ```
- All CSS files use kebab-case classes, accessed via camelCase in TypeScript: `styles.primaryButton`

### Import Paths
- **Always use `@/` alias** for imports: `import { Button } from '@/components/Button'`
- Icons: `import { IconName } from '@/components/Icons'` (pre-configured Lucide icons)
- See `ICONS.md` for available icons; import additional from `lucide-react` as needed

## Theme System

### Implementation
- Theme state managed in `AppLayout.tsx` using `data-theme` attribute on `<html>`
- Theme persisted to `localStorage` on toggle
- Design tokens in `design-tokens.json` have `light-mode` and `dark-mode` values
- Never use media queries for theme switching

### Adding Theme Support
When creating new components, use semantic tokens that auto-switch:
```css
color: var(--color-text-body);        /* Not --color-slate-900 */
background: var(--color-surface-default);  /* Not #ffffff */
```

## Navigation Architecture

### Sidebar-Based Layout
- **No top header** - all navigation lives in fixed sidebar (see `SIDEBAR-ARCHITECTURE.md`)
- Menu structure defined in `AppLayout.tsx` as hierarchical `MenuItem[]`
- Sidebar is responsive: fixed on desktop, overlay on mobile
- Active route highlighting handled automatically via `usePathname()`

### Adding New Pages
1. Create page at `src/app/path/page.tsx` (must start with `'use client';`)
2. Add entry to `menuItems` array in `AppLayout.tsx`:
   ```typescript
   { title: 'ComponentName', href: '/components/component-name' }
   ```
3. Follow existing page structure with demo section and examples

## Design Tokens

### Token Organization
- Source: `design-tokens.json` (semantic colors, spacing, typography)
- Generated: `src/styles/tokens.css` (400+ CSS custom properties)
- **Never modify `tokens.css` directly** - update `design-tokens.json` instead

### Common Token Categories
- Colors: `--color-brand-*`, `--color-text-*`, `--color-border-*`, `--color-surface-*`
- Spacing: `--spacing-1` through `--spacing-12` (4px increments)
- Typography: `--font-family-sans/mono/serif`, `--font-size-*`, `--font-weight-*`
- Border radius: `--border-radius-sm/md/lg/full`

## Development Workflow

### Running the App
```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build
npm start       # Run production build
```

### Component Development Cycle
1. Create component in `design-system/components/ComponentName/`
2. Import to `src/components/ComponentName/` (may be identical)
3. Create demo page at `src/app/components/component-name/page.tsx`
4. Add to sidebar navigation in `AppLayout.tsx`
5. Test in both light and dark themes

## Key Files Reference
- **`AppLayout.tsx`** - Global layout, sidebar config, theme state
- **`SIDEBAR-ARCHITECTURE.md`** - Navigation organization philosophy
- **`ICONS.md`** - Icon usage guide and available icons
- **`design-tokens.json`** - Single source of truth for design values
- **`src/styles/tokens.css`** - All available CSS custom properties

## Common Gotchas
- All `src/app/` pages must use `'use client';` directive (Next.js App Router requirement)
- Components using hooks or events need `'use client';` in implementation files
- CSS Modules scope styles automatically - no need for BEM or unique class names
- Theme toggle persists but requires `mounted` state to prevent hydration mismatch
- `suppressHydrationWarning` on `<html>` and `<body>` prevents theme flash warnings
