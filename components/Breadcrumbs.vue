<template>
    <nav class="flex mb-4 sm:max-w-screen-sm">
      <ul class="flex justify-start items-center flex-wrap text-[12px] list-reset">
        <template  v-for="item of links">
          <li class="leading-6" v-if="!item.last">
            <NuxtLink :to="{path: path(item)}" class="text-blue-600 hover:text-blue-700">{{ item.name }}</NuxtLink>
          </li>
          <li v-else>
            <span class="text-gray-500">{{ item.name }}</span>
          </li>
          <li v-if="!item.last"><span class="px-2 text-gray-500">/</span></li>
        </template>
      </ul>
    </nav>
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
      return item.path === '/'?'/':`/feed${item.path}`;
    }
  }
}
</script>
