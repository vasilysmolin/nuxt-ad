<template>
  <article class="container flex flex-col items-center mt-[10px] sm:mt-[20px] pb-10">

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ vacancy.name }}</h1>
      <!--<h2>Имя соискателя</h2>-->
      <p class="mt-2 text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ vacancy.min_price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-gray-600">Контактное лицо</h2>
      <p class="mt-2 font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ vacancy.phone }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Обязанности</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.duties }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Требования</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.demands }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Дополнительные условия</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.additionally }}</p>
    </section>

  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "VObject",
  layout: 'jobs',
  async mounted() {
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.params.id });
  },
  computed: {
    vacancy() {
      return this.$store.getters['vacancies/vacancy']
    },
    ...mapGetters({
      vacancies: 'vacancies/vacancies'
    }),
  },

  head() {
    return {
      title: `${this.vacancy.title} | Вакансии без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
