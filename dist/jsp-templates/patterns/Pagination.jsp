<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Pagination Pattern -->
<div class="flex items-center justify-between mt-6">
  <span class="text-sm text-gray-600">
    Mostrando ${page.start} a ${page.end} de ${page.total} resultados
  </span>

  <div class="flex gap-2">
    <c:if test="${page.hasPrevious}">
      <a href="?page=${page.current - 1}" class="Button-button Button-secondary Button-small">Anterior</a>
    </c:if>
    
    <c:forEach begin="1" end="${page.totalPages}" var="i">
      <a href="?page=${i}" 
         class="Button-button Button-small ${page.current == i ? 'Button-primary' : 'Button-ghost'}">
        ${i}
      </a>
    </c:forEach>

    <c:if test="${page.hasNext}">
      <a href="?page=${page.current + 1}" class="Button-button Button-secondary Button-small">Próximo</a>
    </c:if>
  </div>
</div>