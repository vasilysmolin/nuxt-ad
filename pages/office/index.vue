<template>
  <section>
    <h1>Дашборд</h1>

    <h2>Все логи</h2>
    <article v-for="[key, value] in Object.entries(logs)" :key="key" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <p class="text-sm">{{ key }}: {{ value}}</p>
    </article>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('searchLogs/getItems');
  },
  computed: {
    ...mapGetters({
      logs: 'searchLogs/searchLogs',
    })
  },
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
