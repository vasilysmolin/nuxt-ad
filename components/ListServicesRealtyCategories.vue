<template>
  <section>

    <div v-if="$device.isDesktop">
      <section class="mt-10">

        <section>
          <nuxt-link to="/feed/new-buildings">
            <article class="w-full h-[300px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_new_building_index.jpg)">
              <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Новостройки</h2>
            </article>
          </nuxt-link>
        </section>

        <section class="mt-5 grid grid-cols-2 gap-x-5">
          <nuxt-link to="/feed/flats_buy">
            <article class="h-[250px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg)">
              <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Квартиры</h2>
            </article>
          </nuxt-link>
          <nuxt-link to="/feed/rooms_buy">
            <article class="h-[250px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_rooms_index.jpg)">
              <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Комнаты</h2>
            </article>
          </nuxt-link>
        </section>

        <section class="mt-5 grid grid-cols-2 gap-x-5">
          <nuxt-link to="/feed/cottage-house-townhouse_buy">
            <article class="h-[520px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_houses%20and%20cottages_index.jpg)">
              <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Дома, дачи и коттеджи</h2>
            </article>
          </nuxt-link>
          <section class="grid gap-y-5">
            <nuxt-link to="/feed/commercial_buy">
              <article class="h-[250px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_commercial_index.jpg)">
                <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Коммерческая недвижимость</h2>
              </article>
            </nuxt-link>
            <nuxt-link to="/feed/garages-parking_buy">
              <article class="h-[250px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_land_plots_index.jpg)">
                <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Гаражи и машиноместа</h2>
              </article>
            </nuxt-link>
          </section>
        </section>

        <section class="mt-5">
          <nuxt-link to="/feed/stead_buy">
            <article class="w-full h-[300px] bg-cover rounded-lg saturate-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_garages_index.jpg)">
              <h2 class="mt-5 ml-5 px-2 py-1.5 inline-block text-2xl font-black bg-white rounded">Земельные участки</h2>
            </article>
          </nuxt-link>
        </section>

      </section>
      <p @click="feed" class="text-center">
        <nuxt-link to=""
                   class="btn btn-primary inline-block mt-12 px-5 py-2.5 bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
          Лента недвижимости
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
