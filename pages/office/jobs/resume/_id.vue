<template>
  <main class="container box-border bg-slate-200 mt-20">
    <h1 class="text-3xl font-bold underline">Resume</h1>
    <article>
      <section>
        <h2 class="font-bold text-lg">{{ resume.name }}</h2>
        <h3>{{ resume.price }}</h3>
        <p>{{ resume.description }}</p>
        <span></span>
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
  },
  computed: {
    resume() {
      return this.$store.getters['resumes/resume']
    },
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),
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
