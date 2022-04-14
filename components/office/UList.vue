<template>
  <section class="container flex flex-col items-center pb-10 mt-20">

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="user in usersNew" :key="user.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/users/${user.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.name }}</h2>
          <p class="text-sm">Email: {{ user.email }}</p>
          <p class="text-sm">Статус: {{getState(user)}}</p>
          <p class="text-sm">Дата регистрации: {{ dateFormat(user.created_at) }}</p>
          <p class="text-sm">ID: {{ user.id }}</p>
          <p class="text-sm">Тип: {{ getType(user) }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: usersNew.length, state: 'new'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Активные</h1>
      <article v-for="user in usersActive" :key="user.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/users/${user.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.name }}</h2>
          <p class="text-sm">Email: {{ user.email }}</p>
          <p class="text-sm">Статус: {{getState(user)}}</p>
          <p class="text-sm">Дата регистрации: {{ dateFormat(user.created_at) }}</p>
          <p class="text-sm">ID: {{ user.id }}</p>
          <p class="text-sm">Тип: {{ getType(user) }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountActive" @click="addItems({skip: usersActive.length, state: 'active'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import Person from "~/components/mixins/person.mixin";
export default {
  name: "UList",
  async mounted() {
    if(this.usersNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if(this.usersActive.length === 0) {
      await this.getItems({state: 'active'});
    }
    // if(this.states.length === 0) {
      await this.getItemsState();
    // }


  },
  mixins: [Person],
  computed: {
    ...mapGetters({
      usersNew: 'users/usersNew',
      usersActive: 'users/users',
      amount: 'users/amount',
      amountNew: 'users/amountNew',
      states: 'states/states',
    }),
    checkAmountNew(){
        return this.usersNew.length < this.amountNew;
    },
    checkAmountActive(){
        return this.usersActive.length < this.amount;
    },
  },
  methods: {
    ...mapActions({
        getItems: 'users/getItems',
        addItems: 'users/addItems',
        getItemsState: 'states/getItems',
      }),
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
    getState(user) {
      return this.states[user.state];
    },
  },

}
</script>
