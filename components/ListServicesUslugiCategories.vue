<template>
  <section>
    <div v-if="$device.isDesktop">
      <span class="mt-12 block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
      <h3 class="mt-10 mb-7 text-center font-bold">Каталог услуг</h3>
      <section class="mt-12 grid grid-cols-4 gap-6">
        <BArticle
            v-for="category in firstChunkCategories"
            :category="category"
            :key="category.id"
        />
      </section>
      <div v-if="isShow" @click="addCategories()" class="flex justify-center items-center mt-7 w-full rotate-180">
        <ArrowClick/>
      </div>
    </div>


    <div v-if="$device.isMobile">
      <span class="mt-7 block mx-auto w-[100%] h-[1px] bg-[#E9E9E9]"></span>
      <h3 class="my-5 text-center text-sm font-bold">Каталог услуг</h3>
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
        this.firstChunkCategories = _.take(this.categories, 8);
        this.secondChunkCategories = _.slice(this.categories, 8);
      });
    } else {
      this.firstChunkCategories = _.take(this.categories, 8);
      this.secondChunkCategories = _.slice(this.categories, 8);
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
