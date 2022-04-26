<template>
  <section class="container flex flex-col items-center pb-10 mt-20">

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="ad in adsNew" :key="ad.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/catalog/${ad.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ ad.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(ad.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ ad.id }}</h3>
          <p class="text-sm">Статус: {{getState(ad)}}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: adsNew.length, state: 'new'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <div class="form-floating mb-6 w-full sm:w-[27rem]">
        <input type="text"
               class="form-control forms-input" id="price"
               placeholder="Зарплата"
               v-model="searchByName">
        <label for="price" class="text-[#6E7191]">Название</label>
        <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
          <label class="pl-4 text-gray-500">Статус</label>
          <select class="form-select form-select-lg mt-2 forms-select" v-model="searchByState">
            <option :value="null" :selected="key === searchByState">
            </option>
            <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === searchByState">
              {{ value }}
            </option>
          </select>
        </div>
        <button @click="filter" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Применить фильтр</button>

      </div>
      <article v-for="ad in adsActive" :key="ad.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/catalog/${ad.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ ad.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(ad.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ ad.id }}</h3>
          <p class="text-sm">Статус: {{getState(ad)}}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmount" @click="addItems({skip: adsActive.length, name: searchByName, state: this.searchByState})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import * as _ from "lodash";
export default {
  name: "CAdminList",
  async mounted() {
    if(this.adsNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if(this.adsActive.length === 0) {
      await this.getItems({});
    }
    await this.$store.dispatch('states/getItems');

  },
  data() {
    return {
      searchByName: null,
      searchByState: null,
    }
  },
  computed: {
    ...mapGetters({
      adsNew: 'ads/adsNew',
      adsActive: 'ads/ads',
      amount: 'ads/amount',
      amountNew: 'ads/amountNew',
      ads: 'ads/ads',
    }),
    states: {
      get(){
        return _.cloneDeep(this.$store.getters['states/states']);
      },
      set(states){
        return states
      }
    },
    checkAmountNew(){
      return this.adsNew.length < this.amountNew;
    },
    checkAmount(){
      return this.adsActive.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'ads/getItems',
        addItems: 'ads/addItems',
      }),
    async filter() {
      await this.getItems({name: this.searchByName, state: this.searchByState});
    },
    dateFormat(date) {
      if(date) {
        var dates = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return formatter.format(dates);
      }
    },
    getState(ad) {
      return this.states[ad.state];
    },
  },

}
</script>
