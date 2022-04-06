<template>
  <article class="container flex flex-col items-center mt-[10px] sm:mt-[20px] pb-10">

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ vacancy.name }}</h1>
      <p class="mt-2 text-xl sm:text-2xl font-bold"><span class="pr-2 text-sm">от</span>{{ vacancy.min_price }}<span class="pl-2 text-sm">руб.</span></p>
      <p class="mt-2 font-bold text-sm text-gray-400 lowercase">{{ getSalary(vacancy) }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-gray-600">Контактное лицо</h2>
      <p class="mt-2 font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ vacancy.phone }}</p>
      <p class="mt-2 font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ getUsername(vacancy)}}</p>
    </section>


    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Обязанности</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.duties }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Требования</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.demands }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Дополнительные условия</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ vacancy.additionally }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Категория</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ getCategory(vacancy) }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Опыт работы</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ getExperiences(vacancy) }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Образование</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ getEducations(vacancy) }}</p>
    </section>
    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">График работы</h2>
      <p class="mt-2 text-sm sm:text-base text-gray-600">{{ getSchedules(vacancy) }}</p>
    </section>


  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "VObject",
  layout: 'jobs',
  async mounted() {
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.params.id, expand: 'profile.user' });
    if(Object.keys(this.$store.getters['categoriesVacancy/categoriesVacancies']).length === 0)  {
      await this.$store.dispatch('categoriesVacancy/getItems');
    }
    if(Object.keys(this.$store.getters['experiences/experience']).length === 0) {
      await this.$store.dispatch('experiences/getItems');
    }
    if(Object.keys(this.$store.getters['educations/education']).length === 0) {
      await this.$store.dispatch('educations/getItems');
    }
    if(Object.keys(this.$store.getters['schedules/schedule']).length === 0) {
      await this.$store.dispatch('schedules/getItems');
    }
    if(Object.keys(this.$store.getters['salaries/salary_type']).length === 0) {
      await this.$store.dispatch('salaries/getItems');
    }
  },
  methods: {
    getUsername(vacancy) {
      return vacancy?.profile?.user?.name
    },
    getCategory(vacancy) {
      return this.category[vacancy.category_id]?.name ?? 'Не указана';
    },
    getEducations(vacancy) {
      return this.education[vacancy.education] ?? 'Не указан';
    },
    getExperiences(vacancy) {
      return this.experiences[vacancy.experience] ?? 'Не указан';
    },
    getSchedules(vacancy) {
      return this.schedule[vacancy.schedule] ?? 'Не указан';
    },
    getSalary(vacancy) {
      return this.salary_type[vacancy.salary_type] ?? 'Не указан';
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
    nameErrors: {
      get() {
        if (!this.$v.data.name.$dirty) {
          return '';
        }

        if (!this.$v.data.name.required) {
          return 'Введите название';
        }

        if (!this.$v.data.name.maxLength) {
          return 'Превышена допустимая длина названия';
        }
        if (!this.$v.data.name.minLength) {
          return 'Ошибка, минимальное значение';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    phoneErrors() {
      if (!this.$v.data.phone.$dirty) {
        return '';
      }

      if (!this.$v.data.phone.required) {
        return 'Введите телефон';
      }

      if (!this.$v.data.phone.maxLength) {
        return 'Превышена допустимая длина названия';
      }
      if (!this.$v.data.phone.minLength) {
        return 'Ошибка, минимальное значение';
      }
      if (!this.$v.data.phone.numeric) {
        return 'Укажите только числа, без других символов';
      }

      return '';
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
