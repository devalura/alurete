const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const SRC_DIR = path.join(__dirname, '../src');
const STYLES_DIR = path.join(SRC_DIR, 'styles');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🏗️  Starting Artifacts Build...');

// 1. Copy Tokens
console.log('🎨 Copying Design Tokens...');
const tokensSrc = path.join(__dirname, '../design-tokens.json');
if (fs.existsSync(tokensSrc)) {
    fs.copyFileSync(tokensSrc, path.join(DIST_DIR, 'tokens.json'));
}

// 2. Build CSS Bundle
console.log('💅 Building CSS Bundle...');

let cssBundle = '/* Alurete Design System - Static Bundle */\n\n';

// Add Tokens CSS
const tokensCssPath = path.join(STYLES_DIR, 'tokens.css');
if (fs.existsSync(tokensCssPath)) {
    cssBundle += `/* --- Tokens --- */\n`;
    cssBundle += fs.readFileSync(tokensCssPath, 'utf8') + '\n\n';
}

// Add Global CSS
const globalsCssPath = path.join(STYLES_DIR, 'globals.css');
if (fs.existsSync(globalsCssPath)) {
    cssBundle += `/* --- Globals --- */\n`;
    cssBundle += fs.readFileSync(globalsCssPath, 'utf8') + '\n\n';
}

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

            cssBundle += `/* --- Component: ${componentName} --- */\n`;
            cssBundle += namespacedCss + '\n\n';
        }
    });
});

fs.writeFileSync(path.join(DIST_DIR, 'alurete.css'), cssBundle);
console.log(`✅ CSS Bundle generated at ${path.join(DIST_DIR, 'alurete.css')}`);

// 3. Generate HTML Snippets
console.log('📝 Generating HTML Snippets...');
const snippetsDir = path.join(DIST_DIR, 'templates');
if (!fs.existsSync(snippetsDir)) {
    fs.mkdirSync(snippetsDir);
}

// Component templates with real examples
const componentTemplates = {
    Button: `<!-- Button Component -->
<!-- Variants: primary, secondary, ghost, link -->
<!-- Sizes: small, medium, large -->

<!-- Primary Button (Medium) -->
<button class="Button-button Button-primary Button-medium">
  Salvar
</button>

<!-- Secondary Button (Small) -->
<button class="Button-button Button-secondary Button-small">
  Cancelar
</button>

<!-- Ghost Button (Large) -->
<button class="Button-button Button-ghost Button-large">
  Detalhes
</button>

<!-- Link Button -->
<button class="Button-button Button-link Button-medium">
  Saiba mais
</button>`,

    Card: `<!-- Card Component -->
<!-- Variants: default, secondary -->
<!-- Padding: none, small, medium, large -->
<!-- Border: default, subtle -->

<!-- Card with Medium Padding -->
<div class="Card-card Card-default Card-padding-medium Card-border-default">
  <div class="Card-content">
    <h3>Título do Card</h3>
    <p>Conteúdo do card aqui.</p>
  </div>
</div>

<!-- Card with Header and Footer -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-header">
    <h3>Header</h3>
  </div>
  <div class="Card-content">
    <p>Conteúdo principal</p>
  </div>
  <div class="Card-footer">
    <button class="Button-button Button-primary Button-small">Ação</button>
  </div>
</div>`,

    Input: `<!-- Input Component -->
<!-- Sizes: small, medium, large -->
<!-- States: error (add Input-error for validation errors) -->

<!-- Basic Input (Medium) -->
<input 
  type="text" 
  class="Input-input Input-medium" 
  placeholder="Digite seu nome..."
/>

<!-- Large Input -->
<input 
  type="email" 
  class="Input-input Input-large" 
  placeholder="seu@email.com"
/>

<!-- Input with Error -->
<input 
  type="text" 
  class="Input-input Input-medium Input-error" 
  placeholder="Campo obrigatório"
/>`,

    Alert: `<!-- Alert Component -->
<!-- Variants: success, error, warning, info -->

<!-- Success Alert -->
<div class="Alert-alert Alert-success">
  <div class="Alert-content">
    <div class="Alert-headerRow">
      <div class="Alert-titleSection">
        <h4 class="Alert-title">Sucesso!</h4>
      </div>
    </div>
    <p class="Alert-message">Sua operação foi concluída com sucesso.</p>
  </div>
</div>

<!-- Error Alert -->
<div class="Alert-alert Alert-error">
  <div class="Alert-content">
    <div class="Alert-headerRow">
      <div class="Alert-titleSection">
        <h4 class="Alert-title">Erro</h4>
      </div>
    </div>
    <p class="Alert-message">Ocorreu um erro ao processar sua solicitação.</p>
  </div>
</div>`,

    Avatar: `<!-- Avatar Component -->
<!-- Sizes: size24, size32, size40, size110 -->

<!-- Small Avatar (40px) -->
<div class="Avatar-avatar Avatar-size40">
  <img src="avatar.jpg" alt="User Avatar" class="Avatar-image" />
</div>

<!-- Large Avatar (110px) -->
<div class="Avatar-avatar Avatar-size110">
  <img src="avatar.jpg" alt="User Avatar" class="Avatar-image" />
</div>`,

    Tag: `<!-- Tag Component -->
<!-- Variants: primary, secondary, success, warning, error -->
<!-- Sizes: small, medium, large -->

<!-- Primary Tag -->
<span class="Tag-tag Tag-primary Tag-medium">
  Nova Feature
</span>

<!-- Success Tag -->
<span class="Tag-tag Tag-success Tag-small">
  Ativo
</span>

<!-- Error Tag -->
<span class="Tag-tag Tag-error Tag-medium">
  Urgente
</span>`,

    Checkbox: `<!-- Checkbox Component -->
<label class="Checkbox-container">
  <input type="checkbox" class="Checkbox-checkbox" />
  <span class="Checkbox-label">Aceito os termos</span>
</label>`,

    Radio: `<!-- Radio Component -->
<label class="Radio-container">
  <input type="radio" name="option" class="Radio-radio" />
  <span class="Radio-label">Opção 1</span>
</label>

<label class="Radio-container">
  <input type="radio" name="option" class="Radio-radio" />
  <span class="Radio-label">Opção 2</span>
</label>`
};

// Generate templates for each component
componentDirs.forEach(componentName => {
    const template = componentTemplates[componentName] || `<!-- ${componentName} Component -->
<!-- Consulte a documentação completa em index.html -->

<div class="${componentName}-root">
  <!-- Conteúdo do ${componentName} -->
</div>`;

    fs.writeFileSync(path.join(snippetsDir, `${componentName}.html`), template);
});

console.log(`✅ HTML Snippets generated in ${snippetsDir}`);

// 4. Generate index.html documentation
console.log('📚 Generating Documentation (index.html)...');

const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alurete Design System - Documentação</title>
  <link rel="stylesheet" href="alurete.css">
  <style>
    body {
      font-family: var(--font-family-sans);
      line-height: 1.6;
      margin: 0;
      padding: 40px 20px;
      background: #f8fafc;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: var(--color-brand-default);
      border-bottom: 3px solid var(--color-brand-default);
      padding-bottom: 16px;
      margin-bottom: 32px;
    }
    h2 {
      color: var(--color-text-title);
      margin-top: 48px;
      margin-bottom: 24px;
      border-left: 4px solid var(--color-brand-default);
      padding-left: 16px;
    }
    .component-demo {
      background: #f8fafc;
      padding: 32px;
      border-radius: 8px;
      margin: 24px 0;
      border: 1px solid #e2e8f0;
    }
    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 16px 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }
    .variant-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin: 16px 0;
    }
    .info-box {
      background: #dbeafe;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid var(--color-brand-default);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Alurete Design System</h1>
    <p><strong>Documentação dos Artifacts Estáticos</strong> para uso em projetos Java/Spring/JSP</p>

    <div class="info-box">
      <strong>📦 Como usar:</strong> Importe o arquivo <code>alurete.css</code> no seu projeto e use as classes CSS diretamente no HTML/JSP.
    </div>

    <!-- Button -->
    <h2>Button</h2>
    <p>Botões com diferentes variantes e tamanhos.</p>
    <div class="component-demo">
      <div class="variant-row">
        <button class="Button-button Button-primary Button-small">Small Primary</button>
        <button class="Button-button Button-primary Button-medium">Medium Primary</button>
        <button class="Button-button Button-primary Button-large">Large Primary</button>
      </div>
      <div class="variant-row">
        <button class="Button-button Button-secondary Button-medium">Secondary</button>
        <button class="Button-button Button-ghost Button-medium">Ghost</button>
        <button class="Button-button Button-link Button-medium">Link</button>
      </div>
    </div>
    <div class="code-block">&lt;button class="Button-button Button-primary Button-medium"&gt;
  Salvar
&lt;/button&gt;</div>

    <!-- Card -->
    <h2>Card</h2>
    <p>Containers para agrupar conteúdo relacionado.</p>
    <div class="component-demo">
      <div class="Card-card Card-default Card-padding-medium Card-border-default" style="max-width: 400px;">
        <div class="Card-content">
          <h3 style="margin-top: 0;">Título do Card</h3>
          <p>Este é um exemplo de card com padding médio e borda padrão.</p>
          <button class="Button-button Button-primary Button-small">Ação</button>
        </div>
      </div>
    </div>
    <div class="code-block">&lt;div class="Card-card Card-default Card-padding-medium"&gt;
  &lt;div class="Card-content"&gt;
    Conteúdo aqui
  &lt;/div&gt;
&lt;/div&gt;</div>

    <!-- Alert -->
    <h2>Alert</h2>
    <p>Mensagens de feedback para o usuário.</p>
    <div class="component-demo">
      <div class="Alert-alert Alert-success" style="margin-bottom: 16px;">
        <div class="Alert-content">
          <div class="Alert-headerRow">
            <div class="Alert-titleSection">
              <h4 class="Alert-title">Sucesso!</h4>
            </div>
          </div>
          <p class="Alert-message">Operação realizada com sucesso.</p>
        </div>
      </div>
      <div class="Alert-alert Alert-error">
        <div class="Alert-content">
          <div class="Alert-headerRow">
            <div class="Alert-titleSection">
              <h4 class="Alert-title">Erro</h4>
            </div>
          </div>
          <p class="Alert-message">Ocorreu um erro ao processar sua solicitação.</p>
        </div>
      </div>
    </div>
    <div class="code-block">&lt;div class="Alert-alert Alert-success"&gt;
  &lt;div class="Alert-content"&gt;
    &lt;h4 class="Alert-title"&gt;Sucesso!&lt;/h4&gt;
    &lt;p class="Alert-message"&gt;Mensagem aqui&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</div>

    <!-- Tag -->
    <h2>Tag</h2>
    <p>Tags para categorização e status.</p>
    <div class="component-demo">
      <div class="variant-row">
        <span class="Tag-tag Tag-primary Tag-medium">Primary</span>
        <span class="Tag-tag Tag-secondary Tag-medium">Secondary</span>
        <span class="Tag-tag Tag-success Tag-medium">Success</span>
        <span class="Tag-tag Tag-warning Tag-medium">Warning</span>
        <span class="Tag-tag Tag-error Tag-medium">Error</span>
      </div>
    </div>
    <div class="code-block">&lt;span class="Tag-tag Tag-primary Tag-medium"&gt;
  Nova Feature
&lt;/span&gt;</div>

    <!-- Input -->
    <h2>Input</h2>
    <p>Campos de entrada de texto.</p>
    <div class="component-demo">
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
        <input type="text" class="Input-input Input-small" placeholder="Small input" />
        <input type="text" class="Input-input Input-medium" placeholder="Medium input" />
        <input type="text" class="Input-input Input-large" placeholder="Large input" />
      </div>
    </div>
    <div class="code-block">&lt;input 
  type="text" 
  class="Input-input Input-medium" 
  placeholder="Digite aqui..."
/&gt;</div>

    <!-- Avatar -->
    <h2>Avatar</h2>
    <p>Imagens de perfil do usuário.</p>
    <div class="component-demo">
      <div class="variant-row">
        <div class="Avatar-avatar Avatar-size24" style="background: #dbeafe;"></div>
        <div class="Avatar-avatar Avatar-size32" style="background: #dbeafe;"></div>
        <div class="Avatar-avatar Avatar-size40" style="background: #dbeafe;"></div>
        <div class="Avatar-avatar Avatar-size110" style="background: #dbeafe;"></div>
      </div>
    </div>
    <div class="code-block">&lt;div class="Avatar-avatar Avatar-size40"&gt;
  &lt;img src="avatar.jpg" alt="User" class="Avatar-image" /&gt;
&lt;/div&gt;</div>

    <hr style="margin: 48px 0; border: none; border-top: 2px solid #e2e8f0;">

    <h2>📚 Recursos Adicionais</h2>
    <ul>
      <li><strong>README.md</strong> - Guia completo de uso</li>
      <li><strong>templates/</strong> - Snippets HTML prontos para copiar</li>
      <li><strong>tokens.json</strong> - Design tokens exportados</li>
    </ul>

    <div class="info-box">
      <strong>🔄 Atualização:</strong> Este arquivo é gerado automaticamente. Para atualizar, rode <code>npm run build:artifacts</code> no projeto Next.js.
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);
console.log(`✅ Documentation generated at ${path.join(DIST_DIR, 'index.html')}`);

console.log('🎉 Build Complete!');
