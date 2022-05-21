<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          категорию</h1>
        <article>
          <section>
            <p class="text-sm">Название: {{ category.name }}</p>
            <p class="text-sm">Дата создания: {{ format(category.created_at) }}</p>
            <p class="text-sm">Дата обновления: {{ format(category.updated_at) }}</p>
            <p class="text-sm">ID: {{ category.id }}</p>
            <form class="w-[95%]">

              <div class="flex flex-col items-center w-full">
                <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="demands"
                      id="demand"
                      placeholder="Описание"
                      v-model="category.description"
                  >{{ category.description}}</textarea>
                </div>
                <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
                  <label class="pl-4 text-gray-500">Цвет</label>
                  <select class="form-select form-select-lg mt-2 forms-select" v-model="category.color_id">
                    <option :value="0" key="0">
                      нет цвета
                    </option>
                    <option v-for="color in colors" :value="color.id" :key="color.id" :selected="color.id === category.color_id">
                      {{ color.name }}  {{ color.hash }}
                    </option>
                  </select>
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
import { dateFormat } from "../../../../../helper/dataFormat";

export default {
  name: "officeCategory",
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('categoriesAd/getItem', { id: this.$route.params.id });
    await this.getItems({});
  },
  data() {
    return {
      data: {},
    }
  },
  computed: {
    category() {
      return _.cloneDeep(this.$store.getters['categoriesAd/categoryAds']);
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
      if(this.category.description) {
        data.append('description', this.category.description);
      }
      data.append('color_id', this.category.color_id);
      data.append('_method', 'put');
      this.$axios.$post(`category-declarations/${this.category.id}`, data);
    },
    format(date) {
      return dateFormat(date);
    }
  },
}
</script>
