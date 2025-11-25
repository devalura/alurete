<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="Card-card Card-default Card-padding-large" style="max-width: 400px; margin: 0 auto;">
  <div class="Card-header text-center mb-6">
    <h2 class="text-2xl font-bold text-blue-700">Login</h2>
    <p class="text-gray-500">Acesse sua conta</p>
  </div>

  <form action="/login" method="post">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input type="email" name="username" class="Input-input Input-medium w-full" required />
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
      <input type="password" name="password" class="Input-input Input-medium w-full" required />
    </div>

    <button type="submit" class="Button-button Button-primary Button-medium w-full justify-center">
      Entrar
    </button>
    
    <div class="mt-4 text-center">
      <a href="/forgot-password" class="Button-button Button-link Button-small">Esqueci minha senha</a>
    </div>
  </form>
</div>