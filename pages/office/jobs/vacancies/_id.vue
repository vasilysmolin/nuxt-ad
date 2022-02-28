<template>
  <main class="container box-border bg-slate-200 mt-20">
    <h1 class="text-3xl font-bold underline">Vacancy</h1>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ vacancy.name }}</h2>
        <h3>{{ vacancy.min_price }}<span>&#8212;</span>{{ vacancy.max_price }}</h3>
        <p>{{ vacancy.description }}</p>
        <div class="form-group">
          <label>Модерация</label>
          <select class="form-control" v-model="vacancy.state">
            <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key" :selected="key === vacancy.state">
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
  name: "Vadmin",
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.params.id });
    await this.$store.dispatch('states/getItems');
  },
  computed: {
    vacancy() {
      return _.cloneDeep(this.$store.getters['vacancies/vacancy']);
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
      vacancies: 'vacancies/vacancies'
    }),
  },
  methods: {
    submitted() {
      this.$axios.$put(`vacancies/${this.vacancy.id}`, {state: this.vacancy.state}, { withCredentials: true });
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
