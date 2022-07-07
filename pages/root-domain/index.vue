<template>
  <section class="container flex flex-col mt-[70px]">
    <div v-if="$device.isDesktop" class="">
    <h1 class="px-5 text-3xl text-center font-black">Привет &mdash; это Тапиго<span class="mt-2 block font-normal text-gray-600 text-xl">Каталог обьявлений, вакансии и резюме, поиск исполнителя, доставка еды и создание ресторана.</span></h1>

    <p @click="linkHub" class="text-center">
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

      </article>
    </div>

    <div v-if="$device.isMobile" class="px-[20px] pb-[80px] w-full flex flex-col items-center">
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

export default {
  components: {WhatsTapigo, ListServicesIndex, SearchColorGlobalMobile},
  mixins: [SearchMixin],
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
