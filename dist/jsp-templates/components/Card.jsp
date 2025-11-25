<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/card.css"> -->

<!-- 1. Simple Card -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-content">
    <h3><c:out value="${title}" /></h3>
    <p><c:out value="${description}" /></p>
  </div>
</div>

<!-- 2. Course Card Example -->
<div class="Card-card Card-default Card-padding-medium">
  <div class="Card-header">
    <span class="Tag-tag Tag-primary Tag-small">${category}</span>
    <h3 style="margin-top: 8px;"><c:out value="${courseName}" /></h3>
  </div>
  
  <div class="Card-content">
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${progress}%"></div>
    </div>
    <p class="text-sm">${progress}% completo</p>
  </div>
  
  <div class="Card-footer">
    <a href="/course/${id}" class="Button-button Button-primary Button-small">Continuar</a>
  </div>
</div>