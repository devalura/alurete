# Alurete Design System - Artifacts

Este diretório contém os artefatos estáticos do Alurete Design System, prontos para serem consumidos por projetos Java/Spring/JSP.

---

## 🚀 Guia de Integração

Para instruções detalhadas de como usar o Alurete em projetos Java/Spring/JSP, consulte o guia dedicado:

👉 **[GUIA-INTEGRACAO-JSP.md](./GUIA-INTEGRACAO-JSP.md)**

Lá você encontrará:
- Setup do projeto Spring Boot
- Como usar CSS Modular
- Exemplos com JSTL e Spring Form Tags
- Troubleshooting

---

## 📦 Conteúdo do Pacote

```
dist/
├── css/                 # Arquivos CSS (Modular e Bundle)
├── jsp-templates/       # Snippets JSP prontos (Components, Patterns, Examples)
├── templates/           # Snippets HTML puro
├── index.html           # Documentação visual dos componentes
├── tokens.json          # Design tokens em JSON
└── GUIA-INTEGRACAO-JSP.md # Guia completo para devs Java
```

---

## 🔄 Atualizando os Artifacts

Este diretório é gerado automaticamente pelo comando:

```bash
npm run build:artifacts
```

**⚠️ Não edite os arquivos aqui manualmente.** Qualquer mudança será sobrescrita na próxima build.

---

## 📖 Documentação Visual

Abra o arquivo `index.html` neste diretório em um navegador para visualizar todos os componentes com exemplos interativos.

---

**Versão:** 0.1.0
**Gerado em:** 25/11/2025
