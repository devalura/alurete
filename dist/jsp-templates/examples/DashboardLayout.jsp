<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard - Alurete</title>
  <link rel="stylesheet" href="/assets/css/alurete/core.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/sidebar.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/card.css">
  <link rel="stylesheet" href="/assets/css/alurete/components/button.css">
</head>
<body class="bg-slate-50 flex h-screen">

  <!-- Sidebar -->
  <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
    <div class="p-6 border-b border-slate-100">
      <h1 class="text-xl font-bold text-blue-700">Alurete</h1>
    </div>
    <nav class="flex-1 p-4 space-y-1">
      <a href="/dashboard" class="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
        Dashboard
      </a>
      <a href="/courses" class="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50">
        Meus Cursos
      </a>
      <a href="/profile" class="flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-50">
        Perfil
      </a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 overflow-auto p-8">
    <header class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-slate-800">Visão Geral</h2>
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-600">Olá, ${user.name}</span>
        <div class="Avatar-avatar Avatar-size40 bg-blue-200"></div>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Cursos em andamento</p>
        <p class="text-3xl font-bold text-slate-800">4</p>
      </div>
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Certificados</p>
        <p class="text-3xl font-bold text-slate-800">12</p>
      </div>
      <div class="Card-card Card-default Card-padding-medium">
        <p class="text-sm text-slate-500 mb-1">Pontos</p>
        <p class="text-3xl font-bold text-slate-800">1,250</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <section>
      <h3 class="text-lg font-bold text-slate-700 mb-4">Atividade Recente</h3>
      <div class="Card-card Card-default">
        <!-- Table content would go here -->
        <div class="p-8 text-center text-slate-500">
          Nenhuma atividade recente.
        </div>
      </div>
    </section>
  </main>

</body>
</html>