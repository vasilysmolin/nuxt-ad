<template>
  <section class="container flex flex-col justify-center items-center mt-[70px] pb-[80px]">
    <div v-if="$device.isDesktop" class="">
    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Поиск исполнителя</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Забить гвоздь, помыть и убрать помещение, отремонтировать бытовую технику, починить электронику, муж на час и многое другое.</p>
      <p class="mt-3 font-bold"><nuxt-link to="/feed" class="text-blue-600">Найти исполнителя</nuxt-link></p>
    </article>

    <section class="masonry-2-col gap-6 space-y-6 mt-10 w-full">
      <ListCategories
          v-for="category in categories"
          :category="category"
          :key="category.id"
          :depth="1"
      />
    </section>


    <p @click="signup">
    <nuxt-link to="" class="btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
    </nuxt-link>
    </p>
    </div>

    <div v-if="$device.isMobile" class="px-[20px] w-full flex flex-col items-center">
      <h1 class="text-center text-base font-black">Услуги</h1>
      <h2 class="text-center text-sm">Забить гвоздь, помыть и убрать помещение, отремонтировать бытовую технику, починить электронику, муж на час и многое другое</h2>
      <div @click="showGoSearch">
        <SearchColorGlobalMobile/>
      </div>
      <ListServicesUslugi/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to="" class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">Создать аккаунт
        </nuxt-link>
      </p>

      <ListServicesUslugiCategories/>

      <WhatsTapigo/>
    </div>

  </section>
</template>

<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
import ListCategories from "../../components/ListCategories";
import * as _ from "lodash";
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesUslugi from "../../components/ListServicesUslugi";
import ListServicesUslugiCategories from "../../components/ListServicesUslugiCategories";

export default {
  mixins: [CategoriesMixin],
  components:{
    ListServicesUslugi,
    ListCategories,
    SearchColorGlobalMobile,
    WhatsTapigo,
    ListServicesUslugiCategories
  },
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesService/getItems', {from: 'catalog'});
    }
  },
  computed: {
    categories: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesService/categoriesServices']);
      },
      set(category) {
        return category
      }
    },
  },
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
    signup() {
      document.location.href = process.env.AUTH_URL;
    },
    showGoSearch () {
      this.$modal.show('GoSearch');
    },
  }
}
</script>
