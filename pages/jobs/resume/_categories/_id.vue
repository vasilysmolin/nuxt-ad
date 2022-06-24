<template>
  <article class="container flex flex-col items-center mt-[10px] sm:mt-[20px] pb-[100px]">

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="mt-1 mb-2.5">{{types[resume.type]}}</p>
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ resume.name }}</h1>
      <p class="mt-2 text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ resume.price }}<span class="pl-2 text-sm">руб.</span></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Имя:</span>{{ getUserName(resume)}}</p>
      <p class="mt-1 font-bold text-[0.9375rem] leading-5 sm:text-lg"><span class="pr-2 font-bold text-sm text-gray-500">Телефон:</span>{{ getUserPhone(resume)}}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Презентация</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ resume.description }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Опыт работы</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ getExperiences(resume) }}</p>
      <h2 class="mt-4 text-sm font-bold text-black">Образование</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ getEducations(resume) }}</p>
      <h2 class="mt-4 text-sm font-bold text-black">График работы</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ getSchedules(resume) }}</p>
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
    await this.$store.dispatch('resumes/getItem', {id: this.$route.params.id, expand: 'profile.user,profile.person'});
    if(Object.keys(this.$store.getters['experiences/experience']).length === 0) {
      await this.$store.dispatch('experiences/getItems');
    }
    if(Object.keys(this.$store.getters['educations/education']).length === 0) {
      await this.$store.dispatch('educations/getItems');
    }
    if(Object.keys(this.$store.getters['schedules/schedule']).length === 0) {
      await this.$store.dispatch('schedules/getItems');
    }
    await this.$store.dispatch('typeJobs/getItems');
  },
  computed: {
    resume() {
      return this.$store.getters['resumes/resume']
    },
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeJobs/types']);
      },
      set(types) {
        return types
      }
    },
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),
    experiences: {
      get() {
        return _.cloneDeep(this.$store.getters['experiences/experience']);
      },
      set(experience) {
        return experience
      }
    },
    education: {
      get() {
        return _.cloneDeep(this.$store.getters['educations/education']);
      },
      set(education) {
        return education
      }
    },
    schedule: {
      get() {
        return _.cloneDeep(this.$store.getters['schedules/schedule']);
      },
      set(schedule) {
        return schedule
      }
    },
  },
  methods: {
    getUserName(resume) {
      if(resume?.profile?.isPerson === true) {
        return resume?.profile?.person?.name;
      }
      return resume?.profile?.user?.name;
    },
    getUserPhone(resume) {
      return resume?.profile?.user?.phone
    },
    getEducations(resume) {
      return this.education[resume.education] ?? 'Не указан';
    },
    getExperiences(resume) {
      return this.experiences[resume.experience] ?? 'Не указан';
    },
    getSchedules(resume) {
      return this.schedule[resume.schedule] ?? 'Не указан';
    },
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
