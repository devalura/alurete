# Alurete Design System - JSP/Spring Integration Guide

## 📦 Using the Design System in JSP/Spring Applications

This design system now supports **hybrid usage**: both React components (for Next.js) and plain HTML/CSS (for JSP/Spring).

## 🚀 Quick Start for JSP/Spring

### 1. Generate the Static CSS Bundle

```bash
npm run build:static
```

This creates `dist/alurete-design-system.css` with all tokens and component styles.

### 2. Include in Your JSP Application

Copy `dist/alurete-design-system.css` to your Spring application's static resources folder (e.g., `src/main/resources/static/css/`).

Then include it in your JSP:

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/alurete-design-system.css">
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

### 3. Use Components with BEM Classes

All components are available with `ds-*` prefixed classes following BEM naming convention.

## 📚 Component Examples

### Button

```html
<!-- Primary Button -->
<button class="ds-button ds-button--primary ds-button--medium">
    Click me
</button>

<!-- Secondary Button -->
<button class="ds-button ds-button--secondary ds-button--large">
    Secondary Action
</button>

<!-- Ghost Button -->
<button class="ds-button ds-button--ghost ds-button--small">
    Ghost
</button>

<!-- With Icon -->
<button class="ds-button ds-button--primary ds-button--medium">
    <span class="ds-button__icon">🚀</span>
    Launch
</button>
```

### Card

```html
<div class="ds-card">
    <div class="ds-card__header">
        <h3 class="ds-card__title">Card Title</h3>
        <p class="ds-card__description">Card description text</p>
    </div>
    <div class="ds-card__content">
        <p>Card content goes here...</p>
    </div>
    <div class="ds-card__footer">
        <button class="ds-button ds-button--primary ds-button--small">Action</button>
    </div>
</div>
```

### Alert

```html
<!-- Success Alert -->
<div class="ds-alert ds-alert--success">
    <div class="ds-alert__icon">✓</div>
    <div class="ds-alert__content">
        <div class="ds-alert__title">Success!</div>
        <div class="ds-alert__message">Your operation completed successfully.</div>
    </div>
</div>

<!-- Error Alert -->
<div class="ds-alert ds-alert--error">
    <div class="ds-alert__icon">✕</div>
    <div class="ds-alert__content">
        <div class="ds-alert__title">Error</div>
        <div class="ds-alert__message">Something went wrong.</div>
    </div>
</div>
```

### Badge

```html
<span class="ds-badge ds-badge--primary">New</span>
<span class="ds-badge ds-badge--success">Active</span>
<span class="ds-badge ds-badge--error">Urgent</span>
<span class="ds-badge ds-badge--warning">Warning</span>
```

### Input

```html
<div class="ds-input-wrapper">
    <label class="ds-input-label" for="email">Email Address</label>
    <input type="email" id="email" class="ds-input" placeholder="you@example.com">
    <span class="ds-input-helper">We'll never share your email.</span>
</div>

<!-- With Error State -->
<div class="ds-input-wrapper">
    <label class="ds-input-label" for="password">Password</label>
    <input type="password" id="password" class="ds-input ds-input--error">
    <span class="ds-input-error">Password must be at least 8 characters.</span>
</div>
```

## 🎨 Design Tokens

All design tokens are available as CSS custom properties:

### Colors
- `--color-brand-default`
- `--color-text-title`
- `--color-text-body`
- `--color-surface-default`
- `--color-feedback-success-default`
- `--color-feedback-error-default`
- etc.

### Spacing
- `--spacing-1` through `--spacing-40`

### Typography
- `--font-family-sans`, `--font-family-serif`, `--font-family-mono`
- `--font-size-xs` through `--font-size-9xl`
- `--font-weight-thin` through `--font-weight-black`

### Borders
- `--border-radius-sm` through `--border-radius-full`
- `--border-width` through `--border-width-8`

## 🌓 Dark Mode

The design system supports dark mode via the `data-theme` attribute:

```html
<html data-theme="dark">
    <!-- Dark mode enabled -->
</html>
```

Toggle with JavaScript:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
// or
document.documentElement.setAttribute('data-theme', 'light');
```

## 📝 Notes

- **React Components Still Work**: The original React components (`Button.tsx`, etc.) continue to work with CSS Modules.
- **No Breaking Changes**: Existing Next.js code is unaffected.
- **BEM Naming**: All global classes follow the pattern `ds-{component}--{modifier}` or `ds-{component}__{element}`.
