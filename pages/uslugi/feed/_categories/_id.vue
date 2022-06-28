<template>
  <article class="container flex flex-col items-center mt-[100px] pb-10">

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="mt-1 mb-2.5">{{types[service.type]}}</p>
      <h1 class="first-letter:uppercase text-[0.9375rem] leading-5 sm:text-xl">{{ service.name }}</h1>
      <p class="text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ service.price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Описание услуги</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ service.description }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Имя:</span>{{ getUserName(service)}}</p>
      <p class="mt-1 font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Телефон:</span>{{ getUserPhone(service)}}</p>
    </section>
<!--
    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Дополнительно</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">Гарантия: {{ service.guarantee }}</p>
      <p class="mt-1 text-sm sm:text-base text-gray-600">Договор: {{ service.contract }}</p>
      <p class="mt-1 text-sm sm:text-base text-gray-600">Консультации: {{ service.consultation }}</p>
      <p class="mt-1 text-sm sm:text-base text-gray-600">Почасовая оплата: {{ service.hourly_payment }}</p>
    </section>
-->

  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "SObject",
  layout: 'default',
  async mounted() {
    await this.$store.dispatch('typeServices/getItems');
    await this.$store.dispatch('services/getItem', { id: this.$route.params.id, expand: 'profile.user,profile.person'  });
  },
  methods: {
    getUserName(service) {
      if(service?.profile?.isPerson === true) {
        return service?.profile?.person?.name;
      }
      return service?.profile?.user?.name;
    },
    getUserPhone(service) {
      return service?.profile?.user?.phone
    },
  },
  computed: {
    service() {
      return this.$store.getters['services/service']
    },
    ...mapGetters({
      services: 'services/services'
    }),
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeServices/types']);
      },
      set(types) {
        return types
      }
    },
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
