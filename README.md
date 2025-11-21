# Alurete Design System

Sistema de design da Alura com componentes prontos para usar em aplicações **JSP/Spring** e **React/Next.js**.

---

## 📍 Navegação Rápida

- 🎯 [Para Desenvolvedores Spring](#-para-desenvolvedores-spring-você)
- 🎨 [Para Product Designers](#-para-product-designers)
- ⚛️ [Para Desenvolvedores Front-end](#️-para-desenvolvedores-front-end-reactnextjs)

---


## 🎯 Para Desenvolvedores Spring (você!)

### Setup Rápido (2 minutos)

1. **Baixe o CSS pronto:**
   ```bash
   # Peça ao time de front-end ou baixe de:
   # dist/alurete-design-system.css
   ```

2. **Coloque no seu projeto Spring:**
   ```
   src/main/resources/static/css/alurete-design-system.css
   ```

3. **Adicione no seu JSP/template:**
   ```jsp
   <link rel="stylesheet" href="${pageContext.request.contextPath}/css/alurete-design-system.css">
   ```

4. **Pronto! Use os componentes:**
   ```html
   <button class="ds-button ds-button--primary ds-button--medium">
       Salvar
   </button>
   ```

### 📖 Documentação Completa

- **[GUIA-RAPIDO.md](./GUIA-RAPIDO.md)** - Todos os componentes com exemplos
- **[public/jsp-demo.html](./public/jsp-demo.html)** - Abra no navegador para ver exemplos visuais

### 🔄 Atualizando o CSS

Quando o time de front-end atualizar o design system:
1. Receba o novo `alurete-design-system.css`
2. Substitua o arquivo em `static/css/`
3. Limpe o cache do navegador (Ctrl+Shift+R)

---

## 🎨 Para Product Designers

### Ver os Componentes Visuais

1. **Abra no navegador:** `public/jsp-demo.html`
   - Veja todos os componentes renderizados
   - Teste dark mode
   - Copie o HTML se precisar

2. **Tokens de Design:**
   - **Cores:** Veja em `src/styles/tokens.css` (linhas 204-275)
   - **Espaçamento:** 8px, 16px, 24px, 32px... (múltiplos de 8)
   - **Tipografia:** Open Sans (corpo), Chakra Petch (títulos)
   - **Bordas:** 4px, 8px, 12px, 16px, 24px, pill (9999px)

### Propor Mudanças

**Quer mudar uma cor/espaçamento/componente?**
1. **Discuta a mudança** com o time
2. **Faça a alteração no Figma** (projeto Alurete)
   - Mude as variáveis lá
   - Atualize os componentes
3. **Exporte os tokens:** `design-tokens.json` do Figma usando o plugin "Alurete Exporta JSON" (disponível no Notion de PD)
4. **Importe aqui:** Substitua o `design-tokens.json` na raiz do projeto
5. **Avise o time de dev** para atualizar o CSS

### Workflow de Sincronização

```
Figma (Alurete) → design-tokens.json → Design System (código)
     ↓                    ↓                      ↓
  Variáveis          Exportar              Importar
  Componentes                            npm run build:static
```

**Importante:** O Figma é a **fonte da verdade**. Sempre atualize lá primeiro!

### Checklist de Design

Ao criar componentes no Figma (Alurete), use:
- ✅ Variáveis do Figma (não valores hardcoded)
- ✅ Espaçamento em múltiplos de 8px
- ✅ Fontes: Open Sans ou Chakra Petch
- ✅ Border radius: 4, 8, 12, 16, 24 ou pill
- ✅ Estados: default, hover, active, disabled, error


---

## ⚛️ Para Desenvolvedores Front-end (React/Next.js)

### Rodar o projeto

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### Gerar CSS para Spring

```bash
npm run build:static
```

Isso cria `dist/alurete-design-system.css` → enviar para o time back-end.

### Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run build:static` - **Gera CSS para JSP/Spring**
- `npm run lint` - Linter

---

## 📦 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules + Global CSS (BEM)

---

**Dúvidas?** Consulte o [GUIA-RAPIDO.md](./GUIA-RAPIDO.md) ou abra uma issue.
