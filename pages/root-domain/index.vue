<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <h1 class="px-12 text-xl text-center font-black">Каталог обьявлений, вакансии и резюме, поиск исполнителя,
        доставка еды и создание ресторана</h1>
      <GoSearchDesktop/>
      <ListServicesIndex/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
          Создать аккаунт
        </nuxt-link>
      </p>
      <WhatsTapigo/>
      <BNewLetters/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
      <h1 class="text-center text-sm font-bold">Каталог объявлений, вакансии и резюме, поиск исполнителя и размещение
        услуг</h1>
      <div @click="showGoSearch">
        <SearchColorGlobalMobile/>
      </div>
      <ListServicesIndex/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">
          Создать аккаунт
        </nuxt-link>
      </p>
      <WhatsTapigo/>
      <BNewLetters/>
    </div>

  </section>
</template>

<script>
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesIndex from "../../components/ListServicesIndex";
import WhatsTapigo from "../../components/WhatsTapigo";
import BNewLetters from "../../components/blocks/BNewLetters";
import GoSearchDesktop from "../../components/GoSearchDesktop";


export default {
  components: {WhatsTapigo, ListServicesIndex, SearchColorGlobalMobile, BNewLetters, GoSearchDesktop},
  methods:
      {
        linkHub() {
          var host = window.location.host
          if (this.$auth.loggedIn) {
            document.location.href = `${process.env.HUB_URL}/profile`;
          } else {
            document.location.href = process.env.AUTH_URL;
          }
        },
        showGoSearch() {
          this.$modal.show('GoSearch');
        },
        // vacancies() {
        //   document.location.href = process.env.JOBS_URL + '/vacancies';
        // },
        // resume() {
        //   document.location.href = process.env.JOBS_URL + '/resume';
        // },
        // uslugi() {
        //   document.location.href = process.env.USLUGI_URL;
        // },
        // catalog() {
        //   document.location.href = process.env.CATALOG_URL;
        // },
      },

}
</script>
