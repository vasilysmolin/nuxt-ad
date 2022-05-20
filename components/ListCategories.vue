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
  <article :class="`break-inside article-card-catalog-index bg-[${getColor(category)}]`">
    <h2><nuxt-link :to="categoryLink(category)" class="border-b-[1px] border-gray-400 hover:text-blue-700">{{ category.name }}</nuxt-link></h2>
    <h3 class="text-gray-500">{{ category.description }}</h3>
    <hr class="my-3">
    <ul v-for="category in category.categories " class="list-disc list-inside leading-7">
      <li><nuxt-link :to="categoryLink(category)"  class="text-blue-700 hover:text-black">{{ category.name }}</nuxt-link></li>
    </ul>
<!--    &lt;!&ndash; block hidden default&ndash;&gt;-->
<!--    <ul class="list-disc list-inside leading-7">-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Квартиры</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Комнаты</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Коммерческая недвижимость</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Гаражи и машиноместа</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Офисные помещения</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Квартиры</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Комнаты</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Коммерческая недвижимость</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Гаражи и машиноместа</nuxt-link></li>-->
<!--      <li><nuxt-link to="" class="text-blue-700 hover:text-black">Офисные помещения</nuxt-link></li>-->
<!--    </ul>-->
<!--    <div class="mt-3 flex justify-center items-center w-full cursor-pointer rotate-180">-->
<!--      <OpenClose/>-->
<!--    </div>-->
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
    depthSpaces(depth){
      return '-'.repeat(depth - 1);
    },
    getColor(category){
      return category?.color?.hash ?? '#ffffff';
    }
  }
}
</script>
