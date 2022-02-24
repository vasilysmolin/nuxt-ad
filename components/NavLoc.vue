<template>
  <nav class="container flex flex-col items-center mt-[80px]">
    <ul class="flex justify-start w-[95%] sm:max-w-screen-sm">
      <NuxtLink to="/vacancies">
      <li class="inline-block px-3 py-1.5 border-2 border-blue-600 text-blue-600 font-bold text-sm rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Вакансии</li>
      </NuxtLink>
      <NuxtLink to="/resume">
      <li class="inline-block ml-3 px-3 py-1.5 border-2 border-blue-600 text-blue-600 font-bold text-sm rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Резюме</li>
      </NuxtLink>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "NavLoc",
}

</script>
