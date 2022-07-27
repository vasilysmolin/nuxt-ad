<template>
  <section>

    <div v-if="$device.isDesktop">
      <nav class="fixed top-[125px] left-5">
        <ul class="flex flex-col w-full sm:max-w-screen-sm">
          <NuxtLink to="/vacancies">
          <li class="block px-3 py-1 border-2 border-blue-600 text-blue-600 font-bold text-sm text-center rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Вакансии</li>
          </NuxtLink>
          <NuxtLink to="/resume">
          <li class="block mt-2.5 px-3 py-1 border-2 border-blue-600 text-blue-600 font-bold text-sm text-center rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Резюме</li>
          </NuxtLink>
        </ul>
      </nav>
    </div>

    <div v-if="$device.isMobile">
      <nav class="flex">
        <ul class="flex justify-start items-center w-full">
          <NuxtLink to="/vacancies">
            <li class="block px-3 py-1 border-2 border-blue-600 text-blue-600 font-bold text-sm text-center rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Вакансии</li>
          </NuxtLink>
          <NuxtLink to="/resume">
            <li class="block ml-3 px-3 py-1 border-2 border-blue-600 text-blue-600 font-bold text-sm text-center rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Резюме</li>
          </NuxtLink>
        </ul>
      </nav>
    </div>

  </section>

</template>


<script>
  export default {
    name: "NavLoc",
  }
</script>
