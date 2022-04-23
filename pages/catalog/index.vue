<template>
  <section class="container flex flex-col justify-center items-center mt-[100px]">
    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Каталог обьявлений</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Бесплатный каталог почти по всем направлениям &mdash; продать или купить, найти работу или подработку, хэндмэй и барахолка.</p>
      <p class="mt-3 font-bold"><nuxt-link to="/feed" class="text-blue-600">Смотреть обьявления</nuxt-link></p>
    </article>

<!--    <ListCategories-->
<!--        v-for="category in categories"-->
<!--        :category="category"-->
<!--        :depth="1"-->
<!--    />-->


    <p @click="signup">
    <nuxt-link to="" class="btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
    </nuxt-link>
    </p>

  </section>
</template>

<script>
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import ListCategories from "../../components/ListCategories";

export default {
  head: {
    title: "Бесплатно создавайте вакансии и резюме без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  components:{ListCategories},
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems');
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
    signup() {
      document.location.href = process.env.AUTH_URL;
    }
  }
}
</script>
