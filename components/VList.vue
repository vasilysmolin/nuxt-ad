<template>
  <section class="bg-slate-400">
    <article v-for="vacancy in vacancies" :key="vacancy.id" class="mt-3 bg-slate-500">
      <NuxtLink :to="getUrl(vacancy)">
        <h2 class="font-bold text-[0.9375rem]">{{ vacancy.name }}</h2>
        <h3 class="text-lg">{{ vacancy.min_price }}<span>&#8212;</span>{{ vacancy.max_price }}</h3>
        <div>
          <button>Добавить в мой список</button>
          <!--<button>Убрать</button>-->
        </div>
      </NuxtLink>
      <NuxtLink :to="getUrl(vacancy)">
        <button>Редактировать</button>
      </NuxtLink>

    </article>
    <button @click="addItems({skip: vacancies.length})">Подгрузить еще</button>
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
    if(this.vacancies.length === 0) {
      await this.getItems();
    }
  },
  computed: {
    ...mapGetters({
      vacancies: 'vacancies/vacancies'
    }),

  },
  methods: {
    ...mapActions({
      getItems: 'vacancies/getItems',
      addItems: 'vacancies/addItems',
    }),
    getUrl(vacancy) {
      let cat = `/vacancies/${ vacancy.categories ? vacancy.categories.alias : 'none'}`;
      return  cat + '/' + `${ vacancy.alias}`
    }
  },

}
</script>
