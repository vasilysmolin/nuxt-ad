<template>
  <article class="container flex flex-col items-center mt-[100px] pb-10">
    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ ad.name }}</h1>
      <!--<h2>Имя соискателя</h2>-->
      <p class="mt-2 text-xl sm:text-2xl font-bold">{{ ad.price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Контакт:</span>{{ getUsername(ad)}}</p>
      <p class="mt-1 font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Телефон:</span>{{ getUserPhone(ad)}}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Описание</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ ad.description }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Фотографии</h2>
      <section class="mt-4 grid grid-cols-2 gap-4 w-full">
      <div v-for="photo in ad.photos">
        <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
      </div>
      </section>
    </section>
  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "CObject",
  layout: 'catalog',
  async mounted() {
    await this.$store.dispatch('ads/getItem', { id: this.$route.params.id, expand: 'profile.user'  });
  },
  methods: {
    getUsername(catalog) {
      return catalog?.profile?.user?.name
    },
    getUserPhone(catalog) {
      return catalog?.profile?.user?.phone
    },
  },
  computed: {
    ad() {
      return this.$store.getters['ads/ad']
    },
    ...mapGetters({
      ads: 'ads/ads'
    }),
  },

  head() {
    return {
      title: `${this.ad.title} | Объявления без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
