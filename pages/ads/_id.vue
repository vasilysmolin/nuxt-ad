<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <h1>{{ ad.user.name }}</h1>
    </div>
    <section class="container flex flex-col items-center mt-[20px] pb-10">
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <article class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
          <img :src="ad.image" :alt="ad.name">
          <p class="text-sm">{{ ad.text }}</p>

          <div v-for="image in ad.images" :key="ad.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
            <img :src="image.crop" :alt="ad.name">
          </div>
        </article>
      </section>
    </section>
  </section>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: "Ad",
  layout: 'default',
  middleware: ['auth'],
  head: {
    title: "Объявление",
  },
  data() {
    return {
      query: '',
      data: {
        name: '',
        text: null,
        images: [],
      },
      files: [],
      isDisabled: false,
    }
  },
  beforeDestroy() {
    this.parameters = {};
  },
  async mounted() {
    await this.$store.dispatch('ads/getItem').then(() => {
      this.data = _.cloneDeep(this.$store.getters['ads/ad']);
    });
  },
}
</script>
