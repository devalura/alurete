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

// 2. Build CSS Bundle
console.log('💅 Building CSS Bundle...');

let cssBundle = '/* Alurete Design System - Static Bundle */\n\n';

// Add Tokens CSS
const tokensCssPath = path.join(STYLES_DIR, 'tokens.css');
if (fs.existsSync(tokensCssPath)) {
    cssBundle += `/* --- Tokens --- */\n`;
    cssBundle += fs.readFileSync(tokensCssPath, 'utf8') + '\n\n';
}

// Add Global CSS (excluding Tailwind directives if they cause issues, but we might need them)
// For now, we'll include globals.css but we might need to be careful if it relies on PostCSS processing
const globalsCssPath = path.join(STYLES_DIR, 'globals.css');
if (fs.existsSync(globalsCssPath)) {
    cssBundle += `/* --- Globals --- */\n`;
    // We might want to filter out @tailwind directives if we are not running postcss here
    // But for now let's include it. If the user wants the *compiled* tailwind, we need to run postcss.
    // Since we are running this as a node script, we can't easily run the full postcss pipeline without dependencies.
    // However, for the "Legacy" part, we mostly care about the custom component styles.
    // Let's assume the user handles the Tailwind reset separately or we include a basic reset.
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

            // Namespace the classes
            // Regex to find class selectors and prepend ComponentName
            // This is a naive implementation but should work for most cases
            // It looks for .className and replaces it with .ComponentName-className
            // We need to avoid replacing inside comments or @media blocks incorrectly (though regex usually handles simple cases)

            // Regex to find class selectors and prepend ComponentName
            // We use a stricter regex to avoid matching decimal numbers (e.g. 1.5)
            // CSS class names must start with a letter, underscore, or hyphen (followed by letter/underscore)
            // Simplified: \.[a-zA-Z_-][\w-]*

            const namespacedCss = cssContent.replace(/\.([a-zA-Z_-][\w-]*)/g, (match, className) => {
                // Skip if it's already namespaced (unlikely) or if it's a known global helper
                return `.${componentName}-${className}`;
            });

            cssBundle += `/* --- Component: ${componentName} --- */\n`;
            cssBundle += namespacedCss + '\n\n';
        }
    });
});

fs.writeFileSync(path.join(DIST_DIR, 'alurete.css'), cssBundle);
console.log(`✅ CSS Bundle generated at ${path.join(DIST_DIR, 'alurete.css')}`);

// 3. Generate HTML Snippets (Placeholder)
console.log('📝 Generating HTML Snippets...');
const snippetsDir = path.join(DIST_DIR, 'templates');
if (!fs.existsSync(snippetsDir)) {
    fs.mkdirSync(snippetsDir);
}

componentDirs.forEach(componentName => {
    // Create a basic HTML file for each component
    const snippetContent = `<!-- 
  Component: ${componentName}
  Usage: Copy the HTML below and adjust the classes.
  Classes are namespaced: .${componentName}-[variant]
-->

<div class="${componentName}-root">
  <!-- Content for ${componentName} -->
</div>
`;
    fs.writeFileSync(path.join(snippetsDir, `${componentName}.html`), snippetContent);
});

console.log(`✅ HTML Snippets generated in ${snippetsDir}`);
console.log('🎉 Build Complete!');
