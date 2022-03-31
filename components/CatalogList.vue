<template>
  <section class="container flex flex-col items-center mt-[100px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="ad in ads" :key="ad.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="getUrl(ad)">
          <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ ad.name }}</h2>
          <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ ad.price }}<span class="pl-1 text-xs">руб.</span></h3>
          <div class="flex justify-between w-full">
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
          </div>
        </NuxtLink>

      </article>
      <button @click="addItems({skip: ads.length})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "CatalogList",
  props: {
    type: String,
  },
  async mounted() {
    if(this.ads.length === 0) {
      await this.getItems({status: 'active'});
    }
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads'
    }),

  },
  methods: {
    ...mapActions({
        getItems: 'ads/getItems',
        addItems: 'ads/addItems',
      }),
    getUrl(ad) {
      let cat = `/feed/${ ad.categories ? ad.categories.alias : 'none'}`;
      return  cat + '/' + `${ ad.alias}`
    }
  },

}
</script>
