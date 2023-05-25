<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <h1>{{ $t('catalog.h1') }}</h1>
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
                Просмотреть
              </button>
            </div>
          </NuxtLink>
        </article>
      </section>
    </section>
  </section>
</template>

<script>

import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: 'CatalogIndex',
  layout: 'catalog',
  head: {
    title: "catalog",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  async mounted() {
    if (this.$route.query.from) {
      this.from = this.$route.query.from;
    }
    this.user = _.cloneDeep(this.$auth.user);
    await this.$store.dispatch('ads/getItems');
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
      ads: 'ads/ads',
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
