# Guia de Integração Alurete (JSP/Spring)

Este guia é a referência completa para integrar o Alurete Design System em projetos Java com Spring Boot e JSP.

---

## 1. Setup do Projeto

### Estrutura de Diretórios
O Alurete deve ser instalado na pasta de recursos estáticos do Spring Boot. A estrutura recomendada é:

```
src/main/resources/static/assets/css/alurete/
├── core.css              # ⚠️ Obrigatório (Tokens + Globals)
├── components/           # CSS Modular
│   ├── button.css
│   ├── card.css
│   ├── input.css
│   └── ...
└── alurete-full.css      # Bundle completo (Opcional, use com cautela)
```

### Configuração do Spring Security (Opcional)
Se você usa Spring Security, garanta que os assets estáticos sejam públicos:

```java
@Override
public void configure(WebSecurity web) {
    web.ignoring().antMatchers("/assets/**");
}
```

---

## 2. Importando CSS

Recomendamos a abordagem **modular** para manter suas páginas leves.

### No Layout Base (ex: `header.jsp`)
Importe o `core.css` que contém as variáveis de design e o reset global.

```jsp
<link rel="stylesheet" href="/assets/css/alurete/core.css">
```

### Nas Páginas Específicas
Importe apenas os componentes que a página utiliza.

**Exemplo: Página de Login**
```jsp
<link rel="stylesheet" href="/assets/css/alurete/components/card.css">
<link rel="stylesheet" href="/assets/css/alurete/components/input.css">
<link rel="stylesheet" href="/assets/css/alurete/components/button.css">
```

---

## 3. Trabalhando com JSTL e Spring Tags

O Alurete é agnóstico de tecnologia, mas funciona perfeitamente com as tags padrão do ecossistema Java.

### Formulários com Spring MVC
Use as classes do Alurete nas tags `<form:input>`, `<form:select>`, etc.

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div class="form-group">
    <form:label path="email" cssClass="text-sm font-bold text-slate-700">Email</form:label>
    
    <!-- Adicione classe de erro condicionalmente -->
    <form:input path="email" 
                cssClass="Input-input Input-medium ${status.error ? 'Input-error' : ''}" 
                placeholder="seu@email.com" />
                
    <form:errors path="email" cssClass="text-red-600 text-xs mt-1" />
</div>
```

### Listas e Loops (c:forEach)
Ideal para renderizar cards ou tabelas.

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="grid grid-cols-3 gap-4">
    <c:forEach items="${produtos}" var="produto">
        <div class="Card-card Card-default Card-padding-small">
            <div class="Card-content">
                <h3><c:out value="${produto.nome}" /></h3>
                <p>R$ <fmt:formatNumber value="${produto.preco}" type="currency" /></p>
            </div>
        </div>
    </c:forEach>
</div>
```

### Condicionais (c:if)
Use para exibir alertas ou estados vazios.

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

## 4. Mapeamento: React Props → Classes CSS

Use esta tabela para traduzir os componentes da documentação React para classes CSS.

### Button
| React Prop | Classe CSS |
|------------|------------|
| `variant="primary"` | `.Button-primary` |
| `variant="secondary"` | `.Button-secondary` |
| `variant="ghost"` | `.Button-ghost` |
| `size="small"` | `.Button-small` |
| `size="medium"` | `.Button-medium` |
| `disabled` | Adicionar atributo `disabled` no HTML |

### Card
| React Prop | Classe CSS |
|------------|------------|
| `variant="default"` | `.Card-default` |
| `padding="medium"` | `.Card-padding-medium` |
| `border="subtle"` | `.Card-border-subtle` |

### Input
| React Prop | Classe CSS |
|------------|------------|
| `size="medium"` | `.Input-medium` |
| `error={true}` | `.Input-error` |

---

## 5. Troubleshooting Comum

### O CSS não carrega (404)
- Verifique se a pasta `assets` está dentro de `src/main/resources/static/`.
- Confirme se o caminho no `<link>` começa com `/`.
- Se usar Spring Security, verifique as regras de permissão.

### Classes não aplicam estilo
- Garanta que importou o `core.css` **antes** dos componentes.
- Verifique se não há CSS legado sobrescrevendo as regras (use o Inspecionar Elemento).

### Ícones não aparecem
- O Alurete não inclui ícones por padrão. Recomendamos usar **Lucide Icons** ou **FontAwesome**.
- Exemplo: `<i class="fa fa-user"></i>` dentro de um botão.

---

## 6. Exemplos Prontos

Consulte a pasta `dist/jsp-templates/` para snippets prontos de:
- **Login Form** (`patterns/LoginForm.jsp`)
- **Dashboard** (`examples/DashboardLayout.jsp`)
- **Tabela Paginada** (`patterns/Pagination.jsp`)

---

**Dúvidas?** Consulte a documentação visual em `dist/index.html`.
