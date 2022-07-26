<template>
  <section>

    <div v-if="$device.isDesktop">
      <span class="mt-12 block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
      <h3 class="mt-10 mb-7 text-center font-bold">Каталог объявлений</h3>
      <section class="mt-12 grid grid-cols-4 gap-6">
        <BArticle
            v-for="category in allChunkCategories"
            :category="category"
            :key="category.id"
        />
      </section>
      <p @click="feed" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-2.5 bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
          Лента объявлений
        </nuxt-link>
      </p>
    </div>


    <div v-if="$device.isMobile">
      <span class="mt-7 block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
      <h3 class="my-5 text-center text-sm font-bold">Каталог объявлений</h3>
      <section class="mt-7 grid grid-cols-2 gap-6">
        <BArticle
            v-for="category in firstChunkCategories"
            :category="category"
            :key="category.id"
        />
      </section>
      <section class="mt-7 grid grid-cols-2 gap-6">
        <BArticle
            v-for="category in secondChunkCategories"
            :category="category"
            :key="category.id"
        />
      </section>
      <p @click="feed" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-7 px-5 py-2.5 bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
          Лента объявлений
        </nuxt-link>
      </p>
    </div>

  </section>
</template>

<script>
import BArticle from "../components/blocks/BArticle";

import * as _ from "lodash";

export default {
  name: "ListServicesCatalogCategories",
  components: {
    BArticle,
  },
  data() {
    return {
      firstChunkCategories: [],
      secondChunkCategories: [],
      allChunkCategories: [],
    }
  },
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems', {from: 'catalog'}).then(() => {
        this.firstChunkCategories = _.take(this.categories, 6);
        this.secondChunkCategories = _.slice(this.categories, 6);
        this.allChunkCategories = _.take(this.categories, 11);
      });
    } else {
      this.firstChunkCategories = _.take(this.categories, 6);
      this.secondChunkCategories = _.slice(this.categories, 6);
      this.allChunkCategories = _.take(this.categories, 11);
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
    feed() {
      document.location.href = `${process.env.CATALOG_URL}/feed`;
    }
  }
}

</script>
