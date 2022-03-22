<template>
  <nav class="container mt-[80px] sm:pl-0">
    <ul class="hub-nav flex justify-start sm:justify-center flex-nowrap pb-1 w-full text-sm sm:text-base text-[#6E7191] font-bold">
      <li class="pl-4"><NuxtLink to="/profile" class="hub-nav-active">Профиль</NuxtLink></li>
      <li class="pl-4 sm:pl-6"><NuxtLink to="">Обьявления</NuxtLink></li>
      <li class="pl-4 sm:pl-6"><NuxtLink to="/vacancies">Вакансии</NuxtLink></li>
      <!-- для физика
      <li class="pl-4 sm:pl-6"><NuxtLink to="/resume">Резюме</NuxtLink></li>
      -->
      <li class="pl-4 sm:pl-6"><NuxtLink to="">Услуги</NuxtLink></li>
      <li class="px-4 sm:pl-6"><NuxtLink to="">Рестораны</NuxtLink></li>
      <!-- для физика
      <li class="pl-4 sm:pl-6"><NuxtLink to="">Еда</NuxtLink></li>
      -->
    </ul>
  </nav>
</template>


<script>
export default {
  name: "NavLocProfile",
}

</script>
