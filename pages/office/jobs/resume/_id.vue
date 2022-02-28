<template>
  <main class="container box-border bg-slate-200 mt-20">
    <h1 class="text-3xl font-bold underline">Resume</h1>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ resume.name }}</h2>
        <h3>{{ resume.price }}</h3>
        <p>{{ resume.description }}</p>
        <div class="form-group">
          <label>Модерация</label>
          <select class="form-control" v-model="resume.state">
            <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === resume.state">
              {{ value }}
            </option>
          </select>
          <button class="btn btn-primary"
                  @click.prevent="submitted">Редактировать
          </button>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

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
      this.$axios.$put(`resume/${this.resume.id}`, {state: this.resume.state}, { withCredentials: true });
    },
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
