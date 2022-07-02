<template>
  <modal name="GoSearch" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <section class="flex justify-center items-center w-full">
      <section class="input-group relative flex flex-wrap items-stretch w-full">
        <input v-on:input="debounceInput"  v-model="querySearch" type="text"
               class="form-control relative flex-auto min-w-0 block w-full px-6 py-4 text-base font-bold bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
               placeholder="Поиск" aria-label="Поиск" aria-describedby="button-addon2">
        <button @click="getSearchQuery"
            class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-base tracking-wider rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button" id="button-addon2">Найти
        </button>
      </section>
    </section>
    <article class="mt-0 flex justify-start items-start">

      <ul class="pl-6 py-2 w-[100%] list-disc list-inside">
        <template v-if="ads.length > 0">
          <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line">
            <a :href="getUrl(ad)" class="text-blue-700 hover:text-black">
              {{ ad.name }}, цена: {{ ad.price }} руб, адрес: {{ ad.street }} {{ ad.house }}
            </a>
          </li>
        </template>
        <template v-if="services.length > 0">
          <li @click="hide" v-for="service in services" :key="service.id" class="search-line">
            <a :href="getUrl(service)" class="text-blue-700 hover:text-black">
              {{ service.name }}, цена: {{ service.price }}
            </a>
          </li>
        </template>
        <template v-if="resumes.length > 0">
          <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
            <a :href="getUrl(resume)" class="text-blue-700 hover:text-black">
              {{ resume.name }}, цена: {{ resume.price }}
            </a>
          </li>
        </template>
        <template v-if="vacancies.length > 0">
          <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
            <a :href="getUrl(vacancy)" class="text-blue-700 hover:text-black">
              {{ vacancy.name }}, цена: {{ vacancy.price }}
            </a>
          </li>
        </template>

      </ul>
      <ul class="pr-6 py-2 w-[50%]">
        <template v-if="ads.length > 0">
          <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line">
            <a :href="getUrl(ad)" class="search-tags">
              {{ getNameCat(ad) }}
            </a>
          </li>
        </template>
        <template v-if="services.length > 0">
          <li @click="hide" v-for="service in services" :key="service.id" class="search-line">
            <a :href="getUrl(service)" class="search-tags">
              {{ getNameCat(service) }}
            </a>
          </li>
        </template>
        <template v-if="resumes.length > 0">
          <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
            <a :href="getUrl(resume)" class="search-tags">
              {{ getNameCat(resume) }}
            </a>
          </li>
        </template>
        <template v-if="vacancies.length > 0">
          <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
            <a :href="getUrl(vacancy)" class="search-tags">
              {{ getNameCat(vacancy) }}
            </a>
          </li>
        </template>
      </ul>

    </article>
  </modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';

export default {
  name: 'GoSearch',
  mixins: [CategoriesMixin],
  async mounted() {

  },
  data() {
    return {
      querySearch: null,
    }
  },
  computed: {
    ...mapGetters({
      // categories: 'categoriesAd/categoriesAds',
      ads: 'ads/ads',
      services: 'services/services',
      resumes: 'resumes/resumes',
      vacancies: 'vacancies/vacancies',
    }),
  },
  methods: {
    ...mapActions({
      // getItems: 'categoriesAd/getItemsFull',
      getItemsAds: 'ads/getItems',
      getItemsResumes: 'resumes/getItems',
      getItemsServices: 'services/getItems',
      getItemsVacancies: 'vacancies/getItems',
    }),
    categoryLink(category) {
      const result = this.parentIter(category, category.alias);
      return `/feed${result}`;
    },
    getNameCat(item){
        return item?.categories?.name;
    },
    getUrl(ad) {
      return `${process.env.CATALOG_URL}/feed/alias/${ad.alias}?querySearch=${ad.name}`
    },
    hide() {
      this.$modal.hide('GoSearch');
    },
    getSearchQuery() {
      // this.$router.push({ path: '/feed', query: { query: this.query } })
      // this.hide();
      if(this.querySearch) {
        window.location.href = `${process.env.CATALOG_URL}/feed?querySearch=${this.querySearch}`;
      }
    },
    debounceInput: _.debounce(function (e) {
      this.getItemsAds({
        querySearch: this.querySearch,
        take: 3,
      }).then((res) => {
      }).catch((error) => {
      });
      this.getItemsResumes({
        querySearch: this.querySearch,
        take: 3,
      }).then((res) => {
      }).catch((error) => {
      });
      this.getItemsVacancies({
        querySearch: this.querySearch,
        take: 3,
      }).then((res) => {
      }).catch((error) => {
      });
      this.getItemsServices({
        querySearch: this.querySearch,
        take: 3,
      }).then((res) => {
      }).catch((error) => {
      });
    }, 500)
  },
}
</script>
