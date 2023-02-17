<template>
  <section class="container flex flex-col items-center mt-[20px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <div class="flex justify-between">
        <h1 class="first-letter:uppercase mb-4 w-full text-xl text-black font-black text-center leading-none truncate">
          {{ $t('house.title') }}: {{ house.name }}</h1>
      </div>
      <article v-for="realty in realties" :key="realty.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
        <div class="flex justify-between">
          <h2 v-if="isFlat(realty)"
              class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">
            {{ generateTitle(realty) }}</h2>
          <h2 v-else
              class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">
            {{ realty.name }}</h2>
          <p v-if="realty.external_id" class="text-sm">ID: {{ realty.external_id }}</p>
        </div>
        <p class="text-sm">Статус: {{ getState(realty) }}</p>
        <p class="text-sm">Позиция в каталоге: {{ realty.sort }}</p>
        <div class="flex justify-between">
          <NuxtLink :to="getUrl(realty)" v-if="realty.external_id === null">
            <div class="flex justify-between mt-2 w-full">
              <button
                  class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Редактировать
              </button>
            </div>
          </NuxtLink>
          <a href="#" @click="getUrlCatalog(realty)">
            <div class="flex justify-between mt-2 w-full">
              <button
                  class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Просмотреть
              </button>
            </div>
          </a>
        </div>
      </article>
      <button v-if="checkAmount" @click="addItems({ skip: realties.length, from: 'cabinet', category_ids: '410'})"
              type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </section>
    <NuxtLink :to="getUrlNew(realty)">
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
  name: "RealtyHubList",
  mixins: [CategoriesMixin],
  props: {
    type: String,
  },
  data() {
    return {
      house_id: null,
      realty: null,
    }
  },
  async mounted() {
    this.house_id = this.$route.params.house;
    await this.getItems({from: 'cabinet', category_ids: '410', house_id: this.house_id});
    await this.getItemsState();
    await this.getHouse({id: this.house_id});
  },
  computed: {
    ...mapGetters({
      realties: 'newBuildings/realties',
      house: 'houses/house',
      states: 'states/states',
    }),
    checkAmount() {
      return this.realties.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'newBuildings/getItems',
      getHouse: 'houses/getItem',
      addItems: 'newBuildings/addItems',
      getItemsState: 'states/getItems',
    }),
    getUrl(realty) {
      return `/house/${this.house_id}/new-build/${realty.alias}`
    },
    getUrlNew() {
      return `/house/${this.house_id}/new`
    },
    getUrlCatalog(realty) {
      window.open(`${process.env.REALTY_URL}/feed/alias/${realty.alias}`, '_blank');
    },
    getState(realty) {
      return this.states[realty.state];
    }
  },

}
</script>
