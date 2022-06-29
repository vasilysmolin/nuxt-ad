<template>
  <section v-if="isLoading">
    <div class="flex mb-4 sm:max-w-screen-sm">
      <h1>{{title}}</h1>
    </div>
    <div v-if="hasCategories()" class="flex flex-wrap justify-left space-x-2 mb-5">
      <nuxt-link :to="path(item)" class="px-4 py-2 rounded-full text-gray-500 bg-gray-200
            font-semibold text-sm flex align-center w-max cursor-pointer
            active:bg-gray-300 transition duration-300  mb-2" v-for="item in getCategories()" :key="item.id">
        {{ item.name }}
      </nuxt-link>

    </div>
  </section>
</template>

<script>
import * as _ from "lodash";
export default {
  name: "BCategoriesNav",
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    });
  },
  props: {
    title: String,
    category: Object,
  },
  computed: {
  },
  methods: {
    path(item){
      return item.alias;
    },
    getCategories(){
      return this.category?.categories
    },
    hasCategories(){
      return !_.isEmpty(this.category?.categories);
    }
  },

}
</script>
