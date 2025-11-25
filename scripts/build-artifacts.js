const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const SRC_DIR = path.join(__dirname, '../src');
const STYLES_DIR = path.join(SRC_DIR, 'styles');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

// Ensure dist directory structure exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

const cssDistDir = path.join(DIST_DIR, 'css');
if (!fs.existsSync(cssDistDir)) {
  fs.mkdirSync(cssDistDir, { recursive: true });
}

const componentsCssDir = path.join(cssDistDir, 'components');
if (!fs.existsSync(componentsCssDir)) {
  fs.mkdirSync(componentsCssDir, { recursive: true });
}

const jspTemplatesDir = path.join(DIST_DIR, 'jsp-templates');
if (!fs.existsSync(jspTemplatesDir)) {
  fs.mkdirSync(jspTemplatesDir, { recursive: true });
}

console.log('🏗️  Starting Artifacts Build...');

// 1. Copy Tokens
console.log('🎨 Copying Design Tokens...');
const tokensSrc = path.join(__dirname, '../design-tokens.json');
if (fs.existsSync(tokensSrc)) {
  fs.copyFileSync(tokensSrc, path.join(DIST_DIR, 'tokens.json'));
}

// 2. Build CSS Bundle & Modular CSS
console.log('💅 Building CSS...');

let fullCssBundle = '/* Alurete Design System - Full Bundle */\n\n';
let coreCssBundle = '/* Alurete Design System - Core (Tokens + Globals) */\n\n';

// Add Tokens CSS
const tokensCssPath = path.join(STYLES_DIR, 'tokens.css');
if (fs.existsSync(tokensCssPath)) {
  const tokensContent = fs.readFileSync(tokensCssPath, 'utf8');
  fullCssBundle += `/* --- Tokens --- */\n${tokensContent}\n\n`;
  coreCssBundle += `/* --- Tokens --- */\n${tokensContent}\n\n`;

  // Save standalone tokens.css
  fs.writeFileSync(path.join(cssDistDir, 'tokens.css'), tokensContent);
}

// Add Global CSS (filter Tailwind directives)
const globalsCssPath = path.join(STYLES_DIR, 'globals.css');
if (fs.existsSync(globalsCssPath)) {
  let globalsContent = fs.readFileSync(globalsCssPath, 'utf8');

  // Remove Tailwind-specific directives that won't work without PostCSS
  globalsContent = globalsContent
    .replace(/@import\s+['"]tailwindcss['"];?\s*/g, '') // Remove @import 'tailwindcss'
    .replace(/@import\s+['"]\.\/(tokens|components)\.css['"];?\s*/g, '') // Remove relative imports
    .replace(/@theme\s*\{[\s\S]*?\}/g, '') // Remove @theme blocks
    .trim();

  fullCssBundle += `/* --- Globals --- */\n${globalsContent}\n\n`;
  coreCssBundle += `/* --- Globals --- */\n${globalsContent}\n\n`;

  // Save standalone globals.css (filtered)
  fs.writeFileSync(path.join(cssDistDir, 'globals.css'), globalsContent);
}

// Save Core Bundle
fs.writeFileSync(path.join(cssDistDir, 'core.css'), coreCssBundle);

// Process Component CSS
const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

componentDirs.forEach(componentName => {
  const componentPath = path.join(COMPONENTS_DIR, componentName);
  const files = fs.readdirSync(componentPath);

  files.forEach(file => {
    if (file.endsWith('.module.css')) {
      const cssPath = path.join(componentPath, file);
      let cssContent = fs.readFileSync(cssPath, 'utf8');

      // Namespace the classes with ComponentName prefix
      const namespacedCss = cssContent.replace(/\.([a-zA-Z_-][\w-]*)/g, (match, className) => {
        return `.${componentName}-${className}`;
      });

      // Add to full bundle
      fullCssBundle += `/* --- Component: ${componentName} --- */\n`;
      fullCssBundle += namespacedCss + '\n\n';

      // Save modular component CSS
      fs.writeFileSync(path.join(componentsCssDir, `${componentName.toLowerCase()}.css`), namespacedCss);
    }
  });
});

fs.writeFileSync(path.join(cssDistDir, 'alurete-full.css'), fullCssBundle);
console.log(`✅ CSS generated in ${cssDistDir}`);

// 3. Generate JSP Templates
console.log('📝 Generating JSP Templates...');

// Helper to write template
function writeTemplate(category, name, content) {
  const dir = path.join(jspTemplatesDir, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, `${name}.jsp`), content);
}

// --- Components ---
const components = {
  Button: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/button.css"> -->

<!-- 1. Primary Button -->
<button class="Button-button Button-primary Button-medium">
  <c:out value="\${label}" default="Salvar" />
</button>

<!-- 2. Button with Icon (using Lucide or similar) -->
<button class="Button-button Button-secondary Button-medium">
  <i class="icon-download" aria-hidden="true"></i> <!-- Exemplo de ícone -->
  <span>Download</span>
</button>

<!-- 3. Link Button -->
<a href="\${url}" class="Button-button Button-link Button-medium">
  Esqueci minha senha
</a>

<!-- 4. Disabled State -->
<button class="Button-button Button-primary Button-medium" \${isDisabled ? 'disabled' : ''}>
  Processando...
</button>`,

  Card: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/card.css"> -->

<!-- 1. Simple Card -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-content">
    <h3><c:out value="\${title}" /></h3>
    <p><c:out value="\${description}" /></p>
  </div>
</div>

<!-- 2. Course Card Example -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-header">
    <span class="Tag-tag Tag-primary Tag-small">\${category}</span>
    <h3 style="margin-top: 8px;"><c:out value="\${courseName}" /></h3>
  </div>
  
  <div class="Card-content">
    <div class="progress-bar">
      <div class="progress-fill" style="width: \${progress}%"></div>
    </div>
    <p class="text-sm">\${progress}% completo</p>
  </div>
  
  <div class="Card-footer">
    <a href="/course/\${id}" class="Button-button Button-primary Button-small">Continuar</a>
  </div>
</div>`,

  Input: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/input.css"> -->

<!-- 1. Standard Input -->
<div class="form-group">
  <label for="email" class="text-sm font-bold">Email</label>
  <input type="email" id="email" name="email" class="Input-input Input-medium" placeholder="seu@email.com" />
</div>

<!-- 2. Input with Error (Spring Form) -->
<div class="form-group">
  <form:label path="username" cssClass="text-sm font-bold">Usuário</form:label>
  <form:input path="username" cssClass="Input-input Input-medium \${status.error ? 'Input-error' : ''}" />
  <form:errors path="username" cssClass="text-red-600 text-xs mt-1" />
</div>`,

  Alert: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/alert.css"> -->

<!-- 1. Flash Message Alert -->
<c:if test="\${not empty flashMessage}">
  <div class="Alert-alert Alert-\${flashType}"> <!-- success, error, warning, info -->
    <div class="Alert-content">
      <h4 class="Alert-title"><c:out value="\${flashTitle}" /></h4>
      <p class="Alert-message"><c:out value="\${flashMessage}" /></p>
    </div>
  </div>
</c:if>`,

  Table: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: core.css + button.css + tag.css -->

<table class="w-full text-left border-collapse">
  <thead>
    <tr class="border-b border-gray-200">
      <th class="p-4 font-bold text-gray-700">Nome</th>
      <th class="p-4 font-bold text-gray-700">Status</th>
      <th class="p-4 font-bold text-gray-700">Ações</th>
    </tr>
  </thead>
  <tbody>
    <c:forEach items="\${users}" var="user">
      <tr class="border-b border-gray-100 hover:bg-gray-50">
        <td class="p-4"><c:out value="\${user.name}" /></td>
        <td class="p-4">
          <span class="Tag-tag Tag-small \${user.active ? 'Tag-success' : 'Tag-secondary'}">
            \${user.active ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        <td class="p-4">
          <a href="/users/\${user.id}" class="Button-button Button-ghost Button-small">Editar</a>
        </td>
      </tr>
    </c:forEach>
  </tbody>
</table>`
};

Object.entries(components).forEach(([name, content]) => writeTemplate('components', name, content));

// --- Patterns ---
const patterns = {
  LoginForm: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="Card-card Card-default Card-padding-large" style="max-width: 400px; margin: 0 auto;">
  <div class="Card-header text-center mb-6">
    <h2 class="text-2xl font-bold text-blue-700">Login</h2>
    <p class="text-gray-500">Acesse sua conta</p>
  </div>

  <form action="/login" method="post">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input type="email" name="username" class="Input-input Input-medium w-full" required />
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
      <input type="password" name="password" class="Input-input Input-medium w-full" required />
    </div>

    <button type="submit" class="Button-button Button-primary Button-medium w-full justify-center">
      Entrar
    </button>
    
    <div class="mt-4 text-center">
      <a href="/forgot-password" class="Button-button Button-link Button-small">Esqueci minha senha</a>
    </div>
  </form>
</div>`,

  Pagination: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Pagination Pattern -->
<div class="flex items-center justify-between mt-6">
  <span class="text-sm text-gray-600">
    Mostrando \${page.start} a \${page.end} de \${page.total} resultados
  </span>

  <div class="flex gap-2">
    <c:if test="\${page.hasPrevious}">
      <a href="?page=\${page.current - 1}" class="Button-button Button-secondary Button-small">Anterior</a>
    </c:if>
    
    <c:forEach begin="1" end="\${page.totalPages}" var="i">
      <a href="?page=\${i}" 
         class="Button-button Button-small \${page.current == i ? 'Button-primary' : 'Button-ghost'}">
        \${i}
      </a>
    </c:forEach>

    <c:if test="\${page.hasNext}">
      <a href="?page=\${page.current + 1}" class="Button-button Button-secondary Button-small">Próximo</a>
    </c:if>
  </div>
</div>`
};

Object.entries(patterns).forEach(([name, content]) => writeTemplate('patterns', name, content));

// --- Examples ---
const examples = {
  DashboardLayout: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard - Alurete</title>
  <link rel="stylesheet" href="/assets/css/alurete/core.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/sidebar.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/card.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/button.css">
</head>
<body class="bg-slate-50 flex h-screen">

  <!-- Sidebar -->
  <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
    <div class="p-6 border-b border-slate-100">
      <h1 class="text-xl font-bold text-blue-700">Alurete</h1>
    </div>
    <nav class="flex-1 p-4 space-y-1">
      <a href="/dashboard" class="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
        Dashboard
      </a>
      <a href="/courses" class="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50">
        Meus Cursos
      </a>
      <a href="/profile" class="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50">
        Perfil
      </a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 overflow-auto p-8">
    <header class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-slate-800">Visão Geral</h2>
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-600">Olá, \${user.name}</span>
        <div class="Avatar-avatar Avatar-size40 bg-blue-200"></div>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Cursos em andamento</p>
        <p class="text-3xl font-bold text-slate-800">4</p>
      </div>
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Certificados</p>
        <p class="text-3xl font-bold text-slate-800">12</p>
      </div>
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Pontos</p>
        <p class="text-3xl font-bold text-slate-800">1,250</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <section>
      <h3 class="text-lg font-bold text-slate-700 mb-4">Atividade Recente</h3>
      <div class="Card-card Card-default">
        <!-- Table content would go here -->
        <div class="p-8 text-center text-slate-500">
          Nenhuma atividade recente.
        </div>
      </div>
    </section>
  </main>

</body>
</html>`
};

Object.entries(examples).forEach(([name, content]) => writeTemplate('examples', name, content));

console.log(`✅ JSP Templates generated in ${jspTemplatesDir}`);

// 4. Generate index.html documentation
console.log('📚 Generating Documentation (index.html)...');

const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alurete Design System - Documentação</title>
  <link rel="stylesheet" href="css/alurete-full.css">
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px; }
    h2 { margin-top: 40px; border-left: 4px solid #1d4ed8; padding-left: 10px; color: #334155; }
    .demo { padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px; margin: 10px 0; background: #f8fafc; }
    pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 4px; overflow-x: auto; }
    .info { background: #dbeafe; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Alurete Design System</h1>
    <p>Documentação para uso em projetos Java/Spring/JSP.</p>

    <div class="info">
      <strong>📦 Instalação:</strong><br>
      Copie a pasta <code>css/</code> para <code>src/main/resources/static/assets/css/alurete/</code>
    </div>

    <h2>Importação CSS</h2>
    <p>Você pode importar o bundle completo ou módulos individuais:</p>
    
    <h3>Opção 1: Bundle Completo</h3>
    <pre>&lt;link rel="stylesheet" href="/assets/css/alurete/alurete-full.css"&gt;</pre>

    <h3>Opção 2: Modular (Recomendado)</h3>
    <pre>&lt;!-- Core (Obrigatório) --&gt;
&lt;link rel="stylesheet" href="/assets/css/alurete/core.css"&gt;

&lt;!-- Componentes (Sob demanda) --&gt;
&lt;link rel="stylesheet" href="/assets/css/alurete/components/button.css"&gt;
&lt;link rel="stylesheet" href="/assets/css/alurete/components/card.css"&gt;</pre>

    <h2>Componentes</h2>

    <h3>Button</h3>
    <div class="demo">
      <button class="Button-button Button-primary Button-medium">Primary</button>
      <button class="Button-button Button-secondary Button-medium">Secondary</button>
    </div>
    <pre>&lt;button class="Button-button Button-primary Button-medium"&gt;Salvar&lt;/button&gt;</pre>

    <h3>Card</h3>
    <div class="demo">
      <div class="Card-card Card-default Card-padding-medium">
        <div class="Card-content">Conteúdo do Card</div>
      </div>
    </div>
    <pre>&lt;div class="Card-card Card-default Card-padding-medium"&gt;
  &lt;div class="Card-content"&gt;Conteúdo&lt;/div&gt;
&lt;/div&gt;</pre>

    <h3>Alert</h3>
    <div class="demo">
      <div class="Alert-alert Alert-success">
        <div class="Alert-content">
          <h4 class="Alert-title">Sucesso</h4>
          <p class="Alert-message">Operação realizada.</p>
        </div>
      </div>
    </div>
    <pre>&lt;div class="Alert-alert Alert-success"&gt;...&lt;/div&gt;</pre>

    <hr>
    <p>Consulte a pasta <code>jsp-templates/</code> para exemplos de integração com JSTL.</p>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);
console.log(`✅ Documentation generated at ${path.join(DIST_DIR, 'index.html')}`);

console.log('🎉 Build Complete!');
