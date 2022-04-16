<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          вакансии</h1>
        <article>
          <section>
            <p class="text-sm">Название: {{ resume.name }}</p>
            <p class="text-sm">Дата создания: {{ format(resume.created_at) }}</p>
            <p class="text-sm">Дата обновления: {{ format(resume.updated_at) }}</p>
            <p class="text-sm">ID: {{ resume.id }}</p>
            <p class="text-sm">Описание: {{ resume.description }}</p>
            <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
              <label class="pl-4 text-gray-500">Модерация</label>
              <select class="form-select form-select-lg mt-2 forms-select" v-model="resume.state">
                <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === resume.state">
                  {{ value }}
                </option>
              </select>
            </div>
            <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>
          </section>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import {dateFormat} from "../../../../helper/dataFormat";

export default {
  name: "Radmin",
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('resumes/getItem', { id: this.$route.params.id });
    await this.$store.dispatch('states/getItems');
  },
  computed: {
    resume() {
      return _.cloneDeep(this.$store.getters['resumes/resume']);
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
      resumes: 'resumes/resumes'
    }),
  },
  methods: {
    submitted() {
      this.$axios.$put(`resume/${this.resume.id}/state`, {state: this.resume.state});
    },
    format(date) {
      return dateFormat(date);
    }
  },

  head() {
    return {
      title: `${this.resume.title} | Вакансии без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
