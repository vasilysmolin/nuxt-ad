<template>
  <section class="container flex flex-col items-center pb-10 mt-20">

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="realty in realtiesNew" :key="realty.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/house/${realty.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ realty.name }}</h2>
          <p class="text-sm">Дата создания: {{ format(realty.created_at) }}</p>
          <p class="text-sm">Дата обновления: {{ format(realty.updated_at) }}</p>
          <p class="text-sm">ID: {{ realty.id }}</p>
          <p class="text-sm">Позиция в каталоге: {{ realty.sort }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: realtiesNew.length, state: 'new'})" type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
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
            <option :value="null">
            </option>
            <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key"
                    :selected="key === searchByState">
              {{ value }}
            </option>
          </select>
        </div>
        <button @click="filter" type="button"
                class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Применить фильтр
        </button>

      </div>
      <article v-for="realty in realtiesActive" :key="realty.id"
               class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/house/${realty.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ realty.name }}</h2>
          <p class="text-sm">Дата создания: {{ format(realty.created_at) }}</p>
          <p class="text-sm">Дата обновления: {{ format(realty.updated_at) }}</p>
          <p class="text-sm">ID: {{ realty.id }}</p>
          <p class="text-sm">Позиция в каталоге: {{ realty.sort }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmount"
              @click="addItems({skip: realtiesActive.length, name: searchByName, state: searchByState})" type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </section>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {dateFormat} from "../../helper/dataFormat";
import * as _ from "lodash";

export default {
  name: "HouseAdminList",
  async mounted() {
    if (this.realtiesNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if (this.realtiesActive.length === 0) {
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
      realtiesNew: 'houses/housesNew',
      realtiesActive: 'houses/houses',
      amount: 'houses/amount',
      amountNew: 'houses/amountNew',
      realties: 'houses/houses',
    }),
    states: {
      get() {
        return _.cloneDeep(this.$store.getters['states/states']);
      },
      set(states) {
        return states
      }
    },
    checkAmountNew() {
      return this.realtiesNew.length < this.amountNew;
    },
    checkAmount() {
      return this.realtiesActive.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
      getItems: 'houses/getItems',
      addItems: 'houses/addItems',
    }),
    async filter() {
      await this.getItems({name: this.searchByName, state: this.searchByState});
    },
    format(date) {
      return dateFormat(date);
    },
    getState(realty) {
      return this.states[realty.state];
    },
  },

}
</script>
