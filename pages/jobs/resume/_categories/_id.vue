<template>
  <article class="container flex flex-col items-center mt-[10px] sm:mt-[20px] pb-10">

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ resume.name }}</h1>
      <p class="mt-2 text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ resume.price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Имя:</span>{{ getUserName(resume)}}</p>
      <p class="mt-1 font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Телефон:</span>{{ getUserPhone(resume)}}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Презентация</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ resume.description }}</p>
    </section>

  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "RObject",
  layout: 'jobs',
  async mounted() {
    await this.$store.dispatch('resumes/getItem', {id: this.$route.params.id, expand: 'profile.user'});
  },
  computed: {
    resume() {
      return this.$store.getters['resumes/resume']
    },
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),
  },
  methods: {
    getUserName(resume) {
      return resume?.profile?.user?.name
    },
    getUserPhone(resume) {
      return resume?.profile?.user?.phone
    }
  },
  head() {
    return {
      title: `${this.resume.title} | Резюме без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
