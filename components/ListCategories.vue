<template>
<!--  <div class=" px-2 py-2 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">-->
<!--      <NuxtLink :to="categoryLink(category)">-->
<!--        {{depthSpaces(depth)}} {{ category.name }}-->
<!--      </NuxtLink>-->
<!--    <ListCategories-->
<!--        v-for="category in category.categories"-->
<!--        :category="category"-->
<!--        :depth="depth + acc"-->
<!--        :key="category.id"-->
<!--    />-->
<!--  </div>-->
  <article v-bind:class="`break-inside article-card-catalog-index bg-[${getColor(category)}]`">
    <h2><nuxt-link :to="categoryLink(category)" :class="`border-b-[1px] border-gray-400 ${getColorH1(category)}`">{{ category.name }}</nuxt-link></h2>
    <h3 class="text-gray-500">{{ category.description }}</h3>
    <hr class="my-3">
    <ul v-for="cat in category.categories " class="list-disc list-inside leading-7">
      <li><nuxt-link :to="categoryLink(cat)"  :class="`${getColorLi(category)}`">{{ cat.name }}</nuxt-link></li>
    </ul>
  </article>

</template>


<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
import OpenClose from "../components/icons/OpenClose";
import * as _ from "lodash";
export default {
  name: "ListCategories",
  props:  ['depth', "category"],
  data() {
    return {
      acc: 1,
    }
  },
  mixins: [CategoriesMixin],
  components: {OpenClose},
  methods: {
    categoryLink(category) {
      const result = this.parentIter(category, category.alias);
      return `/feed${result}`;
    },
    // depthSpaces(depth){
    //   return '-'.repeat(depth - 1);
    // },
    getColor(category){
      return category?.color?.hash ?? '#ffffff';
    },
    getColorH1(category){
      if(category?.color?.hash) {
        return 'text-gray-400 hover:text-gray-700';
      } else {
        return 'hover:text-blue-700';
      }
    },
    getColorLi(category){
      if(category?.color?.hash) {
        return 'text-blue-300 hover:text-blue-500';
      } else {
        return 'text-blue-700 hover:text-blue-800';
      }
    }
  }
}
</script>
