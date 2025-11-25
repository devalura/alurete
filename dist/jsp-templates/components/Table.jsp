<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Import CSS: core.css + button.css + tag.css -->

<table class="w-full text-left border-collapse">
  <thead>
    <tr class="border-b border-gray-200">
      <th class="p-4 font-bold text-gray-700">Nome</th>
      <th class="p-4 font-bold text-gray-700">Status</th>
      <th class="p-4 font-bold text-gray-700">Ações</th>
    </tr>
  </thead>
  <tbody>
    <c:forEach items="${users}" var="user">
      <tr class="border-b border-gray-100 hover:bg-gray-50">
        <td class="p-4"><c:out value="${user.name}" /></td>
        <td class="p-4">
          <span class="Tag-tag Tag-small ${user.active ? 'Tag-success' : 'Tag-secondary'}">
            ${user.active ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        <td class="p-4">
          <a href="/users/${user.id}" class="Button-button Button-ghost Button-small">Editar</a>
        </td>
      </tr>
    </c:forEach>
  </tbody>
</table>