<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 
  Card Component
  Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/card.css">
-->

<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-header">
    <h3><c:out value="${cardTitle}" /></h3>
  </div>
  
  <div class="Card-content">
    <!-- Loop Example -->
    <c:forEach items="${items}" var="item">
      <p><c:out value="${item.name}" /></p>
    </c:forEach>
  </div>
</div>