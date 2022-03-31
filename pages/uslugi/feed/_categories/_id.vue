<template>
  <article class="container flex flex-col items-center mt-[130px] pb-10">

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ service.name }}</h1>
      <!--<h2>Имя соискателя</h2>-->
      <p class="mt-2 text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ service.price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>
    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ service.description }}</h1>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-gray-600">Контактное лицо</h2>
      <p class="mt-2 font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ service.phone }}</p>
    </section>


  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "SObject",
  layout: 'service',
  async mounted() {
    console.log(123);
    await this.$store.dispatch('services/getItem', { id: this.$route.params.id });
  },
  computed: {
    service() {
      return this.$store.getters['services/service']
    },
    ...mapGetters({
      services: 'services/services'
    }),
  },

  head() {
    return {
      title: `${this.service.title} | Услуги без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
