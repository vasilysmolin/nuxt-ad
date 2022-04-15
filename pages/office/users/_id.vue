<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          пользователя</h1>
        <article>
          <section>
            <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.name }}</h2>
            <p class="text-sm">Email: {{ user.email }}</p>
            <p class="text-sm">Статус: {{getState(user)}}</p>
            <p class="text-sm">Дата регистрации: {{ format(user.created_at) }}</p>
            <p class="text-sm">ID: {{ user.id }}</p>
            <p class="text-sm">Тип: {{ getType(user) }}</p>
            <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
              <label class="pl-4 text-gray-500">Модерация</label>
              <select class="form-select form-select-lg mt-2 forms-select" v-model="user.state">
                <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === user.state">
                  {{ value }}
                </option>
              </select>
            </div>
            <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>
          </section>
          <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
            <h2 class="font-bold text-lg">Вакансии</h2>
            <article v-for="vacancy in vacancies" :key="vacancy.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-green-100">
              <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ vacancy.name }}</h2>
              <p class="text-sm">Статус: {{getState(vacancy)}}</p>
              <p class="text-sm">Позиция в каталоге: {{vacancy.sort}}</p>
              <NuxtLink :to="`/jobs/vacancies/${vacancy.id}`">
                <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Редактировать</button>
              </NuxtLink>
            </article>
            <button v-if="checkAmountV" @click="addVacancies({skip: vacancies.length, user_id: user.id, state: null})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
          </section>
          <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
            <h2 class="font-bold text-lg">Резюме</h2>
            <article v-for="resume in resumes" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-green-100">
              <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
              <p class="text-sm">Статус: {{getState(resume)}}</p>
              <p class="text-sm">Позиция в каталоге: {{resume.sort}}</p>
              <NuxtLink :to="`/jobs/resume/${resume.id}`">
                <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Редактировать</button>
              </NuxtLink>
            </article>
            <button v-if="checkAmountR" @click="addResumes({skip: resumes.length, user_id: user.id, state: null})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
          </section>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapActions, mapGetters} from "vuex";
import Person from "~/components/mixins/person.mixin";
import {dateFormat} from "../../../helper/dataFormat";

export default {
  name: "VUser",
  layout: 'office',
  head: {
    title: "Office user",
    meta: [
      {hid: 'description', name: 'description', content: 'user'}
    ]
  },
  async mounted() {
    await this.$store.dispatch('users/getItem', { id: this.$route.params.id });
    await this.$store.dispatch('vacancies/getItems', { user_id: this.$route.params.id, state: null });
    await this.$store.dispatch('resumes/getItems', { user_id: this.$route.params.id, state: null });
    await this.$store.dispatch('states/getItems');
    await this.getItemsState();
  },
  data() {
    return {
      person: {
        inn: null,
        name: 'тест',
      }
    }
  },
  mixins: [Person],
  computed: {
    user() {
      return _.cloneDeep(this.$store.getters['users/user']);
    },
    checkAmountR(){
      return this.resumes.length < this.amountR;
    },
    checkAmountV(){
      return this.vacancies.length < this.amountL;
    },
    states: {
      get(){
        return _.cloneDeep(this.$store.getters['states/states']);
      },
      set(states){
        return states
      }
    },
    ...mapGetters({
      users: 'users/users',
      vacancies: 'vacancies/vacancies',
      resumes: 'resumes/resumes',
      amountR: 'resumes/amount',
      amountL: 'vacancies/amount',
      states: 'states/states',
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'users/getItems',
      addItems: 'users/addItems',
      addResumes: 'resumes/addItems',
      addVacancies: 'vacancies/addItems',
      getItemsState: 'states/getItems',
    }),
    submitted() {
      this.$axios.$put(`users/${this.user.id}`, {state: this.user.state});
    },
    format(date) {
      return dateFormat(date);
    },
    getState(user) {
      return this.states[user.state];
    },
  }
}
</script>
