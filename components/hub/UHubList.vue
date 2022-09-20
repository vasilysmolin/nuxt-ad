<template>
  <section class="container flex flex-col items-center mt-[20px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="service in services" :key="service.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
        <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ service.name }}</h2>
        <p class="text-sm">Статус: {{getState(service)}}</p>
        <p class="text-sm">Позиция в каталоге: {{service.sort}}</p>
        <NuxtLink :to="getUrl(service)">
          <div class="flex justify-between mt-2 w-full">
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Редактировать</button>
          </div>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({ skip: services.length, from: 'cabinet'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
    <NuxtLink :to="`/uslugi/new`">
      <button type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить услугу</button>
    </NuxtLink>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "UHubList",
  props: {
    type: String,
  },
  async mounted() {
    // if (this.services.length === 0) {
    await this.getItems({from: 'cabinet'});
    await this.getItemsState();
    // }
  },
  computed: {
    ...mapGetters({
      services: 'services/services',
      states: 'states/states',
    }),
    checkAmount(){
      return this.services.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'services/getItems',
      addItems: 'services/addItems',
      getItemsState: 'states/getItems',
    }),
    getUrl(service) {
      let cat = `/uslugi/${service.categories ? service.categories.alias : 'none'}`;
      return cat + '/' + `${service.alias}`
    },
    getState(service) {
      return this.states[service.state];
    }
  },

}
</script>
