<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Button Component 
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/button.css">
-->

<!-- Primary Button -->
<button class="Button-button Button-primary Button-medium">
  <c:out value="${label}" default="Salvar" />
</button>

<!-- Conditional Button -->
<c:if test="${showButton}">
  <button class="Button-button Button-secondary Button-small">
    Cancelar
  </button>
</c:if>