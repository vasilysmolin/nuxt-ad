<template>
  <section>

    <div v-if="$device.isDesktop">
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

      <!-- вставка для перелинка сервисов -->
      <div class="mt-12">
        <h3 class="mb-7 text-center font-medium">Другие сервисы</h3>
        <div class="flex flex-row justify-between items-center w-full">
          <article @click="jobs" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFF2CB] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE69B]">
            <IconListServicesIndexJobs/>
            <div>
              <h2 class="mt-4 text-base font-black">Работа</h2>
              <h3 class="mt-1 text-[12px] leading-normal">Бесплатно создавайте вакансии и резюме.</h3>
            </div>
          </article>
          <article @click="uslugi" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFECD1] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFD9A1]">
            <IconListServicesIndexUslugi/>
            <div>
              <h2 class="mt-4 text-base font-black">Услуги</h2>
              <h3 class="mt-1 text-[12px] leading-normal">Найти исполнителя или создать услугу.</h3>
            </div>
          </article>
        </div>
      </div>
      <!-- -->

    </div>


    <div v-if="$device.isMobile">
      <section class="mt-7 grid grid-cols-2 gap-6">
        <BArticle
            v-for="category in firstChunkCategories"
            :category="category"
            :key="category.id"
        />
      </section>
      <!-- вставка для перелинка сервисов -->
      <section class="mt-7 grid grid-cols-2 gap-6">
        <article @click="jobs"
                 class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE2E0]">
          <IconListServicesIndexJobs/>
          <div>
            <h2 class="text-sm font-black">Работа</h2>
            <h3 class="mt-1 text-[11px] leading-snug">Бесплатно создавайте вакансии и резюме.</h3>
          </div>
        </article>
        <article @click="uslugi"
                 class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
          <IconListServicesIndexUslugi/>
          <div>
            <h2 class="text-sm font-black">Услуги</h2>
            <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или создать услугу.</h3>
          </div>
        </article>
      </section>
      <!-- -->

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
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import BArticle from "../components/blocks/BArticle";

import * as _ from "lodash";

export default {
  name: "ListServicesCatalogCategories",
  components: {
    IconListServicesIndexJobs,
    IconListServicesIndexUslugi,
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
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    feed() {
      document.location.href = `${process.env.CATALOG_URL}/feed`;
    }
  }
}

</script>
