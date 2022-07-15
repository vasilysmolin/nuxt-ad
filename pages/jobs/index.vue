<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <h1 class="px-12 text-xl text-center font-black">Работа</h1>
      <h2 class="mt-5 px-12 text-base text-center font-regular">Бесплатно создавайте вакансии или резюме без ограничений</h2>
      <ListServicesJobs/>
      <GoSearchDesktop/>
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
      <BNewLetters/>
    </div>

  </section>
</template>

<script>
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesJobs from "../../components/ListServicesJobs";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";
export default {
  components: {GoSearchDesktop, SearchColorGlobalMobile, ListServicesJobs, BNewLetters, WhatsTapigo},
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
