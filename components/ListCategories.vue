<template>
  <div class=" px-2 py-2 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <NuxtLink :to="categoryLink(category)">
        {{depthSpaces(depth)}} {{ category.name }}
      </NuxtLink>
    <ListCategories
        v-for="category in category.categories"
        :category="category"
        :depth="depth + acc"
        :key="category.id"
    />
  </div>

</template>


<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
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
  methods: {
    categoryLink(category) {
      const result = this.parentIter(category, category.alias);
      return `/feed/${result}`;
    },
    depthSpaces(depth){
      return '-'.repeat(depth - 1);
    },
  }
}
</script>
