<template>
  <section>
    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
    <h1 class="px-12 text-xl text-center font-black">Каталог обьявлений, вакансии и резюме, поиск исполнителя, доставка еды и создание ресторана</h1>

      <section class="mt-12 flex flex-col justify-center items-center w-full">
        <h2 class="text-base">Поиск объявления, вакансии или резюме, исполнителя</h2>
        <section class="mt-7 p-1.5 relative flex flex-wrap items-stretch w-full bg-[#F7F7FC] border border-solid rounded border-gray-300">
          <input v-on:input="debounceInput"  v-model="querySearch" type="text"
                 class="form-control relative mr-2 flex-auto block px-1 py-2.5 text-base font-regular bg-[#F7F7FC] bg-clip-padding transition ease-in-out m-0 focus:outline-none focus:ring-0"
                 placeholder="Например, квартира, резюме, забить гвоздь" aria-label="Поиск" aria-describedby="button-addon2">
          <button @click="getSearchQuery"
                  class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-sm tracking-wider rounded hover:bg-black focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button" id="button-addon2">Найти
          </button>
          <article class="absolute top-16 w-full max-h-[500px] flex flex-col justify-start items-start bg-white rounded shadow-md left-0 right-0 overflow-y-auto"  v-if="hasItems">

            <ul class="px-2 py-2.5 w-full text-[15px]">
              <template v-if="ads.length > 0">
                <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line">
                  <a :href="getUrl(ad)" class="block px-2 py-2 rounded hover:bg-blue-200">
                    {{ ad.name }}, цена: {{ ad.price }} руб, адрес: {{ ad.street }} {{ ad.house }}
                  </a>
                </li>
              </template>
              <template v-if="services.length > 0">
                <li @click="hide" v-for="service in services" :key="service.id" class="search-line">
                  <a :href="getUrlServices(service)" class="block px-2 py-2 rounded hover:bg-blue-200">
                    {{ service.name }}, цена: {{ service.price }}
                  </a>
                </li>
              </template>
              <template v-if="resumes.length > 0">
                <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
                  <a :href="getUrlResume(resume)" class="block px-2 py-2 rounded hover:bg-blue-200">
                    {{ resume.name }}, цена: {{ resume.price }}
                  </a>
                </li>
              </template>
              <template v-if="vacancies.length > 0">
                <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
                  <a :href="getUrlVacancy(vacancy)" class="block px-2 py-2 rounded hover:bg-blue-200">
                    {{ vacancy.name }}, цена: {{ vacancy.price }}
                  </a>
                </li>
              </template>

            </ul>
            <!--
            <ul class="pr-2 py-2 bg-blue-600">
              <template v-if="ads.length > 0">
                <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line">
                  <a :href="getUrl(ad)" class="search-tags">
                    {{ getNameCat(ad) }}
                  </a>
                </li>
              </template>
              <template v-if="services.length > 0">
                <li @click="hide" v-for="service in services" :key="service.id" class="search-line">
                  <a :href="getUrlServices(service)" class="search-tags">
                    {{ getNameCat(service) }}
                  </a>
                </li>
              </template>
              <template v-if="resumes.length > 0">
                <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
                  <a :href="getUrlResume(resume)" class="search-tags">
                    {{ getNameCat(resume) }}
                  </a>
                </li>
              </template>
              <template v-if="vacancies.length > 0">
                <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
                  <a :href="getUrlVacancy(vacancy)" class="search-tags">
                    {{ getNameCat(vacancy) }}
                  </a>
                </li>
              </template>
            </ul>
             -->
          </article>
        </section>
      </section>

      <ListServicesIndex/>

      <p @click="linkHub" class="text-center">
        <nuxt-link to="" class="btn btn-primary inline-block mt-12 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">Создать аккаунт
        </nuxt-link>
      </p>

      <WhatsTapigo/>
      <BNewLetters/>

    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
        <h1 class="text-center text-sm font-bold">Каталог объявлений, вакансии и резюме, поиск исполнителя и размещение услуг</h1>
        <div @click="showGoSearch">
          <SearchColorGlobalMobile/>
        </div>
      <ListServicesIndex/>
      <p @click="linkHub" class="text-center">
        <nuxt-link to="" class="btn btn-primary inline-block mt-7 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0">Создать аккаунт
        </nuxt-link>
      </p>
      <WhatsTapigo/>
      <BNewLetters/>
    </div>

  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import SearchMixin from "~/components/mixins/search.mixin"
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesIndex from "../../components/ListServicesIndex";
import WhatsTapigo from "../../components/WhatsTapigo";
import BNewLetters from "~/components/blocks/BNewLetters";

export default {
  components: {WhatsTapigo, ListServicesIndex, SearchColorGlobalMobile,BNewLetters},
  mixins: [SearchMixin],
  // mounted() {
  //   this.querySearch = null;
  // },
  methods:
      {
      linkHub() {
        var host = window.location.host
        if(this.$auth.loggedIn) {
          document.location.href = `${process.env.HUB_URL}/profile`;
        } else {
          document.location.href = process.env.AUTH_URL;
        }
      },
      showGoSearch () {
        this.$modal.show('GoSearch');
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
  },

}
</script>
