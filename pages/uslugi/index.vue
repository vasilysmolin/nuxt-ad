<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <h1 class="px-12 text-xl text-center font-black">Услуги</h1>
      <h2 class="mt-5 px-12 text-base text-center font-regular">Забить гвоздь, помыть и убрать помещение, отремонтировать бытовую технику, починить электронику, муж на час и многое другое</h2>
      <ListServicesUslugi/>
      <GoSearchDesktop/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
          Создать аккаунт
        </nuxt-link>
      </p>
      <ListServicesUslugiCategories/>
      <WhatsTapigo/>
      <BNewLetters/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
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
import * as _ from "lodash";
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesUslugi from "../../components/ListServicesUslugi";
import ListServicesUslugiCategories from "../../components/ListServicesUslugiCategories";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";

export default {
  mixins: [CategoriesMixin],
  components:{
    ListServicesUslugi,
    SearchColorGlobalMobile,
    WhatsTapigo,
    ListServicesUslugiCategories,
    BNewLetters,
    GoSearchDesktop
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
    title: "Найдите исполнителя для выполнения задачи или разместите свои услуги на Tapigo.ru | Услуги",
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
