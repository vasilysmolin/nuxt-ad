<template>
  <section class="container flex flex-col items-center pb-10 mt-20">

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="service in servicesNew" :key="service.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/uslugi/${service.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ service.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(service.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ service.id }}</h3>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: servicesNew.length, state: 'new'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <div class="form-floating mb-6 w-full sm:w-[27rem]">
        <input type="text"
               class="form-control forms-input" id="price"
               placeholder="Зарплата"
               v-model="searchByName">
        <label for="price" class="text-[#6E7191]">Название</label>
        <button @click="filter" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Применить фильтр</button>

      </div>
      <article v-for="service in servicesActive" :key="service.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/uslugi/${service.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ service.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(service.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ service.id }}</h3>
        </NuxtLink>

      </article>
      <button v-if="checkAmount" @click="addItems({skip: servicesActive.length, name: searchByName})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "UAdminList",
  async mounted() {
    if(this.servicesNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if(this.servicesActive.length === 0) {
      await this.getItems({});
    }

  },
  computed: {
    ...mapGetters({
      servicesNew: 'services/servicesNew',
      servicesActive: 'services/services',
      amount: 'services/amount',
      amountNew: 'services/amountNew',
    }),
    checkAmountNew(){
      return this.servicesNew.length < this.amountNew;
    },
    checkAmount(){
      return this.servicesActive.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'services/getItems',
        addItems: 'services/addItems',
      }),
    async filter() {
      await this.getItems({name: this.searchByName});
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
    }
  },

}
</script>
