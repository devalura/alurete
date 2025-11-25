<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/alert.css"> -->

<!-- 1. Flash Message Alert -->
<c:if test="${not empty flashMessage}">
  <div class="Alert-alert Alert-${flashType}"> <!-- success, error, warning, info -->
    <div class="Alert-content">
      <h4 class="Alert-title"><c:out value="${flashTitle}" /></h4>
      <p class="Alert-message"><c:out value="${flashMessage}" /></p>
    </div>
  </div>
</c:if>