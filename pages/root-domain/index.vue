<template>
  <section class="container flex flex-col justify-center items-center mt-[80px] pb-[100px]">
    <h1 class="px-5 text-3xl text-center font-black">Привет &mdash; это Тапиго<span class="mt-2 block font-normal text-gray-600 text-xl">Каталог обьявлений, вакансии и резюме, поиск исполнителя, доставка еды и создание ресторана.</span></h1>

    <p @click="linkHub">
      <nuxt-link to="" class="btn btn-primary inline-block my-8 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
      </nuxt-link>
    </p>

      <section class="flex justify-center items-center w-full">
        <section class="input-group relative flex flex-wrap items-stretch w-full">
          <input v-on:input="debounceInput"  v-model="querySearch" type="text"
                 class="form-control relative flex-auto min-w-0 block w-full px-6 py-4 text-base font-bold bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
                 placeholder="Найти обьявление, вакансию или резюме, услугу" aria-label="Поиск" aria-describedby="button-addon2">
          <button @click="getSearchQuery"
                  class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-base tracking-wider rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button" id="button-addon2">Найти
          </button>
        </section>
      </section>
      <article class="mt-0 w-full flex justify-start items-start bg-white left-0 right-0"  v-if="hasItems">

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
              <a :href="getUrlServices(service)" class="text-blue-700 hover:text-black">
                {{ service.name }}, цена: {{ service.price }}
              </a>
            </li>
          </template>
          <template v-if="resumes.length > 0">
            <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
              <a :href="getUrlResume(resume)" class="text-blue-700 hover:text-black">
                {{ resume.name }}, цена: {{ resume.price }}
              </a>
            </li>
          </template>
          <template v-if="vacancies.length > 0">
            <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
              <a :href="getUrlVacancy(vacancy)" class="text-blue-700 hover:text-black">
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

<!--    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <h2 class="font-black text-lg leading-5 sm:text-2xl">Вакансии для компаний</h2>-->
<!--      <p class="mt-3 text-sm sm:text-base text-gray-700">Создавайте неограниченное количество бесплатных вакансий для своей компании. Делегируйте контроль или размещение своему представителю.</p>-->
<!--      <p class="mt-3 font-bold" @click="vacancies"><nuxt-link to="" class="text-blue-600">Смотреть вакансии</nuxt-link></p>-->
<!--    </article>-->

<!--    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <h2 class="font-black text-lg leading-5 sm:text-2xl">Резюме для поиска работы</h2>-->
<!--      <p class="mt-3 text-sm sm:text-base text-gray-700">Размещайте без ограничений бесплатные резюме для поиска работы. Получайте приглашения на собеседования сразу на Тапиго.</p>-->
<!--      <p class="mt-3 font-bold" @click="resume"><nuxt-link to="" class="text-blue-600">Смотреть резюме</nuxt-link></p>-->
<!--    </article>-->

<!--    <article class="flex flex-col items-start mt-6 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <h2 class="font-black text-lg leading-5 sm:text-2xl">Поиск исполнителя</h2>-->
<!--      <p class="mt-3 text-sm sm:text-base text-gray-700">Забить гвоздь, помыть и убрать помещение, отремонтировать бытовую технику, починить электронику, муж на час и многое другое.</p>-->
<!--      <p class="mt-3 font-bold" @click="uslugi"><nuxt-link to="" class="text-blue-600">Найти исполнителя</nuxt-link></p>-->
<!--    </article>-->

<!--    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <h2 class="font-black text-lg leading-5 sm:text-2xl">Каталог обьявлений</h2>-->
<!--      <p class="mt-3 text-sm sm:text-base text-gray-700">Бесплатный каталог почти по всем направлениям &mdash; продать или купить, найти работу или подработку, хэндмэй и барахолка.</p>-->
<!--      <p class="mt-3 font-bold" @click="catalog"><nuxt-link to="" class="text-blue-600">Смотреть обьявления</nuxt-link></p>-->
<!--    </article>-->

<!--    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <h2 class="font-black text-lg leading-5 sm:text-2xl">Доставка еды</h2>-->
<!--      <p class="mt-3 text-sm sm:text-base text-gray-700">Создавайте свои рестораны и оформляйте заказы или доставку еды без зависимости от внешних платформ и ненужных комиссий.</p>-->
<!--      <p class="mt-3 text-gray-400">Скоро для компаний и заказов</p>-->
<!--    </article>-->

  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";

export default {

  data() {
    return {
      querySearch: null,
      hasItems: false,
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
  methods:
      {
    ...mapActions({
      // getItems: 'categoriesAd/getItemsFull',
      getItemsAds: 'ads/getItems',
      getItemsResumes: 'resumes/getItems',
      getItemsServices: 'services/getItems',
      getItemsVacancies: 'vacancies/getItems',
    }),
      linkHub() {
        var host = window.location.host
        if(this.$auth.loggedIn) {
          document.location.href = `${process.env.HUB_URL}/profile`;
        } else {
          document.location.href = process.env.AUTH_URL;
        }
      },
      // vacancies() {
      //   document.location.href = process.env.JOBS_URL + '/vacancies';
      // },
      // resume() {
      //   document.location.href = process.env.JOBS_URL + '/resume';
      // },
      // uslugi() {
      //   document.location.href = process.env.USLUGI_URL;
      // },
      // catalog() {
      //   document.location.href = process.env.CATALOG_URL;
      // },
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
    getUrlVacancy(item) {
      return `${process.env.JOBS_URL}/vacancies/alias/${item.alias}?querySearch=${item.name}`
    },
    getUrlResume(item) {
      return `${process.env.JOBS_URL}/resume/alias/${item.alias}?querySearch=${item.name}`
    },
    getUrlServices(item) {
      return `${process.env.USLUGI_URL}/feed/alias/${item.alias}?querySearch=${item.name}`
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
      // if(_.isEmpty(this.querySearch)) {
      //
      // }
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
      if(this.ads.length > 0 || this.services.length > 0  || this.vacancies.length > 0  || this.resumes.length > 0) {
          this.hasItems = true;
      } else {
        this.hasItems = false;
      }
    }, 500)
  },

}
</script>
