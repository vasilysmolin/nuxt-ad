<template>
  <main class="container box-border bg-slate-200">
    <h1 class="text-3xl font-bold underline">Vacancies List</h1>
    <NuxtLink :to="`/hub`">
      <button>Добавить вакансию</button>
    </NuxtLink>
    <NavLoc/>
    <VList/>
  </main>
</template>

<script>
export default {
  head: {
    title: "Бесплатно создавайте вакансии без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

