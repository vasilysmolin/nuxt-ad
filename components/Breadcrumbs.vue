<template>
  <div>
    <nav class="rounded-md w-full mt-5">
      <ol class="list-reset flex">
        <template  v-for="item of links">
          <li v-if="!item.last">
            <NuxtLink :to="{path: path(item)}" class="text-blue-600 hover:text-blue-700">{{ item.name }}</NuxtLink>
          </li>
          <li v-else>
            <span class="text-gray-500 mx-2">{{ item.name }}</span>
          </li>
          <li v-if="!item.last"><span class="text-gray-500 mx-2">/</span></li>
        </template>
      </ol>
    </nav>
  </div>

</template>


<script>
import CategoriesMixin from '~/components/mixins/categories.mixin';
import * as _ from "lodash";
export default {
  name: "Breadcrumbs",
  props:  ["baseName","basePath", "link"],
  async mounted() {
    setTimeout(() => {
      this.links.push({path: this.basePath, name: this.baseName});
      const result = this.parentIterator(this.link);
      this.links = [...this.links, ...result];
    },1700);
  },
  data() {
    return {
      links: [],
    }
  },
  mixins: [CategoriesMixin],
  methods: {
    path(item){
      return item.path === '/' ? '/' : `/feed${item.path}`;
    }
  }
}
</script>
