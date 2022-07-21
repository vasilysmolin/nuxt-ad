<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <h1 class="px-12 text-xl text-center font-black">Работа</h1>
      <h2 class="mt-5 px-12 text-base text-center font-medium">Бесплатно создавайте вакансии или резюме без ограничений</h2>
      <ListServicesJobs/>
      <GoSearchDesktop/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
          Создать аккаунт
        </nuxt-link>
      </p>

      <!-- вставка для перелинка сервисов -->
      <div class="mt-12">
        <h3 class="mb-7 text-center font-medium">Другие сервисы</h3>
        <div class="flex flex-row justify-between items-center w-full">
          <article @click="uslugi" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFECD1] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFD9A1]">
            <IconListServicesIndexUslugi/>
            <div>
              <h2 class="mt-4 text-base font-black">Услуги</h2>
              <h3 class="mt-1 text-[12px] leading-normal">Найти исполнителя или создать услугу.</h3>
            </div>
          </article>
          <article @click="catalog" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFF4D2] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE69B]">
            <IconListServicesIndexCatalog/>
            <div>
              <h2 class="mt-4 text-base font-black">Объявления</h2>
              <h3 class="mt-1 text-[12px] leading-normal">Продать, купить и многое другое.</h3>
            </div>
          </article>
        </div>
      </div>
      <!-- -->

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

      <!-- вставка для перелинка сервисов -->
      <div class="mt-7">
        <h3 class="mb-5 text-center font-medium text-sm font-bold">Другие сервисы</h3>
        <section class="grid grid-cols-2 gap-6">
          <article @click="uslugi"
                   class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
            <IconListServicesIndexUslugi/>
            <div>
              <h2 class="text-sm font-black">Услуги</h2>
              <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или создать услугу.</h3>
            </div>
          </article>
          <article @click="catalog"
                   class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF4D2]">
            <IconListServicesIndexCatalog/>
            <div>
              <h2 class="text-sm font-black">Объявления</h2>
              <h3 class="mt-1 text-[11px] leading-snug">Продать, купить и многое другое.</h3>
            </div>
          </article>
        </section>
      </div>
      <!-- -->

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
import IconListServicesIndexUslugi from "../../components/icons/IconListServicesIndexUslugi";
import IconListServicesIndexCatalog from "../../components/icons/IconListServicesIndexCatalog";
export default {
  components: {GoSearchDesktop, SearchColorGlobalMobile, ListServicesJobs, BNewLetters, WhatsTapigo, IconListServicesIndexUslugi, IconListServicesIndexCatalog},
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
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    },
  }
}
</script>
