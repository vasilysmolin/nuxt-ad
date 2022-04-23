<template>
  <div>
    <NuxtLink :to="categoryLink(category)">
<!--      <li>{{depth + acc}} {{ category.name }}</li>-->
      <li>{{ category.name }}</li>
      <ListCategories
          v-for="category in category.categories"
          :category="category"
          :depth="depth + acc"
      />
    </NuxtLink>
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
    }
  }
}
</script>
