<template>
  <main class="container box-border bg-slate-200">
    <h1 class="text-3xl font-bold underline">Vacancies Object Page</h1>
    <NavLoc/>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ vacancy.name }}</h2>
        <h3>{{ vacancy.min_price }}<span>&#8212;</span>{{ vacancy.max_price }}</h3>
        <p>{{ vacancy.description }}</p>
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
  async mounted() {
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.params.id });
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
      title: `${this.vacancy.title} | Вакансии без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
