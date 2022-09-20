<template>

  <section>

    <div v-if="$device.isDesktop" class="mx-auto flex flex-col w-[500px]">
      <h1 class="mb-3 text-xl text-center font-black">Вакансии от компаний</h1>
      <template v-for="(vacancy, ind)  in vacancies">
        <article class="group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
          <NuxtLink :to="getUrl(vacancy)" class="px-4 py-6">
            <h2 class="first-letter:uppercase lowercase font-black leading-[22px] text-lg group-hover:text-blue-600">
              {{ vacancy.name }}</h2>
            <h3 class="mt-2 text-base"><span class="pr-1 text-xs">от</span>{{ vacancy.min_price }}<span
                class="pl-1 text-xs">руб.</span></h3>
            <h3 class="mt-2 text-xs text-gray-600">МУНИЦИПАЛЬНОЕ КАЗЕННОЕ УЧРЕЖДЕНИЕ ЦЕНТР БУХГАЛТЕРСКОГО УЧЕТА И ОТЧЕТНОСТИ В СФЕРЕ ОБРАЗОВАНИЯ ГОРОДА ПЕРМИ</h3>
            <hr class="mt-3 mb-3">
            <section class="grid grid-cols-2 gap-4 w-full py-2">
              <div class="flex justify-start items-center" title="Вид оплаты">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleSalary/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getSalary(vacancy) }}</p>
              </div>
              <div class="flex justify-start items-center" title="Опыт работы">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleExperiences/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getExperiences(vacancy) }}</p>
              </div>
              <div class="flex justify-start items-center" title="Образование">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleEducations/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getEducations(vacancy) }}</p>
              </div>
              <div class="flex justify-start items-center" title="График работы">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleSchedules/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getSchedules(vacancy) }}</p>
              </div>
            </section>
          </NuxtLink>
        </article>
        <div class="mt-5" v-if="everySix(ind + 1)">
          <div v-bind:id="`yandex_rtb_R-A-1779902-7-${ind+1}`"></div>
        </div>
      </template>
      <button @click="addItems({skip: vacancies.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
              type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>

    <div v-if="$device.isMobile" class="mx-auto flex flex-col w-full">
      <NavLocJobs/>
      <article v-for="vacancy in vacancies" :key="vacancy.id" class="flex flex-col mt-[15px] rounded-lg bg-white">
        <NuxtLink :to="getUrl(vacancy)" class="px-2 py-4">
          <h2 class="first-letter:uppercase lowercase font-bold leading-4 text-sm">{{ vacancy.name }}</h2>
          <h3 class="mt-2 text-sm"><span class=" pr-1 text-xs">от</span>{{ vacancy.min_price }}<span
              class="pl-1 text-xs">руб.</span></h3>
          <div class="flex justify-between w-full">
            <!--
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Убрать</button>
            -->
          </div>
        </NuxtLink>
      </article>
      <button @click="addItems({skip: vacancies.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
              type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>

  </section>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import NavLocJobs from "./NavLocJobs";
import PauseWhite from "./icons/PauseWhite";
import * as _ from "lodash";
import IconVListArticleSalary from "./icons/IconVListArticleSalary";
import IconVListArticleExperiences from "./icons/IconVListArticleExperiences";
import IconVListArticleEducations from "./icons/IconVListArticleEducations";
import IconVListArticleSchedules from "./icons/IconVListArticleSchedules";

export default {
  name: "VList",
  props: {
    type: String,
  },
  async mounted() {
    this.setItems({
      type: 'vacancy'
    });
    if (this.vacancies.length === 0) {
      await this.getItems({state: 'active', expand: 'profile.user', from: 'catalog'});
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
  },
  components: {
    IconVListArticleSchedules,
    IconVListArticleEducations,
    IconVListArticleExperiences,
    IconVListArticleSalary,
    PauseWhite,
    NavLocJobs,
  },
  computed: {
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

  },
  methods: {
    ...mapActions({
      setItems: 'filters/setItems',
      getItems: 'vacancies/getItems',
      addItems: 'vacancies/addItems',
    }),
    everySix(count) {
      if (count % 6 === 0) {
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            renderTo: `yandex_rtb_R-A-1779902-7-${count}`,
            blockId: 'R-A-1779902-7',
            pageNumber: count + 1,
          })
        })
      }
      return count % 6 === 0;
    },
    getUrl(vacancy) {
      let cat = `/vacancies/${vacancy.categories ? vacancy.categories.alias : 'none'}`;
      return cat + '/' + `${vacancy.alias}`
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

}
</script>
