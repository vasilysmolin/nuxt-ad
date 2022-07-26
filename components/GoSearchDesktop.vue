<template>
  <section class="mt-12 py-5 px-3 flex flex-col justify-center items-center w-full rounded bg-[#eeeeee]">
    <h2 class="text-base font-bold">Найти объявление, работу или исполнителя</h2>
    <section class="mt-4 p-1.5 relative flex flex-wrap items-stretch w-full bg-white border border-solid rounded border-gray-300">
      <input v-on:input="debounceInput"  v-model="querySearch" type="text"
             class="form-control relative mr-2 flex-auto block px-1 py-2.5 text-base font-regular bg-white bg-clip-padding transition ease-in-out m-0 focus:outline-none focus:ring-0"
             placeholder="Например, квартира, вакансии, подработка" aria-label="Поиск" aria-describedby="button-addon2">
      <button @click="getSearchQuery"
              class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-sm tracking-wider rounded hover:bg-black focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button" id="button-addon2">Найти
      </button>
      <article class="absolute top-16 w-full max-h-[500px] flex flex-col justify-start items-start bg-white rounded shadow-md left-0 right-0 overflow-y-auto z-50"  v-if="hasItems">

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

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import SearchMixin from "~/components/mixins/search.mixin"

export default {
  name: "GoSearchDesktop",
  mixins: [SearchMixin],
}
</script>
