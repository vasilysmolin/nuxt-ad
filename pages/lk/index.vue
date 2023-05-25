<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
    </div>
    <section class="container flex flex-col items-center mt-[20px] pb-10">
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <article v-for="ad in ads" :key="ad.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
          <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ ad.name }}</h2>
          <img :src="ad.image" :alt="ad.name">
          <p class="text-sm">{{ ad.text }}</p>
          <NuxtLink :to="getUrl(ad)">
            <div class="flex justify-between mt-2 w-full">
              <button
                  class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Редактировать
              </button>
            </div>
          </NuxtLink>
        </article>
      </section>
      <NuxtLink :to="`/ads/new`">
        <button type="button"
                class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Добавить объявление
        </button>
      </NuxtLink>
    </section>
  </section>
</template>

<script>

import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: 'LkIndex',
  layout: 'default',
  head: {
    title: "ЛК",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  async mounted() {
    if (this.$route.query.from) {
      this.from = this.$route.query.from;
    }
    this.user = _.cloneDeep(this.$auth.user);
    await this.$store.dispatch('myAds/getItems');
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
      },
    }
  },
  computed: {
    ...mapGetters({
      ads: 'myAds/ads',
    }),
  },
  middleware: ['auth'],
  methods: {
    getUrl(ad) {
      return ad.slug
    },
  },

}

</script>
