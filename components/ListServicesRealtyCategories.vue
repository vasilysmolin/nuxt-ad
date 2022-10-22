<template>
  <section>

    <div v-if="$device.isDesktop">
      <span class="mt-12 block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
      <h3 class="mt-10 mb-7 text-center font-bold">Каталог недвижимости</h3>
      <section class="mt-12 grid grid-cols-4 gap-6">

        <!-- HARDCODE -->

        <nuxt-link to="">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Новостройки (скоро)</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/flats_7y5Cy">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Квартиры</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/rooms_Qn20y">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Комнаты</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/nedvizimost-hjgob/cottage-house-townhouse_fdJQh">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Коттедж, дом, дача, таунхауз</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/nedvizimost-hjgob/commercial_S3Ni9">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Коммерческая недвижимость</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/nedvizimost-hjgob/stead_RFH9e">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Земельные участки</h2>
          </article>
        </nuxt-link>

        <nuxt-link to="/feed/nedvizimost-hjgob/garages-parking_MWIpu">
          <article
              class="px-2 py-4 flex flex-col justify-start rounded-lg w-[160px] min-h-[110px] bg-[#FFFFFF] border border-solid border-white transition duration-150 ease-in-out hover:border-[#cccccc]">
            <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
            <h2 class="mt-6 text-sm font-medium">Гаражи и машиноместа</h2>
          </article>
        </nuxt-link>

        <!-- end HARDCODE -->

        <!--<BArticle
            v-for="category in allChunkCategories"
            :category="category"
            :key="category.id"
        />-->
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
      <h3 class="my-5 text-center text-sm font-bold">Каталог недвижимости</h3>
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
  name: "ListServicesRealtyCategories",
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
    if (this.categories.length === 0) {
      await this.$store.dispatch('categoriesRealty/getItems', {from: 'catalog'}).then(() => {
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
        return _.cloneDeep(this.$store.getters['categoriesRealty/categoryRealties']);
      },
      set(category) {
        return category
      }
    },
  },
  methods: {
    feed() {
      document.location.href = `${process.env.REALTY_URL}/feed`;
    }
  }
}

</script>
