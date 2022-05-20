<template>
  <section class="container flex flex-col items-center pb-10 mt-20">
    <NuxtLink :to="`/settings/colors/new`">
      <h2 class="first-letter:uppercase font-bold text-[0.9375rem] lecoloring-5 sm:text-lg">+ Добавить цвет</h2>
    </NuxtLink>
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <div class="form-floating mb-6 w-full sm:w-[27rem]">
        <input type="text"
               class="form-control forms-input" id="price"
               placeholder="Название"
               v-model="searchByName">
        <label for="price" class="text-[#6E7191]">Название</label>
        <button @click="filter" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal lecoloring-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Применить фильтр</button>

      </div>
      <article v-for="color in colors" :key="color.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/settings/colors/${color.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] lecoloring-5 sm:text-lg">{{ color.name }}</h2>
        </NuxtLink>

      </article>
      <button v-if="checkAmount" @click="addItems({skip: colors.length})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal lecoloring-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

import * as _ from "lodash";
export default {
  name: "ColorsOfficeList",
  async mounted() {
    if(this.colors.length === 0) {
      await this.getItems({});
    }

  },
  data() {
    return {
      searchByName: null,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'colors/colors',
    }),

    checkAmount(){
      return this.colors.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'colors/getItems',
        addItems: 'colors/addItems',
      }),
    async filter() {
      await this.getItems({name: this.searchByName});
    },
  },

}
</script>
