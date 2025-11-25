<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Alert Component
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/alert.css">
-->

<c:if test="${not empty message}">
  <div class="Alert-alert Alert-${messageType}"> <!-- messageType: success, error, warning, info -->
    <div class="Alert-content">
      <h4 class="Alert-title"><c:out value="${messageTitle}" /></h4>
      <p class="Alert-message"><c:out value="${message}" /></p>
    </div>
  </div>
</c:if>