<template>
  <main className="container box-border bg-slate-200">
    <h1 className="text-3xl font-bold underline">resumes Object Page</h1>
    <NavLoc/>
    <article>
      <section>
        <h2 className="font-bold text-lg">{{ resume.name }}</h2>
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
  name: "VObject",
  layout: 'hub',
  async mounted() {
    await this.$store.dispatch('resumes/getItem', {id: this.$route.params.id});
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
      title: `${this.resume.title} | Резюме без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
