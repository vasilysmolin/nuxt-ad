<template>

  <section>

    <div v-if="$device.isDesktop" class="mx-auto flex flex-col w-[500px]">
      <h1 class="mb-3 text-xl text-center font-black">Резюме от соискателей</h1>
      <template v-for="(resume, ind)  in resumes">
        <article class="group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
          <NuxtLink :to="getUrl(resume)" class="px-4 py-6">
            <h2 class="first-letter:uppercase lowercase font-black leading-[22px] text-lg group-hover:text-blue-600">
              {{ resume.name }}</h2>
            <h3 class="mt-2 text-base"><span class="pr-1 text-xs">от</span>{{ formatPrice(resume.price) }}</h3>
            <h3 class="mt-2 text-xs text-gray-600">{{ getUserName(resume) }}</h3>
            <hr class="mt-3 mb-3">
            <section class="grid grid-cols-2 gap-4 w-full py-2">
              <div class="flex justify-start items-center" title="Опыт работы" v-if="getExperiences(resume)">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleExperiences/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getExperiences(resume) }}</p>
              </div>
              <div class="flex justify-start items-center" title="Образование" v-if="getEducations(resume)">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleEducations/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getEducations(resume) }}</p>
              </div>
              <div class="flex justify-start items-center" title="График работы" v-if="getSchedules(resume)">
                <div class="flex justify-center items-center w-[20px] h-[20px]">
                  <IconVListArticleSchedules/>
                </div>
                <p class="text-gray-800 text-sm pl-2 lowercase">{{ getSchedules(resume) }}</p>
              </div>
            </section>
          </NuxtLink>
        </article>
        <div class="mt-5" v-if="everySix(ind + 1)">
          <div v-bind:id="`yandex_rtb_R-A-1779902-3-${ind+1}`"></div>
        </div>
      </template>
      <button @click="addItems({skip: resumes.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
              type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>

    <div v-if="$device.isMobile" class="flex flex-col">
      <NavLocJobs/>
      <article v-for="resume in resumes" :key="resume.id" class="flex flex-col w-full mt-[15px] rounded-lg bg-white">
        <NuxtLink :to="getUrl(resume)" class="px-2 py-4">
          <h2 class="first-letter:uppercase lowercase font-bold leading-4 text-sm">{{ resume.name }}</h2>
          <h3 class="mt-2 text-sm"><span class=" pr-1 text-xs">от</span>{{ formatPrice(resume.price) }}</h3>
          <div class="flex justify-between w-full">
            <!--
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Убрать</button>
            -->
          </div>
        </NuxtLink>
      </article>
      <button @click="addItems({skip: resumes.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
              type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>

  </section>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import * as _ from "lodash";
import NavLocJobs from "./NavLocJobs";
import IconVListArticleExperiences from "./icons/IconVListArticleExperiences";
import IconVListArticleEducations from "./icons/IconVListArticleEducations";
import IconVListArticleSchedules from "./icons/IconVListArticleSchedules";

export default {
  name: "RList",
  props: {
    type: String,
  },
  components: {
    NavLocJobs,
    IconVListArticleSchedules,
    IconVListArticleEducations,
    IconVListArticleExperiences,
  },
  async mounted() {
    this.setItems({
      type: 'resume'
    });
    await this.$store.dispatch('filters/setSearchType', {parameter: 'resume'});
    if (this.resumes.length === 0) {
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
    // await this.$store.dispatch('typeJobs/getItems');
  },
  computed: {
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeJobs/types']);
      },
      set(types) {
        return types
      }
    },
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
    ...mapActions({
      setItems: 'filters/setItems',
      getItems: 'resumes/getItems',
      addItems: 'resumes/addItems',
    }),
    getUserName(resume) {
      return resume?.profile?.user?.name;
    },
    everySix(count) {
      if (count % 6 === 0) {
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            renderTo: `yandex_rtb_R-A-1779902-3-${count}`,
            blockId: 'R-A-1779902-3',
            pageNumber: count + 1,
          })
        })
      }
      return count % 6 === 0;
    },
    getUrl(resume) {
      let cat = `/resume/${resume.categories ? resume.categories.alias : 'none'}`;
      return cat + '/' + `${resume.alias}`
    },
    getUserPhone(resume) {
      return resume?.profile?.user?.phone
    },
    getUserEmail(resume) {
      return resume?.profile?.user?.email
    },
    getEducations(resume) {
      return this.education[resume.education] ?? null;
    },
    getExperiences(resume) {
      return this.experiences[resume.experience] ?? null;
    },
    getSchedules(resume) {
      return this.schedule[resume.schedule] ?? null;
    },
    formatPrice(price) {
      if (price) {
        return new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0
        }).format(price);
      }
    },


  }
}
</script>
