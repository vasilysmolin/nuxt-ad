<template>
  <modal name="GoSearch" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <section class="flex justify-center items-center w-full">
      <section class="input-group relative flex flex-wrap items-stretch w-full">
        <input v-on:input="debounceInput"  v-model="query" type="text"
               class="form-control relative flex-auto min-w-0 block w-full px-6 py-4 text-base font-bold bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
               placeholder="Поиск" aria-label="Поиск" aria-describedby="button-addon2">
        <button
            class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-base tracking-wider rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button" id="button-addon2">Найти
        </button>
      </section>
    </section>
    <article class="mt-0 flex justify-start items-start">
      <ul class="pl-6 py-2 w-[100%] list-disc list-inside" v-if="categories.length > 0">
        <!--<li @click="hide" style="list-style-type: none;" v-for="category in categories" class="search-line"><nuxt-link :to="categoryLink(category)" class="text-blue-700 hover:text-black">{{ category.name }}</nuxt-link></li>-->
        <template v-if="ads.length > 0">
          <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line"><nuxt-link :to="getUrl(ad)" class="text-blue-700 hover:text-black">{{ ad.name }}</nuxt-link></li>
        </template>
      </ul>

<!--      <ul class="pr-6 py-2 w-[50%]">-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Квартиры</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Квартиры</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Квартиры</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Комнаты</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Комнаты</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Услуги</span></nuxt-link><nuxt-link to=""><span class="search-tags">Уборка</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Услуги</span></nuxt-link><nuxt-link to=""><span class="search-tags">Уборка</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Работа</span></nuxt-link><nuxt-link to=""><span class="search-tags">Вакансии</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Отдых и спорт</span></nuxt-link><nuxt-link to=""><span class="search-tags">Спортивная экипировка и инвентарь</span></nuxt-link></li>-->
<!--        <li class="search-line"><nuxt-link to=""><span class="search-tags">Недвижимость</span></nuxt-link><nuxt-link to=""><span class="search-tags">Квартиры</span></nuxt-link></li>-->
<!--      </ul>-->
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
      query: null,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesAd/categoriesAdsFull',
      ads: 'ads/adsFull',
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'categoriesAd/getItemsFull',
      getItemsAds: 'ads/getItemsFull',
    }),
    categoryLink(category) {
      const result = this.parentIter(category, category.alias);
      return `/feed${result}`;
    },
    getUrl(ad) {
      return `/feed/alias/${ad.alias}`
    },
    hide() {
      this.$modal.hide('GoSearch');
    },
    debounceInput: _.debounce(function (e) {
      this.getItems({query: this.query}).then((res) => {
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
      this.getItemsAds({query: this.query}).then((res) => {
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    }, 500)
  },
}
</script>
