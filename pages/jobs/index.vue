<template>

  <section class="container flex flex-col justify-center items-center mt-[70px] pb-[80px]">
    <div v-if="$device.isDesktop" class="">
    <h1 class="px-5 text-3xl text-center font-black">Вакансии и резюме<span class="mt-2 block font-normal text-gray-600 text-xl">Бесплатно создавайте вакансии и резюме без ограничений.</span></h1>

    <p @click="linkHub">
      <nuxt-link to="" class="btn btn-primary inline-block mt-8 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
      </nuxt-link>
    </p>

    <section class="mt-10 flex flex-col items-center w-full">
      <article class="mt-[10px] grid grid-cols-[40%,_1fr] p-3 w-full rounded-lg bg-white">

        <section class="">
            <img class="w-full rounded-lg bg-blue-400" src="../../assets/img/vacancy.jpg" alt="Вакансии">
        </section>

        <section class="flex flex-col justify-center p-5">
          <h2><nuxt-link to="/vacancies" class="font-bold text-[25px] border-b-[1px] border-gray-400 hover:text-blue-700">Вакансии</nuxt-link></h2>
          <h3 class="mt-3">Создавайте неограниченное количество бесплатных вакансий для своей компании. Делегируйте контроль или размещение своему представителю.</h3>
          <p @click="linkHub">
            <nuxt-link to="" class="inline-block mt-7 px-6 py-2 border-2 border-blue-900 text-blue-900 font-bold text-sm leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить вакансию</nuxt-link></p>
        </section>
      </article>

      <div class="mt-12 w-[6px] h-[6px] rounded-full bg-black"></div>
      <p class="mt-8 px-10 text-center font-light text-2xl leading-8">Любовь и работа &mdash; единственные стоящие вещи в жизни. Работа &mdash; это своеобразная форма любви.</p>
      <p class="block mt-2 mb-8 text-center font-light font-normal">Мерилин Монро</p>
      <div class="mb-12 w-[6px] h-[6px] rounded-full bg-black"></div>

      <article class="mt-[10px] grid grid-cols-[40%,_1fr] p-3 w-full rounded-lg bg-white">

        <section class="">
          <img class="w-full rounded-lg bg-blue-400" src="../../assets/img/resume.jpg" alt="Резюме">
        </section>

        <section class="flex flex-col justify-center p-5">
          <h2><nuxt-link to="/resume" class="font-bold text-[25px] border-b-[1px] border-gray-400 hover:text-blue-700">Резюме</nuxt-link></h2>
          <h3 class="mt-3">Размещайте без ограничений бесплатные резюме для поиска работы. Получайте приглашения на собеседования сразу на Тапиго.</h3>
          <p @click="linkHub">
            <nuxt-link to="" class="inline-block mt-7 px-6 py-2 border-2 border-blue-900 text-blue-900 font-bold text-sm leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Разместить резюме</nuxt-link></p>
        </section>
      </article>
    </section>
    </div>

    <div v-if="$device.isMobile" class="px-[20px] w-full flex flex-col items-center">
      <h1 class="text-center text-base font-black">Работа</h1>
      <h2 class="text-center text-sm">Бесплатно создавайте вакансии или резюме без ограничений</h2>
      <div @click="showGoSearch">
        <SearchColorGlobalMobile/>
      </div>
      <ListServicesJobs/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to="" class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">Создать аккаунт
        </nuxt-link>
      </p>
      <WhatsTapigo/>
    </div>

  </section>
</template>

<script>
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesJobs from "../../components/ListServicesJobs";
export default {
  components: {SearchColorGlobalMobile, ListServicesJobs, WhatsTapigo},
  head: {
    title: "Бесплатно создавайте вакансии и резюме без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  methods: {
    linkHub() {
      var host = window.location.host
      if(this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/profile`;
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    showGoSearch () {
      this.$modal.show('GoSearch');
    },
  }
}
</script>
