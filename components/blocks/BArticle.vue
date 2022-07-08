<template>
  <nuxt-link :to="categoryLink(category)">
    <article v-if="isLoading"  class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
      <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
      <h2 class="mt-6 text-xs font-bold">{{ category.name }}</h2>
    </article>
  </nuxt-link>
</template>

<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
export default {
  name: "BArticle",
  data() {
    return {
      isLoading: false,
    }
  },
  mixins: [CategoriesMixin],
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    });
  },
  props: {
    category: Object,
  },
  methods: {
    categoryLink(category) {
      const result = this.parentIter(category, category.alias);
      return `/feed${result}`;
    },
  },

}
</script>
