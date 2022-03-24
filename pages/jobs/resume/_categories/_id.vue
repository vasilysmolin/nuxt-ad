<template>
  <section class="container flex flex-col items-center mt-[10px] pb-10 bg-blue-200">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm bg-blue-300">

    <article>
      <section>
        <h1 class="font-bold text-lg">{{ resume.name }}</h1>
        <!--<h2>Имя соискателя</h2>-->
        <p>{{ resume.price }}</p>
      </section>
      <section>
        <p>{{ resume.description }}</p>
      </section>
    </article>

    </section>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";

export default {
  name: "RObject",
  layout: 'jobs',
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
