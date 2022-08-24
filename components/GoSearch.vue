<template>
  <section>

    <div v-if="$device.isDesktop">
      <modal name="GoSearch" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
        <section class="flex justify-center items-center w-full">
          <section class="input-group relative flex flex-wrap items-stretch w-full">
            <input autofocus v-on:input="debounceInput" v-model="querySearch" type="text"
                   class="form-control relative flex-auto min-w-0 block w-full px-6 py-4 text-base bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none focus:ring-0"
                   placeholder="Поиск" aria-label="Поиск" aria-describedby="button-addon2">
            <button @click="getSearchQuery"
                    class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-base tracking-wider rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="button" id="button-addon2">Найти
            </button>
          </section>
        </section>
        <article class="mt-0 flex justify-start items-start" v-if="hasItems">

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
      </modal>
    </div>
    <div v-if="$device.isMobile">
      <modal name="GoSearch" width="100%" height="100%">
        <section class="flex flex-col justify-center items-center w-full">
          <section class="p-2 relative flex flex-wrap items-stretch w-full border-b border-solid border-gray-300">
            <input autofocus v-on:input="debounceInput" v-model="querySearch" type="text"
                   class="form-control relative flex-auto block px-1 py-2.5 text-xs font-regular bg-white bg-clip-padding transition ease-in-out m-0 focus:outline-none focus:ring-0"
                   placeholder="Например, квартира, резюме, забить гвоздь" aria-label="Поиск"
                   aria-describedby="button-addon2">
            <button @click="getSearchQuery"
                    class="btn inline-block px-2 bg-blue-900 text-white font-bold text-xs tracking-wider rounded focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 items-center"
                    type="button" id="button-addon2">Найти
            </button>
          </section>
          <article class="absolute pb-[80px] top-14 w-[98%] h-[95%] mx-auto bg-white z-40 overflow-y-auto" v-if="hasItems">
            <ul class="py-2 w-full text-xs text-blue-600">
              <template v-if="ads.length > 0">
                <li @click="hide" v-for="ad in ads" :key="ad.id" class="search-line">
                  <a :href="getUrl(ad)" class="block px-2 py-2">
                    {{ ad.name }}, цена: {{ ad.price }} руб, адрес: {{ ad.street }} {{ ad.house }}
                  </a>
                </li>
              </template>
              <template v-if="services.length > 0">
                <li @click="hide" v-for="service in services" :key="service.id" class="search-line">
                  <a :href="getUrlServices(service)" class="block px-2 py-2">
                    {{ service.name }}, цена: {{ service.price }}
                  </a>
                </li>
              </template>
              <template v-if="resumes.length > 0">
                <li @click="hide" v-for="resume in resumes" :key="resume.id" class="search-line">
                  <a :href="getUrlResume(resume)" class="block px-2 py-2">
                    {{ resume.name }}, цена: {{ resume.price }}
                  </a>
                </li>
              </template>
              <template v-if="vacancies.length > 0">
                <li @click="hide" v-for="vacancy in vacancies" :key="vacancy.id" class="search-line">
                  <a :href="getUrlVacancy(vacancy)" class="block px-2 py-2">
                    {{ vacancy.name }}, цена: {{ vacancy.price }}
                  </a>
                </li>
              </template>

            </ul>
            <!--
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
   -->
          </article>
          <footer class="absolute bottom-0 left-0 right-0 p-2.5 flex justify-between items-center bg-gray-200 w-full z-50">
            <p @click="linkHub" class="text-center">
              <nuxt-link to=""
                         class="btn btn-primary inline-block px-2.5 py-2.5 bg-blue-900 text-white font-bold text-xs tracking-wider leading-snug rounded focus:outline-none focus:ring-0">
                Создать аккаунт
              </nuxt-link>
            </p>
            <div @click.prevent="hide">
              <IconClose/>
            </div>
          </footer>
        </section>
      </modal>
    </div>
  </section>
</template>

<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
import SearchMixin from "~/components/mixins/search.mixin"
import IconClose from "./icons/IconClose";

export default {
  name: 'GoSearch',
  components: {IconClose},
  mixins: [CategoriesMixin, SearchMixin],
  methods: {
    linkHub() {
      var host = window.location.host
      if (this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/profile`;
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    hide() {
      this.$modal.hide('GoSearch');
    },
  }
}
</script>
