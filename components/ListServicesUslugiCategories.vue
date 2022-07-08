<template>
  <section>
    <section class="mt-7 grid grid-cols-2 gap-6">
      <BArticle
          v-for="category in firstChunkCategories"
          :category="category"
          :key="category.id"
      />
    </section>
    <div v-if="isShow" @click="addCategories()" class="flex justify-center items-center mt-7 w-full rotate-180">
      <ArrowClick/>
    </div>

  </section>
</template>


<script>
import ArrowClick from "./icons/ArrowClick";
import BArticle from "~/components/blocks/BArticle";
import * as _ from "lodash";

export default {
  name: "ListServicesUslugiCategories",
  components: {ArrowClick,BArticle},
  data() {
    return {
      isShow: true,
      firstChunkCategories: [],
      secondChunkCategories: [],
    }
  },
  async mounted() {
    if(this.categories.length === 0) {
      await this.$store.dispatch('categoriesService/getItems', {from: 'catalog'}).then(() => {
        this.firstChunkCategories = _.take(this.categories, 6);
        this.secondChunkCategories = _.slice(this.categories, 6);
      });
    } else {
      this.firstChunkCategories = _.take(this.categories, 6);
      this.secondChunkCategories = _.slice(this.categories, 6);
    };
  },
  methods: {
    addCategories(){
      this.isShow = false;
      this.firstChunkCategories = [...this.firstChunkCategories, ...this.secondChunkCategories];
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
