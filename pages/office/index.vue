<template>
  <section class="container flex flex-col items-left pb-10 mt-20">
    <h1>Дашборд</h1>

    <div>
      <date-picker :format="dateFormat" :monday-first="true" v-model="from" @selected="updateDDT"></date-picker>
      &mdash;
      <date-picker :format="dateFormat" :monday-first="true" v-model="to" :disabled-dates="disabledDatesTo"
                   @selected="updateDDF"></date-picker>
      <button @click="getItems({dateFrom: formatDate(from), dateTo: formatDate(to)})" type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Применить фильтр
      </button>
    </div>
    <article v-for="[key, value] in Object.entries(logs)" :key="key"
             class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
      <p class="text-sm">{{ key }}: {{ value }}</p>
    </article>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('searchLogs/getItems', {
      dateFrom: this.formatDate(this.from),
      dateTo: this.formatDate(this.to)
    });
  },
  data() {
    return {
      from: new Date(),
      to: new Date(),
      dateFormat: 'yyyy-MM-dd',
      disabledDatesTo: {
        to: new Date(),
      }
    };
  },
  methods: {
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },

    formatDate(date) {
      return [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('-');
    },
    updateDDT(selected) {
      this.disabledDatesTo.to = selected;
      if (this.to < this.disabledDatesTo.to) {
        this.to = this.disabledDatesTo.to;
      }
    },
    updateDDF(selected) {
      if (this.from < this.disabledDatesTo.from) {
        this.from = this.disabledDatesTo.from;
      }
    },
    ...mapActions({
      getItems: 'searchLogs/getItems',
    })
  },
  computed: {
    ...mapGetters({
      logs: 'searchLogs/searchLogs',
    }),
  },
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
