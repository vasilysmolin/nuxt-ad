<template>
  <section class="container flex flex-col items-center mt-[100px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <!--
      <button @click="linkHub" type="button"
              class="fixed btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
        Разместить бесплатно
      </button>
      -->
      <article v-for="ad in ads" :key="ad.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="getUrl(ad)">
          <section class="grid grid-cols-[25%,_1fr]">
            <section>
              <img class="w-full rounded-lg" :src="getPhoto(ad)" :alt="ad.name">
            </section>
            <section class="flex flex-col justify-between pl-4">
              <h2 class="first-letter:uppercase font-bold sm:font-black text-[0.75rem] leading-tight sm:leading-5 sm:text-lg">{{ ad.name }}</h2>
              <h3 class="mt-1 text-sm sm:text-lg"><span class=" pr-1 text-xs">от</span>{{ ad.price }}<span
                  class="pl-1 text-xs">руб.</span></h3>
            </section>
          </section>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({skip: ads.length, state: 'active', expand: 'profile.user', alias: alias })" type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "CatalogList",
  props: {
    type: String,
  },
  data() {
    return {
      alias: null
    }
  },
  async mounted() {
    const sub = this.$route.fullPath.split('/').pop();
    this.alias = sub !== 'feed' ? sub : null;
    // if (this.ads.length === 0) {
      await this.getItems({state: 'active', expand: 'profile.user', alias: this.alias});
    // }
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads',
      amount: 'ads/amount'
    }),
    checkAmount(){
      return this.ads.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'ads/getItems',
      addItems: 'ads/addItems',
    }),
    getUrl(ad) {
      return `/feed/alias/${ad.alias}`
    },
    getUsername(catalog) {
      return catalog?.profile?.user?.name
    },
    getPhoto(ad) {
      return ad.photo ?? 'https://storage.yandexcloud.net/tapigo-static/empty.png';
    },
    linkHub() {
      if(this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/catalog/new`;
      } else {
        document.location.href = `${process.env.AUTH_URL}?from=${process.env.HUB_URL}/catalog/new`;
      }
    },
  },

}
</script>
