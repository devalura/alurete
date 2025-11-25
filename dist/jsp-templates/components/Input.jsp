<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<!-- Import CSS: <link rel="stylesheet" href="/assets/css/alurete/components/input.css"> -->

<!-- 1. Standard Input -->
<div class="form-group">
  <label for="email" class="text-sm font-bold">Email</label>
  <input type="email" id="email" name="email" class="Input-input Input-medium" placeholder="seu@email.com" />
</div>

<!-- 2. Input with Error (Spring Form) -->
<div class="form-group">
  <form:label path="username" cssClass="text-sm font-bold">Usuário</form:label>
  <form:input path="username" cssClass="Input-input Input-medium ${status.error ? 'Input-error' : ''}" />
  <form:errors path="username" cssClass="text-red-600 text-xs mt-1" />
</div>