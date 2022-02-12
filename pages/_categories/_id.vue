<template>
  <main class="container box-border bg-slate-200">
    <h1 class="text-3xl font-bold underline">Vacancies Object Page</h1>
    <NavLoc/>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ vacancy.title }}</h2>
        <h3>{{ vacancy.min_price }}<span>&#8212;</span>{{ vacancy.max_price }}</h3>
        <span></span>
      </section>
    </article>
  </main>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "VObject",
  async fetch() {
    // console.log(this.$route.params);
    // const userId = _.find(this.vacancies, {'alias': this.$route.params.id })
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.query.id });
  },
  data() {
    return {
     // vacancy: {}
    }
},
  computed: {
    vacancy() {
      return this.$store.getters['vacancies/vacancy']
    },
    ...mapGetters({
      vacancies: 'vacancies/vacancies'
    }),
  },

  head() {
    return {
      title: `${this.vacancy.title}| Вакансии без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
