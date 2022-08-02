<template>
  <section v-if="isLoading">
    <template v-if="$device.isDesktop">
      <div v-if="hasCategories()"  class="fixed top-[147px] left-2 px-2 pb-2 w-[245px] rounded-lg bg-[#eeeeee]">
        <ul class="grid grid-cols-1">
          <li v-for="item in getCategories()" :key="item.id">
            <nuxt-link :to="path(item)" class="pt-2.5 flex flex-col flex-wrap justify-start leading-snug text-blue-600 text-sm hover:text-black transition duration-150 ease-in-out">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </template>
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
      if(this.$route.path === '/feed') {
        return `feed/${item.alias}`;
      }
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
