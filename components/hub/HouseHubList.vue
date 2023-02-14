<template>
  <section class="container flex flex-col items-center mt-[20px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="house in houses" :key="house.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
        <div class="flex justify-between">
          <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">
            {{ house.name }}</h2>
        </div>
        <p class="text-sm">Статус: {{ getState(house) }}</p>
        <p class="text-sm">Позиция в каталоге: {{ house.sort }}</p>
        <div class="flex justify-between">
          <NuxtLink :to="getUrl(house)">
            <div class="flex justify-between mt-2 w-full">
              <button
                  class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Редактировать
              </button>
            </div>
          </NuxtLink>
          <NuxtLink :to="getUrlRealty(house)">
            <div class="flex justify-between mt-2 w-full">
              <button
                  class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Список новостроек
              </button>
            </div>
          </NuxtLink>
        </div>
      </article>
      <button v-if="checkAmount" @click="addItems({ skip: houses.length, from: 'cabinet', category_ids: '382,381'})"
              type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </section>
    <NuxtLink :to="`/house/new`">
      <button type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Добавить объявления
      </button>
    </NuxtLink>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';

export default {
  name: "HouseHubList",
  mixins: [CategoriesMixin],
  props: {
    type: String,
  },
  async mounted() {
    await this.getItems({from: 'cabinet'});
    await this.getItemsState();
  },
  computed: {
    ...mapGetters({
      houses: 'houses/houses',
      states: 'states/states',
    }),
    checkAmount() {
      return this.houses.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'houses/getItems',
      addItems: 'houses/addItems',
      getItemsState: 'states/getItems',
    }),
    getUrl(house) {
      return `/house/${house.id}`;
    },
    getUrlRealty(house) {
      return `/house/${house.id}/new-build`;
    },
    getState(house) {
      return this.states[house?.state];
    }
  },

}
</script>
