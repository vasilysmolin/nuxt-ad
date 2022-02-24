<template>
  <section class="flex flex-col mb-5 w-[95%] sm:max-w-screen-sm">

    <div class="flex">
      <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-sm"><span class="pr-1">2</span>вакансии на модерацию</span>
    </div>

    <article class="office-content-list">
      <NuxtLink to="vacancy">
        <header class="flex justify-between text-xs font-bold text-gray-400">
          <p>24.02.2022<span class="pl-2">13:15</span></p>
          <p>ID<span>1222</span></p>
        </header>
        <h2 class="mt-1.5 font-bold leading-5">Менеджер продаж медицинских материалов</h2>
      </NuxtLink>
    </article>

    <article class="office-content-list">
      <NuxtLink to="">
        <header class="flex justify-between text-xs font-bold text-gray-400">
          <p>24.02.2022<span class="pl-2">13:15</span></p>
          <p>ID<span>1222</span></p>
        </header>
        <h2 class="mt-1.5 font-bold leading-5">Секретарь в агентство недвижимости</h2>
      </NuxtLink>
    </article>

  </section>
</template>

<script>
export default {
  name: "ModerateContentListVacancy"
}
</script>
