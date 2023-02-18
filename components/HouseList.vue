<template>
  <div class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
    <div class="mx-auto flex flex-col w-full">
      <nav class="flex justify-start items-center mt-3 mb-1.5">
        <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
          <li class="leading-6">
            <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Недвижимость</NuxtLink>
          </li>
          <li><span class="px-2 text-gray-500">/</span></li>
          <li class="leading-6">
            <p class="text-gray-500 hover:text-black">Новостройки</p>
          </li>
        </ul>
      </nav>
      <article v-for="house in houses" :key="house.id"
               class="p-1 group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
        <NuxtLink :to="getUrlRealty(house)">
          <section class="grid grid-cols-[250px,450px,_1fr]">
            <section>
              <img class="w-full rounded-lg bg-cover" :src="getPhoto(house)" :alt="house.name">
            </section>
            <section class="flex flex-col pl-5 pr-10">
              <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">
                {{ house.name }}
              </h2>

              <p class="mt-2.5 text-sm text-gray-500">{{ house.full_address }}</p>

              <h3 class="mt-1 text-sm text-gray-500">{{ getActionUser(realty) }} {{ getUserName(realty) }}</h3>

            </section>
            <section class="grid grid-cols-2 gap-4 items-center text-sm">
              <ul class="text-gray-500 leading-9">
                <li>Элитный</li>
                <li>Отделка</li>
                <li>Тип дома</li>
                <li>Срок сдачи</li>
              </ul>
              <ul class="text-gray-500 leading-9">
                <li class="mt-1 text-gray-500">{{ getElite(house) }}
                </li>
                <li>{{ getFinishing(house) }}</li>
                <li>{{ getType(house) }}</li>
                <li>{{ getDeadline(house) }} {{ house.date_build }}</li>
              </ul>
            </section>
          </section>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({ skip: houses.length, from: 'cabinet', category_ids: '382,381'})"
              type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
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
      return `/houses/${house.id}`;
    },
    getUrlRealty(house) {
      return `/houses/${house.id}/new-build`;
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
