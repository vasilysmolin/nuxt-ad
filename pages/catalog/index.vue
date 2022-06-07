<template>
  <section class="container flex flex-col justify-center items-center mt-[80px] pb-[100px]">
    <h1 class="px-5 text-3xl text-center font-black">Бесплатный каталог<span class="mt-2 block font-normal text-gray-600 text-xl">Продать или купить, найти работу или услуги, большая барахолка и многое другое.</span></h1>

    <p @click="linkHub">
      <nuxt-link to="" class="btn btn-primary inline-block mt-8 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
      </nuxt-link>
    </p>

    <section class="masonry-2-col gap-6 space-y-6 mt-10 w-full">
      <ListCategories
          v-for="category in categories"
          :category="category"
          :key="category.id"
          :depth="1"
      />
    </section>

  </section>
</template>

<script>
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import ListCategories from "../../components/ListCategories";

export default {
  head: {
    title: "Бесплатный каталог объявлений | Недвижимость, Транспорт, Работа, Услуги, Животные, Электроника, Барахолка и многое другое | Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  components:{ListCategories},
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
  }
}
</script>
