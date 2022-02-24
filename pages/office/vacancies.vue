<template>
  <section>
    <NavLocRoot/>
    <section class="container flex flex-col items-center py-5">
      <ModerateContentListVacancy/>
      <HeaderContentList/>
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">

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

        <article class="office-content-list">
          <NuxtLink to="">
            <header class="flex justify-between text-xs font-bold text-gray-400">
              <p>24.02.2022<span class="pl-2">13:15</span></p>
              <p>ID<span>1222</span></p>
            </header>
            <h2 class="mt-1.5 font-bold leading-5">Специалист по кадрам</h2>
          </NuxtLink>
        </article>

        <article class="office-content-list">
          <NuxtLink to="">
            <header class="flex justify-between text-xs font-bold text-gray-400">
              <p>24.02.2022<span class="pl-2">13:15</span></p>
              <p>ID<span>1222</span></p>
            </header>
            <h2 class="mt-1.5 font-bold leading-5">Охранник</h2>
          </NuxtLink>
        </article>

      </section>
    </section>
  </section>
</template>


<script>
import NavLocRoot from "../../components/NavLocRoot";
import HeaderContentList from "../../components/HeaderContentList";
import ModerateContentListVacancy from "../../components/ModerateContentListVacancy";

export default {
  layout: 'office',
  components: {
    ModerateContentListVacancy,
    NavLocRoot,
    HeaderContentList
  }
}
</script>
