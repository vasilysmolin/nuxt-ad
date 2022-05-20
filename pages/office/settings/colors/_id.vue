<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          категорию</h1>
        <article>
          <section>
            <p class="text-sm">Название: {{ color.name }}</p>
            <p class="text-sm">Дата создания: {{ format(color.created_at) }}</p>
            <p class="text-sm">Дата обновления: {{ format(color.updated_at) }}</p>
            <p class="text-sm">ID: {{ color.id }}</p>
            <form class="w-[95%]">

              <div class="flex flex-col items-center w-full">
                <div class="form-floating mb-4 w-full sm:w-[27rem]">
                  <input type="text"
                         class="form-control forms-input" id="name"
                         placeholder="Название вакансии"
                         v-model="color.name">
                  <label for="name" class="text-[#6E7191]">Название цвета</label>

                </div>
                <div class="form-floating mb-4 w-full sm:w-[27rem]">
                  <input type="text"
                         class="form-control forms-input" id="hash"
                         placeholder="Название вакансии"
                         v-model="color.hash">
                  <label for="name" class="text-[#6E7191]">hash цвета (#ffffff)</label>

                </div>

                <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                        @click.prevent="submitted">Сохранить
                </button>

              </div>
            </form>
          </section>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapActions, mapGetters} from "vuex";
import { dateFormat } from "../../../../helper/dataFormat";

export default {
  name: "officecolor",
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('colors/getItem', { id: this.$route.params.id });
    await this.getItems({});
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    color() {
      return _.cloneDeep(this.$store.getters['colors/color']);
    },
    ...mapGetters({
      colors: 'colors/colors'
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'colors/getItems',
    }),
    submitted() {
      let data = new FormData();
      data.append('name', this.color.name);
      data.append('hash', this.color.hash);
      data.append('_method', 'put');
      this.$axios.$post(`colors/${this.color.id}`, data);
    },
    format(date) {
      return dateFormat(date);
    }
  },
}
</script>
