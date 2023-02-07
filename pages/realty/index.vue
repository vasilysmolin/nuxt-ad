<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
      <h1 class="px-12 text-4xl text-center font-black">Каталог недвижимости</h1>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-10 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
          Создать аккаунт
        </nuxt-link>
      </p>
      <GoSearchDesktop/>
      <ListServicesRealtyCategories/>

      <!-- вставка для перелинка сервисов
      <div class="mt-12">
        <span class="block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
        <h3 class="mt-10 mb-7 text-center font-bold">Другие сервисы</h3>
        <div class="flex flex-row justify-between items-center w-full">
          <article @click="jobs"
                   class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFF2CB] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE69B]">
            <IconListServicesIndexJobs/>
            <div>
              <h2 class="mt-4 text-base font-black">Работа</h2>
              <h3 class="mt-1 text-[13px] leading-normal">Быстрый поиск работы или соискателя.</h3>
            </div>
          </article>
          <article @click="uslugi"
                   class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFECD1] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFD9A1]">
            <IconListServicesIndexUslugi/>
            <div>
              <h2 class="mt-4 text-base font-black">Услуги</h2>
              <h3 class="mt-1 text-[13px] leading-normal">Найти исполнителя или создать услугу.</h3>
            </div>
          </article>
        </div>
      </div>
      -->

      <WhatsTapigo/>
      <BNewLetters/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
      <h1 class="text-center text-sm font-bold">Новостройки, квартиры, комнаты, дома, нежилые и офисные помещения, земельные участки</h1>
      <div @click="showGoSearch">
        <SearchColorGlobalMobile/>
      </div>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">
          Создать аккаунт
        </nuxt-link>
      </p>
      <ListServicesRealtyCategories/>

      <!-- вставка для перелинка сервисов -->
      <div class="mt-7">
        <span class="block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
        <h3 class="my-5 text-center text-sm font-bold">Другие сервисы</h3>
        <section class="grid grid-cols-2 gap-6">
          <article @click="jobs"
                   class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
            <IconListServicesIndexJobs/>
            <div>
              <h2 class="text-sm font-black">Работа</h2>
              <h3 class="mt-1 text-[11px] leading-snug">Быстрый поиск работы или соискателя.</h3>
            </div>
          </article>
          <article @click="uslugi"
                   class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF4D2]">
            <IconListServicesIndexUslugi/>
            <div>
              <h2 class="text-sm font-black">Услуги</h2>
              <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или создать услугу.</h3>
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
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import ListCategories from "../../components/ListCategoriesRealty";
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesRealtyCategories from "../../components/ListServicesRealtyCategories";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";
import IconListServicesIndexJobs from "../../components/icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "../../components/icons/IconListServicesIndexUslugi";

export default {
  head: {
    title: "Недвижимость | Новостройки, квартиры, комнаты, дома, нежилые и офисные помещения, земельные участки | Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  components: {
    ListCategories,
    WhatsTapigo,
    SearchColorGlobalMobile,
    ListServicesRealtyCategories,
    BNewLetters,
    GoSearchDesktop,
    IconListServicesIndexJobs,
    IconListServicesIndexUslugi,
  },
  async mounted() {
    if (this.categories.length === 0) {
      await this.$store.dispatch('categoriesRealty/getItems', {from: 'catalog'});
    }
  },
  computed: {
    categories: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesRealty/categoriesRealties']);
      },
      set(category) {
        return category
      }
    },
  },
  methods: {
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
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
  }
}
</script>
