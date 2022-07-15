<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <h1 class="px-12 text-xl text-center font-black">Объявления</h1>
      <h2 class="mt-5 px-12 text-base text-center font-regular">Продать или купить, найти работу или услуги, большая барахолка и многое другое</h2>
      <p @click="linkHub" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
          Создать аккаунт
        </nuxt-link>
      </p>
      <GoSearchDesktop/>
      <ListServicesCatalogCategories/>
      <WhatsTapigo/>
      <BNewLetters/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
      <h1 class="text-center text-base font-black">Объявления</h1>
      <h2 class="text-center text-sm">Продать или купить, найти работу или услуги, большая барахолка и многое другое</h2>
      <div @click="showGoSearch">
        <SearchColorGlobalMobile/>
      </div>
      <p @click="linkHub" class="text-center">
        <nuxt-link to="" class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">Создать аккаунт
        </nuxt-link>
      </p>

      <ListServicesCatalogCategories/>

      <WhatsTapigo/>
    </div>

  </section>
</template>

<script>
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import ListCategories from "../../components/ListCategories";
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesCatalogCategories from "../../components/ListServicesCatalogCategories";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";

export default {
  head: {
    title: "Бесплатный каталог объявлений | Недвижимость, Транспорт, Работа, Услуги, Животные, Электроника, Барахолка и многое другое | Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  components:{
    ListCategories,
    WhatsTapigo,
    SearchColorGlobalMobile,
    ListServicesCatalogCategories,
    BNewLetters,
    GoSearchDesktop
  },
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems', {from: 'catalog'});
    }
  },
  computed: {
    categories: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesAd/categoriesAds']);
      },
      set(category) {
        return category
      }
    },
  },
  methods: {
    linkHub() {
      // consol.log(1234);
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
