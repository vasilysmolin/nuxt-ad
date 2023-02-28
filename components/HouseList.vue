<template>
  <div class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
    <div class="mx-auto flex flex-col w-full">
      <nav class="flex justify-start items-center mb-1.5">
        <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
          <li class="leading-6">
            <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Недвижимость</NuxtLink>
          </li>
          <li><span class="px-2 text-gray-500">/</span></li>
          <li class="leading-6">
            <p class="text-black">Новостройки</p>
          </li>
        </ul>
      </nav>


      <section class="mt-[10px]">
        <h1 class="inline-block text-2xl font-black leading-none">Все новостройки</h1>
        <section class="mt-5 grid grid-cols-2 gap-12">
          <article v-for="house in houses" :key="house.id" class="group flex flex-col rounded-lg bg-white transition duration-150 ease-in-out">
            <NuxtLink :to="getUrlRealty(house)">
              <section class="flex flex-col">
                <section class="w-full max-h-[350px]">
                  <img class="w-full rounded-t-lg h-[350px] saturate-50" :src="getPhoto(house)" :alt="house.name">
                </section>
                <section class="flex flex-col px-5 pb-6">
                  <h2 class="mt-2.5 font-black text-2xl">
                    {{ house.name }}
                  </h2>
                  <p class="mt-2.5 text-sm text-gray-500">{{ house.full_address }}</p>
                  <p class="mt-2 text-sm text-black">Срок сдачи<span class="pl-3"></span>{{ getDeadline(house) }}. {{ house.date_build }} г.</p>
                </section>
              </section>
            </NuxtLink>
          </article>
        </section>
      </section>


      <button v-if="checkAmount" @click="addItems({ skip: houses.length, from: 'cabinet', category_ids: '382,381'})"
              type="button"
              class="btn btn-primary block mx-auto mt-10 px-5 py-2.5 w-[220px] bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
        Смотреть дальше
      </button>
    </div>
  </div>

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
    await this.getItems({});
    await this.getItemsState();
    if (Object.keys(this.$store.getters['finishing/finishing']).length === 0) {
      await this.$store.dispatch('finishing/getItems');
    }
    if (Object.keys(this.$store.getters['typeHouse/typeHouse']).length === 0) {
      await this.$store.dispatch('typeHouse/getItems');
    }
    if (Object.keys(this.$store.getters['deadLine/deadLine']).length === 0) {
      await this.$store.dispatch('deadLine/getItems');
    }
    if (Object.keys(this.$store.getters['elite/elite']).length === 0) {
      await this.$store.dispatch('elite/getItems');
    }
  },
  computed: {
    ...mapGetters({
      houses: 'houses/houses',
      states: 'states/states',
      finishing: 'finishing/finishing',
      typeHouse: 'typeHouse/typeHouse',
      deadline: 'deadLine/deadLine',
      elite: 'elite/elite',
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
      return `/houses/${house.alias}`;
    },
    getUrlRealty(house) {
      return `/houses/${house.alias}`;
    },
    getElite(house) {
      return this.elite[house.elite] ?? '';
    },
    getFinishing(house) {
      return this.finishing[house.finishing] ?? '';
    },
    getType(house) {
      return this.typeHouse[house.type] ?? '';
    },
    getDeadline(house) {
      return this.deadline[house.deadline] ?? '';
    },
    getState(house) {
      return this.states[house?.state];
    }
  },

}
</script>
