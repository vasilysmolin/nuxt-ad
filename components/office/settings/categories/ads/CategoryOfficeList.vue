<template>
  <section class="container flex flex-col items-center pb-10 mt-20">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <div class="form-floating mb-6 w-full sm:w-[27rem]">
        <input type="text"
               class="form-control forms-input" id="price"
               placeholder="Название"
               v-model="searchByName">
        <label for="price" class="text-[#6E7191]">Название</label>
        <button @click="filter" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal lecategorying-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Применить фильтр</button>

      </div>
      <article v-for="category in categories" :key="category.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/settings/categories/ads/${category.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] lecategorying-5 sm:text-lg">{{ category.name }}</h2>
        </NuxtLink>

      </article>
      <button v-if="checkAmount" @click="addItems({skip: categories.length, name: searchByName})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal lecategorying-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

import * as _ from "lodash";
export default {
  name: "CategoryOfficeList",
  async mounted() {
    if(this.categories.length === 0) {
      await this.getItems({from: 'catalog'});
    }

  },
  data() {
    return {
      searchByName: null,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesAd/categoriesAds',
    }),

    checkAmount(){
      return this.categories.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'categoriesAd/getItems',
        addItems: 'categoriesAd/addItems',
      }),
    async filter() {
      await this.getItems({name: this.searchByName, state: this.searchByState});
    },
  },

}
</script>
