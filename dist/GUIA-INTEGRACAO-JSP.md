# Guia de Integração Alurete (JSP/Spring)

Este guia explica como integrar o Alurete Design System em projetos Java/Spring com JSP.

---

## 1. Instalação

Copie a pasta `dist/css` para o diretório de assets estáticos do seu projeto Spring Boot:

**Origem:** `dist/css/`  
**Destino:** `src/main/resources/static/assets/css/alurete/`

A estrutura final deve ficar assim:

```
src/main/resources/static/assets/css/alurete/
├── core.css            # Tokens + Globals (Obrigatório)
├── alurete-full.css    # Bundle completo (Opcional)
└── components/         # CSS modular (Recomendado)
    ├── button.css
    ├── card.css
    ├── input.css
    └── ...
```

---

## 2. Importando o CSS

Recomendamos a abordagem **modular** para evitar carregar CSS desnecessário.

### No `<head>` do seu layout principal (ex: `header.jsp`):

```jsp
<!-- Core Styles (Obrigatório em todas as páginas) -->
<link rel="stylesheet" href="/assets/css/alurete/core.css">
```

### Nas páginas específicas:

Importe apenas os componentes que a página utiliza:

```jsp
<!-- Exemplo: Página de Login -->
<link rel="stylesheet" href="/assets/css/alurete/components/card.css">
<link rel="stylesheet" href="/assets/css/alurete/components/input.css">
<link rel="stylesheet" href="/assets/css/alurete/components/button.css">
```

---

## 3. Usando Componentes com JSTL

Os componentes do Alurete são apenas HTML + CSS. Você pode usar JSTL (`c:if`, `c:forEach`, etc.) livremente para adicionar lógica.

### Exemplo: Lista de Cards

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS -->
<link rel="stylesheet" href="/assets/css/alurete/components/card.css">
<link rel="stylesheet" href="/assets/css/alurete/components/tag.css">

<div class="cards-grid">
    <c:forEach items="${cursos}" var="curso">
        <div class="Card-card Card-default Card-padding-medium">
            <div class="Card-header">
                <!-- Título do Curso -->
                <h3><c:out value="${curso.nome}" /></h3>
                
                <!-- Tag de Categoria -->
                <span class="Tag-tag Tag-primary Tag-small">
                    <c:out value="${curso.categoria}" />
                </span>
            </div>
            
            <div class="Card-content">
                <p><c:out value="${curso.descricao}" /></p>
            </div>
            
            <div class="Card-footer">
                <a href="/curso/${curso.id}" class="Button-button Button-primary Button-small">
                    Acessar
                </a>
            </div>
        </div>
    </c:forEach>
</div>
```

### Exemplo: Alerta de Erro Condicional

```jsp
<!-- Import CSS -->
<link rel="stylesheet" href="/assets/css/alurete/components/alert.css">

<c:if test="${not empty errorMessage}">
    <div class="Alert-alert Alert-error">
        <div class="Alert-content">
            <h4 class="Alert-title">Erro</h4>
            <p class="Alert-message"><c:out value="${errorMessage}" /></p>
        </div>
    </div>
</c:if>
```

---

## 4. Mapeamento: React Props → Classes CSS

Use esta tabela para traduzir os componentes do React para classes CSS:

### Button
| React Prop | Classe CSS |
|------------|------------|
| `variant="primary"` | `.Button-primary` |
| `variant="secondary"` | `.Button-secondary` |
| `size="small"` | `.Button-small` |
| `size="medium"` | `.Button-medium` |

### Card
| React Prop | Classe CSS |
|------------|------------|
| `variant="default"` | `.Card-default` |
| `padding="medium"` | `.Card-padding-medium` |
| `border="subtle"` | `.Card-border-subtle` |

### Tag
| React Prop | Classe CSS |
|------------|------------|
| `variant="success"` | `.Tag-success` |
| `size="small"` | `.Tag-small` |

---

## 5. Templates Prontos

Consulte a pasta `dist/jsp-templates/` para ver snippets de código prontos para copiar e colar.

---

**Dúvidas?** Consulte a documentação visual em `dist/index.html`.
