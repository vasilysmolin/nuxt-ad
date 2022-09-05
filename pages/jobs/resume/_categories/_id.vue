<template>
  <section>

    <div v-if="$device.isDesktop" class="container mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <NavLocJobs/>
      <article class="mx-auto py-6 flex flex-col w-[500px] border border-solid border-white rounded-lg bg-white">
        <section class="px-5 flex flex-col w-full">
          <h1 class="first-letter:uppercase lowercase font-bold text-xl leading-6">{{ resume.name }}</h1>
        </section>
        <section class="mt-3 flex flex-col px-5 w-full">
          <p class="text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ resume.price }}<span
              class="pl-2 text-sm">руб.</span></p>
        </section>
        <hr class="my-5 mx-auto w-11/12 border-gray-300">
        <BContactR
            :name="getUserName(resume)"
            :phone="getUserPhone(resume)"
            :email="getUserEmail(resume)"
        />
        <hr class="my-5 mx-auto w-11/12 border-gray-300">
        <section class="flex flex-col px-5 w-full">
          <h2 class="font-medium">Презентация:</h2>
          <p class="mt-1 text-gray-800 leading-relaxed">{{ resume.description }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h3 class="font-medium">Опыт работы:<span
              class="text-gray-800 font-normal pl-2 lowercase">{{ getExperiences(resume) }}</span></h3>
          <h3 class="mt-2 font-medium">Образование:<span
              class="text-gray-800 font-normal pl-2 lowercase">{{ getEducations(resume) }}</span></h3>
          <h3 class="mt-2 font-medium">График работы:<span
              class="text-gray-800 font-normal pl-2 lowercase">{{ getSchedules(resume) }}</span></h3>
        </section>

        <BYandexMap
            :city_id="resume.city_id"
            :showMap="showMap"
            :coords="coords"
            :coordsBal="coordsBal"
        />
      </article>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px]">
      <NavLocJobs/>
      <article class="mx-auto mt-[15px] py-4 flex flex-col w-full border border-solid border-white rounded-lg bg-white">
        <section class="px-5 flex flex-col w-full">
          <h1 class="first-letter:uppercase lowercase font-bold leading-5">{{ resume.name }}</h1>
        </section>

        <section class="mt-2 flex flex-col px-5 w-full">
          <p class="text-xl font-bold"><span class="pr-2 text-sm">от</span>{{ resume.price }}<span
              class="pl-2 text-sm">руб.</span></p>
        </section>

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <BContactR
            :name="getUserName(resume)"
            :phone="getUserPhone(resume)"
            :email="getUserEmail(resume)"
        />

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <section class="flex flex-col px-5 w-full">
          <h2 class="font-bold text-sm">Презентация:</h2>
          <p class="mt-1 leading-5 text-sm">{{ resume.description }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h3 class="font-bold text-sm">Опыт работы:<span
              class="font-normal pl-2 lowercase">{{ getExperiences(resume) }}</span></h3>
          <h3 class="mt-2 font-bold text-sm">Образование:<span
              class="font-normal pl-2 lowercase">{{ getEducations(resume) }}</span></h3>
          <h3 class="mt-2 font-bold text-sm">График работы:<span
              class="font-normal pl-2 lowercase">{{ getSchedules(resume) }}</span></h3>
        </section>

        <BYandexMap
            :city_id="resume.city_id"
            :showMap="showMap"
            :coords="coords"
            :coordsBal="coordsBal"
        />
      </article>
    </div>

  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import NavLocJobs from "~/components/NavLocJobs";
import BContactR from "~/components/blocks/BContactR";
import BYandexMap from "~/components/blocks/BYandexMap";

export default {
  name: "RObject",
  layout: 'default-search',
  components: {
    NavLocJobs,
    BContactR,
    BYandexMap
  },
  data() {
    return {
      coords: [55.7540471, 37.620405],
      coordsBal: [55.7540471, 37.620405],
      showMap: false,
    }
  },
  async mounted() {
    this.showMap = true;
    await this.$store.dispatch('resumes/getItem', {id: this.$route.params.id, expand: 'profile.user,profile.person'});
    if (Object.keys(this.$store.getters['experiences/experience']).length === 0) {
      await this.$store.dispatch('experiences/getItems');
    }
    if (Object.keys(this.$store.getters['educations/education']).length === 0) {
      await this.$store.dispatch('educations/getItems');
    }
    if (Object.keys(this.$store.getters['schedules/schedule']).length === 0) {
      await this.$store.dispatch('schedules/getItems');
    }
    // await this.$store.dispatch('typeJobs/getItems');
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
      if (resume?.profile?.isPerson === true) {
        return resume?.profile?.person?.name;
      }
      return resume?.profile?.user?.name;
    },
    getUserPhone(resume) {
      return resume?.profile?.user?.phone
    },
    getUserEmail(resume) {
      return resume?.profile?.user?.email
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
