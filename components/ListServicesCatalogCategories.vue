<template>
  <section>
    <section class="mt-7 grid grid-cols-2 gap-6">
      <BArticle
          v-for="category in firstChunkCategories"
          :category="category"
          :key="category.id"
      />
    </section>
    <!-- вставка для перелинка сервисов -->
    <section class="mt-7 grid grid-cols-2 gap-6">
      <article @click="jobs" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE2E0]">
        <IconListServicesIndexJobs/>
        <div>
          <h2 class="text-sm font-black">Работа</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Бесплатно создавайте вакансии и резюме.</h3>
        </div>
      </article>
      <article @click="uslugi" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
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

  </section>
</template>

<script>
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import BArticle from "~/components/blocks/BArticle";

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
    }
  },
  async mounted() {
    // if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems', {from: 'catalog'}).then(() => {
        this.firstChunkCategories = _.take(this.categories, 6);
        this.secondChunkCategories = _.slice(this.categories, 6);
      });
    // }
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
  }
}

</script>
