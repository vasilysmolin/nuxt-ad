<template>
  <nav class="container mt-[80px] sm:pl-0">
    <ul class="office-nav flex justify-start sm:justify-center flex-nowrap py-1.5 w-full text-sm sm:text-base text-[#6E7191] font-bold">
      <li class="relative pl-4 flex flex-col items-center">
        <span class="office-nav-marker"></span>
        <NuxtLink to="" class="office-nav-active">Вакансии</NuxtLink>
      </li>
      <li class=" relative pl-4 sm:pl-6 flex flex-col items-center">
        <span class="office-nav-marker"></span>
        <NuxtLink to="">Резюме</NuxtLink>
      </li>
      <li class="relative pl-4 sm:pl-6 flex flex-col items-center">
        <NuxtLink to="">Услуги</NuxtLink>
      </li>
      <li class="relative pl-4 sm:pl-6 flex flex-col items-center">
        <NuxtLink to="">Объявления</NuxtLink>
      </li>
      <li class="relative px-4 sm:pl-6 flex flex-col items-center">
        <span class="office-nav-marker"></span>
        <NuxtLink to="">Пользователи</NuxtLink>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "NavLocRoot",
}

</script>
