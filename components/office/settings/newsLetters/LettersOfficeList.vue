<template>
  <section class="container flex flex-col items-center pb-10 mt-20">
    <div @click="download">
      <h2 class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Скачать csv</h2>
    </div>
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Все</h1>
      <article v-for="letter in letters" :key="letter.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
      <h2 class="first-letter:uppercase font-bold text-[0.9375rem] lecoloring-5 sm:text-lg">{{ letter.id }}</h2>
      <p class="first-letter:uppercase font-bold text-[0.9375rem] lecoloring-5 sm:text-lg">{{ letter.refer }}</p>
      <p class="first-letter:uppercase font-bold text-[0.9375rem] lecoloring-5 sm:text-lg">{{ letter.email }}</p>
      </article>
      <button v-if="checkAmount" @click="addItems({skip: letters.length})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal lecoloring-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

import * as _ from "lodash";
export default {
  name: "LettersOfficeList",
  async mounted() {
    if(this.letters.length === 0) {
      await this.getItems({});
    }

  },
  data() {
    return {
      searchByName: null,
    }
  },
  computed: {
    ...mapGetters({
      letters: 'letters/letters',
    }),

    checkAmount(){
      return this.letters?.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'letters/getItems',
        addItems: 'letters/addItems',
      }),
    downloadCsv(csvData, filename) {
      const blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
      });
      const dwldLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
      const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

      //if Safari open in new window to save file with random filename.
      if (isSafariBrowser)
        dwldLink.setAttribute("target", "_blank");

      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename+ ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
    },
    download(){
      this.$axios.$get(`newsletters/download`).then((res) => {
        this.downloadCsv(res, 'letters');
      });
    },
    async filter() {
      await this.getItems();
    },
  },

}
</script>
