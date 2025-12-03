# Alurete Design System

Sistema de design da Alura para aplicações **Java/Spring/JSP**.

## 📑 Navegação

- [👨‍🎨 Para Designers: Testando o Projeto Localmente (Windows)](#-para-designers-testando-o-projeto-localmente-windows)
- [🚀 Quick Start](#-quick-start)
- [📋 Componentes Disponíveis](#-componentes-disponiveis)
- [🎯 Integração com Spring MVC](#-integracao-com-spring-mvc)
- [🗂️ Templates Prontos](#-templates-prontos)
- [🔧 Troubleshooting](#-troubleshooting)
- [📖 Documentação Completa](#-documentacao-completa)
- [🔄 Atualizando](#-atualizando)


## 👨‍🎨 Para Designers: Testando o Projeto Localmente (Windows)

Este guia é para você que trabalha com design e quer rodar o projeto na sua máquina para visualizar os componentes ao vivo, sem precisar ser desenvolvedor.

### **Passo 1: Instalar o Node.js**

1. Acesse: [https://nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador e clique em "Next" até finalizar
4. Para confirmar que instalou, abra o **Prompt de Comando** (pesquise "cmd" no Windows) e digite:
   ```
   node --version
   ```
   Deve aparecer algo como `v20.x.x`

### **Passo 2: Baixar o Projeto**

**Opção A - Se você tem Git instalado:**
1. Abra o Prompt de Comando
2. Navegue até a pasta onde quer guardar o projeto (exemplo: `cd Desktop`)
3. Clone o repositório:
   ```
   git clone https://github.com/caelum/alurete.git
   cd alurete
   ```

**Opção B - Sem Git:**
1. Acesse: [https://github.com/caelum/alurete](https://github.com/caelum/alurete)
2. Clique no botão verde **"Code"** → **"Download ZIP"**
3. Extraia o arquivo ZIP em uma pasta de sua escolha
4. Abra o Prompt de Comando e navegue até a pasta (exemplo: `cd Desktop\alurete`)

### **Passo 3: Instalar as Dependências**

No Prompt de Comando, dentro da pasta do projeto, digite:
```
npm install
```

Aguarde alguns minutos (pode demorar). Você verá várias mensagens passando - é normal!

### **Passo 4: Rodar o Projeto**

Ainda no Prompt de Comando, digite:
```
npm run dev
```

Aguarde aparecer a mensagem:
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

### **Passo 5: Abrir no Navegador**

Abra seu navegador (Chrome, Edge, Firefox...) e acesse:
```
http://localhost:3000
```

🎉 **Pronto!** Você verá a documentação viva do Design System com todos os componentes interativos.

### **Dicas Importantes:**

- **Para parar o servidor:** Volte ao Prompt de Comando e pressione `Ctrl + C`
- **Para rodar novamente:** Digite `npm run dev` de novo


### **Problemas Comuns:**

| Problema | Solução |
|----------|---------|
| "npm não é reconhecido" | Reinicie o computador após instalar o Node.js |
| "Porta 3000 já em uso" | Feche outros programas que possam estar usando a porta 3000, ou mude para `npm run dev -- -p 3001` |
| Alterações não aparecem | Salve o arquivo e a página atualiza sozinha. Se não funcionar, pressione `Ctrl + R` no navegador |

---

## 🚀 Quick Start

### 1. Gere os artifacts
```bash
npm run build:artifacts
```

### 2. Copie para o seu projeto Spring
```
src/main/resources/static/assets/css/alurete/
├── core.css              # ⚠️ Obrigatório
└── components/           # Opcional (sob demanda)
    ├── button.css
    ├── card.css
    └── ...
```

### 3. Importe no JSP

**Opção A: Modular (Recomendado)**
```jsp
<!-- Core (obrigatório) -->
<link rel="stylesheet" href="/assets/css/alurete/core.css">

<!-- Componentes (só o que você usa) -->
<link rel="stylesheet" href="/assets/css/alurete/components/button.css">
<link rel="stylesheet" href="/assets/css/alurete/components/card.css">
```

**Opção B: Bundle completo**
```jsp
<link rel="stylesheet" href="/assets/css/alurete/alurete-full.css">
```

### 4. Use os componentes
```html
<button class="Button-button Button-primary Button-medium">
    Salvar
</button>

<div class="Card-card Card-default Card-padding-medium">
    <div class="Card-content">
        Conteúdo aqui
    </div>
</div>
```

---

## 📋 Componentes Disponíveis

| Componente | CSS | Tamanho | Exemplo |
|------------|-----|---------|---------|
| Button | `components/button.css` | 3.2 KB | `Button-button Button-primary Button-medium` |
| Card | `components/card.css` | 2.5 KB | `Card-card Card-default Card-padding-medium` |
| Input | `components/input.css` | 4.4 KB | `Input-input Input-medium` |
| Alert | `components/alert.css` | 2.0 KB | `Alert-alert Alert-success` |
| Tag | `components/tag.css` | 1.6 KB | `Tag-tag Tag-primary Tag-small` |

**Nota:** Todos dependem de `core.css` (16 KB).

---

## 🎯 Integração com Spring MVC

### Formulários
```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div class="form-group">
    <form:label path="email" cssClass="text-sm font-bold">Email</form:label>
    <form:input path="email" 
                cssClass="Input-input Input-medium ${status.error ? 'Input-error' : ''}" />
    <form:errors path="email" cssClass="text-red-600 text-xs mt-1" />
</div>
```

### Listas com JSTL
```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:forEach items="${cursos}" var="curso">
    <div class="Card-card Card-default Card-padding-small">
        <h3><c:out value="${curso.nome}" /></h3>
        <span class="Tag-tag Tag-primary Tag-small">${curso.categoria}</span>
    </div>
</c:forEach>
```

### Mensagens Flash
```jsp
<c:if test="${not empty mensagemSucesso}">
    <div class="Alert-alert Alert-success">
        <div class="Alert-content">
            <p class="Alert-message"><c:out value="${mensagemSucesso}" /></p>
        </div>
    </div>
</c:if>
```

---

## 🗂️ Templates Prontos

Consulte `dist/jsp-templates/` para snippets completos:

- **`components/`** - Componentes isolados (Button, Input, Card...)
- **`patterns/`** - Padrões compostos (LoginForm, Pagination)
- **`examples/`** - Páginas completas (DashboardLayout)

**Exemplo:** Copie `dist/jsp-templates/patterns/LoginForm.jsp` para ter um formulário de login pronto.

---

## 🔧 Troubleshooting

### CSS não carrega (404)
- ✅ Verifique se a pasta está em `src/main/resources/static/assets/css/alurete/`
- ✅ Confirme que o caminho no `<link>` começa com `/assets/`
- ✅ Se usar Spring Security, libere `/assets/**` nas regras

### Classes não aplicam estilo
- ✅ Importe `core.css` **antes** dos componentes
- ✅ Verifique se não há CSS legado sobrescrevendo (use Inspecionar Elemento)

### Ícones não aparecem
- O Alurete não inclui ícones. Use **Lucide Icons** ou **FontAwesome**:
  ```html
  <button class="Button-button Button-primary Button-medium">
      <i class="fa fa-save"></i> Salvar
  </button>
  ```

---

## 📖 Documentação Completa

- **[dist/GUIA-INTEGRACAO-JSP.md](./dist/GUIA-INTEGRACAO-JSP.md)** - Guia técnico detalhado
- **[dist/index.html](./dist/index.html)** - Catálogo visual (abra no navegador)
- **[dist/jsp-templates/](./dist/jsp-templates/)** - Biblioteca de snippets

---

## 🔄 Atualizando

Quando o Design System for atualizado:

```bash
npm run build:artifacts
```

Depois copie o novo CSS para o projeto Spring e limpe o cache (Ctrl+Shift+R).

---

**Dúvidas?** Abra o [GUIA-INTEGRACAO-JSP.md](./dist/GUIA-INTEGRACAO-JSP.md) ou consulte `dist/index.html` no navegador.
