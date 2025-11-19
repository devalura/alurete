# Arquitetura de Navegação - Menu Lateral

## 📋 Visão Geral

O header da aplicação foi removido e todo o conteúdo de navegação foi reorganizado em um **menu lateral (sidebar)** seguindo boas práticas de arquitetura de informação.

## 🎯 Objetivos

- **Melhor aproveitamento do espaço**: Menu lateral fixo permite mais área útil para o conteúdo
- **Navegação hierárquica clara**: Organização em grupos lógicos facilita a localização
- **Responsividade**: Menu retrátil em dispositivos móveis
- **Consistência**: Mesma navegação em todas as páginas

## 🗂️ Arquitetura de Informação

### Organização do Menu

O menu foi estruturado em **6 categorias principais**, seguindo princípios de:
- **Agrupamento por funcionalidade** (não por ordem alfabética)
- **Progressão do básico ao específico**
- **Separação clara entre fundamentos e componentes**

```
📁 Início
├── / (página principal)

📁 Fundamentos
├── Branding
├── Colors
└── Typography

📁 Componentes Base
├── Alert
├── Avatar
├── Badge
├── Button
├── Checkbox
├── Input
├── Progress
├── Radio
└── Tag

📁 Componentes de Layout
├── Card
├── Footer
└── Tabs

📁 Componentes de Mídia
├── Banner
└── Icons

📁 Componentes Específicos
├── ExerciseOption
└── LessonHeader
```

## 🏗️ Estrutura de Componentes

### Sidebar Component
**Localização**: `src/components/Sidebar/`

```tsx
interface MenuItem {
  title: string;
  href?: string;
  items?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
}
```

**Características**:
- ✅ Reutilizável e configurável
- ✅ Suporta navegação multinível
- ✅ Estado ativo automático (baseado na rota)
- ✅ Responsivo com overlay em mobile
- ✅ Inclui logo e footer

### AppLayout Component
**Localização**: `src/app/AppLayout.tsx`

Wrapper principal que:
- Gerencia o tema (light/dark)
- Controla o estado da sidebar (aberta/fechada)
- Define a estrutura do menu
- Fornece barra superior com toggle e botão de tema

## 📱 Comportamento Responsivo

### Desktop (> 768px)
- Sidebar sempre visível e fixa
- Conteúdo com margem de 280px à esquerda
- Menu button oculto

### Mobile (≤ 768px)
- Sidebar oculta por padrão (translateX(-100%))
- Overlay escurecido quando aberta
- Menu button visível na top bar
- Toque no overlay fecha o menu

## 🎨 Design Tokens Utilizados

```css
/* Espaçamento */
--spacing-1 a --spacing-8

/* Cores */
--color-background-surface-default
--color-border-default
--color-text-body
--color-text-subtle
--color-brand-default
--color-surface-brand-subtle

/* Tipografia */
--font-family-brand
--font-size-sm a --font-size-xl
--font-weight-regular, semibold, bold
```

## 🔄 Mudanças Realizadas

### ✅ Criado
- `src/components/Sidebar/Sidebar.tsx`
- `src/components/Sidebar/Sidebar.module.css`
- `src/components/Sidebar/index.ts`
- `src/app/AppLayout.tsx`
- `src/app/AppLayout.module.css`

### ♻️ Modificado
- `src/app/layout.tsx` - Integração do AppLayout
- `src/app/page.tsx` - Removido header local
- `src/app/page.module.css` - Removidos estilos do header
- `src/app/components/layout.tsx` - Simplificado (sem header)
- `src/app/branding/layout.tsx` - Simplificado (sem header)
- `src/app/tokens/layout.tsx` - Simplificado (sem header)

### ❌ Removido
- Headers duplicados em cada seção
- Navegação inline no topo
- Estados de tema duplicados

## 🚀 Como Usar

O layout é aplicado automaticamente em todas as páginas através do `RootLayout`:

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
```

Para adicionar novos itens ao menu, edite:

```tsx
// src/app/AppLayout.tsx
const menuItems: MenuItem[] = [
  // ... configuração do menu
];
```

## 📊 Benefícios da Nova Arquitetura

1. **Escalabilidade**: Fácil adicionar novos componentes e categorias
2. **Manutenibilidade**: Código centralizado, sem duplicação
3. **UX**: Navegação consistente e previsível
4. **Performance**: Menos re-renders, estados centralizados
5. **Acessibilidade**: Estrutura semântica clara (nav, aside, main)

## 🎓 Princípios de Arquitetura de Informação Aplicados

- **Organização**: Hierarquia clara por tipo de conteúdo
- **Rotulagem**: Títulos descritivos e consistentes
- **Navegação**: Múltiplos caminhos (menu + links internos)
- **Busca**: Estrutura facilita futura implementação de busca
- **Escaneabilidade**: Grupos visuais facilitam localização rápida

---

**Versão**: 1.0  
**Data**: Novembro 2024  
**Mantido por**: Design System Team
