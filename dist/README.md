# Alurete Design System - Artifacts

Bem-vindo aos **artifacts estáticos** do Alurete Design System! 

Este diretório contém tudo que você precisa para **usar os componentes em projetos Java/Spring/JSP** sem precisar instalar Node.js ou rodar o ambiente de desenvolvimento React.

---

## 📦 O que está incluído

```
dist/
├── alurete.css          # CSS Bundle completo (todos os componentes)
├── tokens.json          # Design Tokens (cores, espaçamentos, etc.)
├── templates/           # Snippets HTML de cada componente
│   ├── Button.html
│   ├── Card.html
│   ├── Input.html
│   └── ...
├── index.html           # Documentação visual dos componentes
└── README.md            # Este arquivo
```

---

## 🚀 Como usar no seu projeto Java/Spring/JSP

### 1. Copie o CSS para o projeto

Copie o arquivo `alurete.css` para a pasta de assets do seu projeto Spring Boot:

```
src/main/resources/static/css/alurete.css
```

### 2. Importe no seu JSP/HTML

Adicione no `<head>` das suas páginas:

```html
<link rel="stylesheet" href="/css/alurete.css">
```

### 3. Use as classes CSS nos componentes

Todas as classes foram **namespacadas** para evitar conflitos. Por exemplo:

```html
<!-- Botão Primary -->
<button class="Button-button Button-primary Button-medium">
  Salvar
</button>

<!-- Card -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-content">
    Conteúdo do card
  </div>
</div>
```

---

## 📝 Nomenclatura das Classes CSS

Todas as classes seguem o padrão:

```
.[ComponentName]-[className]
```

**Exemplos:**
- `.Button-button` — classe base do botão
- `.Button-primary` — variante primary
- `.Button-small` — tamanho small
- `.Card-card` — classe base do card
- `.Alert-success` — alerta de sucesso

---

## 🎨 Design Tokens (Variáveis CSS)

O arquivo CSS inclui todas as variáveis de design (CSS Custom Properties):

```css
var(--color-brand-default)      /* Cor principal da marca */
var(--spacing-4)                /* Espaçamento de 16px */
var(--border-radius-lg)         /* Border radius grande */
var(--font-family-sans)         /* Fonte sans-serif */
```

Você pode usar essas variáveis no seu próprio CSS personalizado:

```css
.meu-elemento {
  color: var(--color-brand-default);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
}
```

---

## 📚 Componentes Disponíveis

### Button
```html
<button class="Button-button Button-primary Button-medium">
  Clique Aqui
</button>
```

**Variantes:** `Button-primary`, `Button-secondary`, `Button-ghost`, `Button-link`  
**Tamanhos:** `Button-small`, `Button-medium`, `Button-large`

---

### Card
```html
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-content">
    Seu conteúdo aqui
  </div>
</div>
```

**Variantes:** `Card-default`, `Card-secondary`  
**Padding:** `Card-padding-none`, `Card-padding-small`, `Card-padding-medium`, `Card-padding-large`  
**Border:** `Card-border-default`, `Card-border-subtle`

---

### Input
```html
<input 
  type="text" 
  class="Input-input Input-medium" 
  placeholder="Digite aqui..."
/>
```

**Tamanhos:** `Input-small`, `Input-medium`, `Input-large`  
**Estados:** `Input-error` (para erros de validação)

---

### Alert
```html
<div class="Alert-alert Alert-success">
  <div class="Alert-content">
    <div class="Alert-headerRow">
      <div class="Alert-titleSection">
        <h4 class="Alert-title">Sucesso!</h4>
      </div>
    </div>
    <p class="Alert-message">Operação realizada com sucesso.</p>
  </div>
</div>
```

**Variantes:** `Alert-success`, `Alert-error`, `Alert-warning`, `Alert-info`

---

### Avatar
```html
<div class="Avatar-avatar Avatar-size40">
  <img src="avatar.jpg" alt="User" class="Avatar-image" />
</div>
```

**Tamanhos:** `Avatar-size24`, `Avatar-size32`, `Avatar-size40`, `Avatar-size110`

---

### Tag
```html
<span class="Tag-tag Tag-primary Tag-medium">
  Nova Feature
</span>
```

**Variantes:** `Tag-primary`, `Tag-secondary`, `Tag-success`, `Tag-warning`, `Tag-error`  
**Tamanhos:** `Tag-small`, `Tag-medium`, `Tag-large`

---

## 🔄 Atualizando os Artifacts

Este diretório é gerado automaticamente pelo comando:

```bash
npm run build:artifacts
```

**⚠️ Não edite os arquivos aqui manualmente.** Qualquer mudança será sobrescrita na próxima build.

Se você precisa de modificações:
1. Edite os componentes React no projeto Next.js
2. Rode `npm run build:artifacts` novamente
3. Copie os novos arquivos para o seu projeto Java

---

## 📖 Documentação Completa

Abra o arquivo `index.html` neste diretório em um navegador para visualizar:
- Todos os componentes com exemplos visuais
- Códigos HTML prontos para copiar
- Variações de cada componente

---

## 🆘 Suporte

Se tiver dúvidas ou problemas:
1. Consulte a documentação visual em `index.html`
2. Veja os templates HTML em `templates/`
3. Entre em contato com o time do Design System

---

**Versão:** 0.1.0  
**Gerado em:** ${new Date().toLocaleDateString('pt-BR')}
