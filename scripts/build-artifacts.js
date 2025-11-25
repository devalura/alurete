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

const logFile = path.join(__dirname, 'build.log');
function log(msg) {
  fs.appendFileSync(logFile, msg + '\n');
  console.log(msg);
}

log('🏗️  Starting Artifacts Build...');

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

// Add Global CSS
const globalsCssPath = path.join(STYLES_DIR, 'globals.css');
if (fs.existsSync(globalsCssPath)) {
  const globalsContent = fs.readFileSync(globalsCssPath, 'utf8');
  fullCssBundle += `/* --- Globals --- */\n${globalsContent}\n\n`;
  coreCssBundle += `/* --- Globals --- */\n${globalsContent}\n\n`;

  // Save standalone globals.css
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

const jspTemplates = {
  Button: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Button Component 
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/button.css">
-->

<!-- Primary Button -->
<button class="Button-button Button-primary Button-medium">
  <c:out value="\${label}" default="Salvar" />
</button>

<!-- Conditional Button -->
<c:if test="\${showButton}">
  <button class="Button-button Button-secondary Button-small">
    Cancelar
  </button>
</c:if>`,

  Card: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Card Component
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/card.css">
-->

<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-header">
    <h3><c:out value="\${cardTitle}" /></h3>
  </div>
  
  <div class="Card-content">
    <!-- Loop Example -->
    <c:forEach items="\${items}" var="item">
      <p><c:out value="\${item.name}" /></p>
    </c:forEach>
  </div>
</div>`,

  Alert: `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Alert Component
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/alert.css">
-->

<c:if test="\${not empty message}">
  <div class="Alert-alert Alert-\${messageType}"> <!-- messageType: success, error, warning, info -->
    <div class="Alert-content">
      <h4 class="Alert-title"><c:out value="\${messageTitle}" /></h4>
      <p class="Alert-message"><c:out value="\${message}" /></p>
    </div>
  </div>
</c:if>`
};

// Generate JSP templates
componentDirs.forEach(componentName => {
  const template = jspTemplates[componentName] || `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  ${componentName} Component
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/${componentName.toLowerCase()}.css">
-->

<div class="${componentName}-root">
  <!-- Conteúdo do ${componentName} -->
</div>`;

  fs.writeFileSync(path.join(jspTemplatesDir, `${componentName}.jsp`), template);
});

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
