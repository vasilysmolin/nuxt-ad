<template>
  <section class="bg-slate-400">
    <article v-for="resume in resumes" :key="resume.id" class="mt-3 bg-slate-500">
      <NuxtLink :to="getUrl(resume)">
        <h2 class="font-bold text-[0.9375rem]">{{ resume.name }}</h2>
        <h3 class="text-lg">{{ resume.price}}</h3>
        <div>
          <button>Добавить в мой список</button>
          <!--<button>Убрать</button>-->
        </div>
      </NuxtLink>
      <NuxtLink :to="getUrl(resume)">
        <button>Редактировать</button>
      </NuxtLink>

   </article>
    <button @click="addItems({skip: resumes.length})">Подгрузить еще</button>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "VList",
  layout: 'default',
  props: {
    type: String,
  },
  async mounted() {
    if(this.resumes.length === 0) {
      await this.getItems();
    }
  },
  computed: {
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),

  },
  methods: {
    ...mapActions({
        getItems: 'resumes/getItems',
        addItems: 'resumes/addItems',
      }),
    getUrl(resume) {
      let cat = `/resume/${ resume.categories ? resume.categories.alias : 'none'}`;
      return  cat + '/' + `${ resume.alias}`
    }
  },

}
</script>
