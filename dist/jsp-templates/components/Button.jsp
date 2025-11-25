<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/button.css"> -->

<!-- 1. Primary Button -->
<button class="Button-button Button-primary Button-medium">
  <c:out value="${label}" default="Salvar" />
</button>

<!-- 2. Button with Icon (using Lucide or similar) -->
<button class="Button-button Button-secondary Button-medium">
  <i class="icon-download" aria-hidden="true"></i> <!-- Exemplo de ícone -->
  <span>Download</span>
</button>

<!-- 3. Link Button -->
<a href="${url}" class="Button-button Button-link Button-medium">
  Esqueci minha senha
</a>

<!-- 4. Disabled State -->
<button class="Button-button Button-primary Button-medium" ${isDisabled ? 'disabled' : ''}>
  Processando...
</button>