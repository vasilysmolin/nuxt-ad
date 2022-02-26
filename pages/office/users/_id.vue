<template>
  <main class="container box-border bg-slate-200 mt-20">
    <h1 class="text-3xl font-bold underline">User</h1>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ user.name }}</h2>
        <p>{{ user.state }}</p>
        <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.email }}</p>
        <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.phone }}</p>
        <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ user.id }}</p>
        <p class="text-xs text-[#A0A3BD]">{{isPerson ? 'Юридическое лицо' : 'Физическое лицо'}}</p>
        <p v-if="isPerson" class="text-xs text-[#D9DBE9] uppercase">инн<span class="pl-1">{{ inn }}</span></p>
        <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(user.created_at) }}</p>
        <span></span>
      </section>
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <h2 class="font-bold text-lg">Вакансии</h2>
        <article v-for="vacancy in vacancies" :key="vacancy.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
<!--          <NuxtLink :to="">-->
            <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ vacancy.name }}</h2>
            <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ vacancy.min_price }}<span class="pl-1 text-xs">руб.</span></h3>

<!--          </NuxtLink>-->

          <!--

                <NuxtLink :to="getUrl(vacancy)">
                  <button>Редактировать</button>
                </NuxtLink>
          -->
        </article>
        <button @click="addVacancies({skip: vacancies.length, user: user.id})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
      </section>
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <h2 class="font-bold text-lg">Резюме</h2>
        <article v-for="resume in resumes" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
          <!--          <NuxtLink :to="">-->
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
          <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ resume.min_price }}<span class="pl-1 text-xs">руб.</span></h3>

          <!--          </NuxtLink>-->

          <!--

                <NuxtLink :to="getUrl(vacancy)">
                  <button>Редактировать</button>
                </NuxtLink>
          -->
        </article>
        <button @click="addResumes({skip: resumes.length, user: user.id})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
      </section>
    </article>
  </main>
</template>

<script>
import * as _ from 'lodash';
import {mapActions, mapGetters} from "vuex";

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
    await this.$store.dispatch('vacancies/getItems', { userID: this.$route.params.id });
    await this.$store.dispatch('resumes/getItems', { userID: this.$route.params.id });
  },
  data() {
    return {
    }
},
  computed: {
    user() {
      return this.$store.getters['users/user']
    },
    ...mapGetters({
      users: 'users/users',
      vacancies: 'vacancies/vacancies',
      resumes: 'resumes/resumes',
    }),
    isPerson: {
      get(){
        if(this.user != null && this.user.profile != null) {
          if(this.user.profile.isPerson === true) {
            return true;
          }
        }
        return false;
      },
      set(user){
        return user
      }
    },
    inn: {
      get(){
        if(this.isPerson === true && this.user.profile.person != null) {
          return this.user.profile.person.inn
        }
      },
      set(user){
        return user
      }
    },
  },
  methods: {
    ...mapActions({
      getItems: 'users/getItems',
      addItems: 'users/addItems',
      addResumes: 'resumes/addItems',
      addVacancies: 'vacancies/addItems',
    }),
    dateFormat(date) {
      if(date){
        var dates = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return formatter.format(dates);
      }

    }
  }
}
</script>
