<template>
  <section>
    <section class="mt-7 grid grid-cols-2 gap-6">
      <BArticle
          v-for="category in categories"
          :category="category"
          :key="category.id"
      />
    </section>
<!--    <div class="flex justify-center items-center mt-7 w-full rotate-180">-->
<!--      <ArrowClick/>-->
<!--    </div>-->

  </section>
</template>


<script>
import ArrowClick from "./icons/ArrowClick";
import BArticle from "~/components/blocks/BArticle";
import * as _ from "lodash";

export default {
  name: "ListServicesUslugiCategories",
  components: {ArrowClick,BArticle},
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesService/getItems', {from: 'catalog'});
    }
  },
  computed: {
    categories: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesService/categoriesServices']);
      },
      set(category) {
        return category
      }
    },
  },
}

</script>
