const fs = require('fs');
const path = require('path');

/**
 * Build Script for Static Distribution
 * Generates a standalone CSS bundle for JSP/Spring applications
 */

const srcDir = path.join(__dirname, '../src/styles');
const distDir = path.join(__dirname, '../dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Read and concatenate CSS files
const tokensCSS = fs.readFileSync(path.join(srcDir, 'tokens.css'), 'utf8');
const componentsCSS = fs.readFileSync(path.join(srcDir, 'components.css'), 'utf8');

// Read individual component files
const componentFiles = [
    'components/button.css',
    'components/card.css',
    'components/alert.css',
    'components/badge.css',
    'components/input.css'
];

let allComponentsCSS = '';
componentFiles.forEach(file => {
    const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    allComponentsCSS += content + '\n\n';
});

// Create the bundle
const bundle = `/**
 * Alurete Design System - Static Distribution
 * Version: 1.0.0
 * Generated: ${new Date().toISOString()}
 * 
 * Usage in JSP/Spring:
 * <link rel="stylesheet" href="/css/alurete-design-system.css">
 */

${tokensCSS}

${allComponentsCSS}
`;

// Write the bundle
fs.writeFileSync(path.join(distDir, 'alurete-design-system.css'), bundle);

console.log('✅ Static CSS bundle created at dist/alurete-design-system.css');
console.log(`📦 Bundle size: ${(bundle.length / 1024).toFixed(2)} KB`);
