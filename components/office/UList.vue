<template>
  <section class="container flex flex-col items-center pb-10 mt-20">
    <div @click="download">
      <h2 class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Скачать csv</h2>
    </div>
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="user in usersNew" :key="user.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/users/${user.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.name }}</h2>
          <p class="text-sm">Email: {{ user.email }}</p>
          <p class="text-sm">Телефон: {{ user.phone }}</p>
          <p class="text-sm">Статус: {{getState(user)}}</p>
          <p class="text-sm">Дата регистрации: {{ format(user.created_at) }}</p>
          <p class="text-sm">ID: {{ user.id }}</p>
          <p class="text-sm">Тип: {{ getType(user) }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: usersNew.length, state: 'new'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <div class="form-floating mb-6 w-full sm:w-[27rem]">
        <input type="text"
               class="form-control forms-input" id="name"
               placeholder="Имя пользователя"
               v-model="searchByName">
        <label for="name" class="text-[#6E7191]">Имя пользователя</label>

        <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
          <the-mask :mask="['+7 (###) ###-##-##']" v-model="searchByPhone"
                    id="phone"
                    type="text"
                    class="form-control forms-input"
                    placeholder="Телефон" />
          </div>
        <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
          <label class="pl-4 text-gray-500">Статус</label>
          <select class="form-select form-select-lg mt-2 forms-select" v-model="searchByState">
            <option :value="null">
            </option>
            <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === searchByState">
              {{ value }}
            </option>
          </select>
        </div>
        <button @click="filter" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Применить фильтр</button>

      </div>
      <article v-for="user in usersActive" :key="user.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/users/${user.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.name }}</h2>
          <p class="text-sm">Email: {{ user.email }}</p>
          <p class="text-sm">Телефон: {{ user.phone }}</p>
          <p class="text-sm">Статус: {{getState(user)}}</p>
          <p class="text-sm">Дата регистрации: {{ format(user.created_at) }}</p>
          <p class="text-sm">ID: {{ user.id }}</p>
          <p class="text-sm">Тип: {{ getType(user) }}</p>
        </NuxtLink>

      </article>
      <button v-if="checkAmountActive" @click="addItems({skip: usersActive.length, name: searchByName, state: searchByState, phone: searchByPhone })" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import {dateFormat} from "../../helper/dataFormat";
import Person from "~/components/mixins/person.mixin";
export default {
  name: "UList",
  async mounted() {
    if(this.usersNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if(this.usersActive.length === 0) {
      await this.getItems({});
    }
    // if(this.states.length === 0) {
      await this.getItemsState();
    // }


  },
  data() {
    return {
      searchByName: null,
      searchByState: null,
      searchByPhone: null,
    }
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
    async filter() {
      await this.getItems({name: this.searchByName, state: this.searchByState, phone: this.searchByPhone});
    },
    format(date) {
      return dateFormat(date);
    },
    getState(user) {
      return this.states[user.state];
    },
    downloadCsv(csvData, filename) {
      const blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
      });
      const dwldLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
      const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

      //if Safari open in new window to save file with random filename.
      if (isSafariBrowser)
        dwldLink.setAttribute("target", "_blank");

      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename+ ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
    },
    download(){
      this.$axios.$get(`users/download`).then((res) => {
        this.downloadCsv(res, 'users');
      });
    },
  },

}
</script>
