<template>
  <section>

    <div v-if="$device.isDesktop" class="container mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <NavLocJobs/>
      <article class="mx-auto py-6 flex flex-col w-[500px] border border-solid border-white rounded-lg bg-white">
        <section class="px-5 flex flex-col w-full">
          <h1 class="first-letter:uppercase font-bold text-xl leading-6">{{ vacancy.name }}</h1>
        </section>

        <section class = "mt-3 flex flex-col px-5 w-full">
          <p class="text-2xl font-bold">
            <span class="pr-2 text-sm">от
            </span>{{ vacancy.min_price }}
            <span class="pl-2 text-sm">руб.</span>
          </p>
        </section>

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <BContactV
            :name="getUserName(vacancy)"
            :phone="getUserPhone(vacancy)"
            :address="getUserAddress(vacancy)"
            :email="getUserEmail(vacancy)"
        />

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <section class="flex flex-col px-5 w-full">
          <h2 class="font-medium">Обязанности:</h2>
          <p class="mt-1 text-gray-800 leading-relaxed">{{ vacancy.duties }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h2 class="font-medium">Требования:</h2>
          <p class="mt-1 text-gray-800 leading-relaxed">{{ vacancy.demands }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h2 class="font-medium">Дополнительные условия:</h2>
          <p class="mt-1 text-gray-800 leading-relaxed">{{ vacancy.additionally }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h3 class="font-medium">Вид оплаты:<span class="text-gray-800 font-normal pl-2 lowercase">{{ getSalary(vacancy) }}</span></h3>
          <h3 class="mt-2 font-medium">Опыт работы:<span class="text-gray-800 font-normal pl-2 lowercase">{{ getExperiences(vacancy) }}</span></h3>
          <h3 class="mt-2 font-medium">Образование:<span class="text-gray-800 font-normal pl-2 lowercase">{{ getEducations(vacancy) }}</span></h3>
          <h3 class="mt-2 font-medium">График работы:<span class="text-gray-800 font-normal pl-2 lowercase">{{ getSchedules(vacancy) }}</span></h3>
        </section>

        <BYandexMap
            :city_id="vacancy.city_id"
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
          <h1 class="first-letter:uppercase font-bold leading-5">{{ vacancy.name }}</h1>
        </section>

        <section class="mt-2 flex flex-col px-5 w-full">
          <p class="text-xl font-bold"><span class="pr-2 text-sm">от</span>{{ vacancy.min_price }}<span
              class="pl-2 text-sm">руб.</span></p>
        </section>

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <BContactV
            :name="getUserName(vacancy)"
            :phone="getUserPhone(vacancy)"
            :address="getUserAddress(vacancy)"
            :email="getUserEmail(vacancy)"
        />

        <hr class="my-5 mx-auto w-11/12 border-gray-300">

        <section class="flex flex-col px-5 w-full">
          <h2 class="font-bold text-sm">Обязанности:</h2>
          <p class="mt-1 leading-5 text-sm">{{ vacancy.duties }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h2 class="font-bold text-sm">Требования:</h2>
          <p class="mt-1 leading-5 text-sm">{{ vacancy.demands }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h2 class="font-bold text-sm">Дополнительные условия:</h2>
          <p class="mt-1 leading-5 text-sm">{{ vacancy.additionally }}</p>
          <hr class="my-5 mx-auto w-full border-gray-300">
          <h3 class="font-bold text-sm">Вид оплаты:<span class="font-normal pl-2 lowercase">{{ getSalary(vacancy) }}</span></h3>
          <h3 class="mt-2 font-bold text-sm">Опыт работы:<span class="font-normal pl-2 lowercase">{{ getExperiences(vacancy) }}</span></h3>
          <h3 class="mt-2 font-bold text-sm">Образование:<span class="font-normal pl-2 lowercase">{{ getEducations(vacancy) }}</span></h3>
          <h3 class="mt-2 font-bold text-sm">График работы:<span class="font-normal pl-2 lowercase">{{ getSchedules(vacancy) }}</span></h3>

        </section>

      </article>
    </div>

  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import NavLocJobs from "~/components/NavLocJobs";
import BContactV from "~/components/blocks/BContactV";
import HeaderContentList from "~/components/HeaderContentList";
import BYandexMap from "~/components/blocks/BYandexMap";

export default {
  name: "VObject",
  layout: 'default-search',
  components: {HeaderContentList, BContactV, NavLocJobs, BYandexMap},
  data() {
    return {
      coords: [55.7540471, 37.620405],
      coordsBal: [55.7540471, 37.620405],
      showMap: false,
    }
  },
  async mounted() {
    this.showMap = true;
    await this.$store.dispatch('vacancies/getItem', {id: this.$route.params.id, expand: 'profile.user,profile.person'});
    if (Object.keys(this.$store.getters['categoriesVacancy/categoriesVacancies']).length === 0) {
      await this.$store.dispatch('categoriesVacancy/getItems');
    }
    if (Object.keys(this.$store.getters['experiences/experience']).length === 0) {
      await this.$store.dispatch('experiences/getItems');
    }
    if (Object.keys(this.$store.getters['educations/education']).length === 0) {
      await this.$store.dispatch('educations/getItems');
    }
    if (Object.keys(this.$store.getters['schedules/schedule']).length === 0) {
      await this.$store.dispatch('schedules/getItems');
    }
    if (Object.keys(this.$store.getters['salaries/salary_type']).length === 0) {
      await this.$store.dispatch('salaries/getItems');
    }
    this.showMap = true;
    if(this.checkCity) {
      this.coords = [this.vacancy?.city?.latitude, this.vacancy?.city?.longitude];
      if (_.isEmpty(this.vacancy?.latitude) || _.isEmpty(this.vacancy?.longitude)) {
        this.coordsBal = this.coords;
      } else {
        console.log([this.vacancy?.latitude, this.vacancy?.longitude]);
        this.coordsBal = [this.vacancy?.latitude, this.vacancy?.longitude];
      }

    }
  },
  methods: {
    getUserName(vacancy) {
      if (vacancy?.profile?.isPerson === true) {
        return vacancy?.profile?.person?.name;
      }
      return vacancy?.profile?.user?.name;
    },
    getUserPhone(vacancy) {
      return vacancy?.profile?.user?.phone
    },
    checkCity(){
      return this.vacancy?.city_id;
    },
    getUserEmail(vacancy) {
      return vacancy?.profile?.user?.email
    },
    getUserAddress(vacancy) {
      return this.vacancy?.address ?? 'не указан';
    },
    getCategory(vacancy) {
      return this.category[vacancy.category_id]?.name ?? 'Не указана';
    },
    getEducations(vacancy) {
      return this.education[vacancy.education] ?? 'Не указано';
    },
    getExperiences(vacancy) {
      return this.experiences[vacancy.experience] ?? 'Не указано';
    },
    getSchedules(vacancy) {
      return this.schedule[vacancy.schedule] ?? 'Не указано';
    },
    getSalary(vacancy) {
      return this.salary_type[vacancy.salary_type] ?? 'Не указано';
    },
  },
  computed: {
    vacancy() {
      return this.$store.getters['vacancies/vacancy']
    },
    ...mapGetters({
      vacancies: 'vacancies/vacancies'
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
    salary_type: {
      get() {
        return _.cloneDeep(this.$store.getters['salaries/salary_type']);
      },
      set(salary_type) {
        return salary_type
      }
    },
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesVacancy/categoriesVacancies']);
      },
      set(category) {
        return category
      }
    },
  },
  head() {
    return {
      title: `${this.vacancy.title} | Вакансии без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
