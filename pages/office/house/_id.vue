<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          дома</h1>
        <article>
          <section>
            <p class="text-sm">Название: {{ realty.name }}</p>
            <p class="text-sm">Дата создания: {{ format(realty.created_at) }}</p>
            <p class="text-sm">Дата обновления: {{ format(realty.updated_at) }}</p>
            <p class="text-sm">ID: {{ realty.id }}</p>
            <p class="text-sm">Описание: {{ realty.description }}</p>
            <p v-if="realty.reason" class="text-sm">Причина блокировки: {{ reasons[realty.reason] }}</p>
            <div class="mb-4 w-full sm:w-[27rem] mt-[20px]">
              <label class="pl-4 text-gray-500">Модерация</label>
              <select @change="checkState()" class="form-select form-select-lg mt-2 forms-select"
                      v-model="realty.state">
                <option v-for="[key, value] in Object.entries(states)" :value="key" :key="key"
                        :selected="key === realty.state">
                  {{ value }}
                </option>
              </select>
            </div>
            <div v-if="isReason" class="mb-4 w-full sm:w-[27rem] mt-[20px]">
              <label class="pl-4 text-gray-500">Причины</label>
              <select class="form-select form-select-lg mt-2 forms-select" v-model="reason">
                <option v-for="[key, value] in Object.entries(reasons)" :value="key" :key="key"
                        :selected="key === realty.reason">
                  {{ value }}
                </option>
              </select>
            </div>
            <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
              <h2 class="text-sm font-bold text-black">Фотографии</h2>
              <section class="mt-4 grid grid-cols-2 gap-4 w-full">
                <div v-for="photo in realty.photos">
                  <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
                </div>
              </section>
            </section>
            <button
                class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="submitted">Сохранить
            </button>
          </section>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import {dateFormat} from "../../../helper/dataFormat";

export default {
  name: "Radmin",
  layout: 'office',
  async mounted() {
    await this.$store.dispatch('reasons/getItems');
    await this.$store.dispatch('states/getItems');
    await this.$store.dispatch('houses/getItem', {id: this.$route.params.id}).then(() => {
      this.checkState();
      this.reason = this.realty.reason;
    });

  },
  data() {
    return {
      reason: null,
      isReason: false,
    }
  },
  computed: {
    realty() {
      return _.cloneDeep(this.$store.getters['houses/house']);
    },
    states: {
      get() {
        return _.cloneDeep(this.$store.getters['states/states']);
      },
      set(states) {
        return states
      }
    },
    reasons: {
      get() {
        return _.cloneDeep(this.$store.getters['reasons/reasons']);
      },
      set(reasons) {
        return reasons
      }
    },
    ...mapGetters({
      ads: 'houses/houses',
    }),
  },
  methods: {
    submitted() {
      this.$axios.$put(`houses/${this.realty.id}/state`, {state: this.realty.state});
      this.$axios.$put(`houses/${this.realty.id}`, {reason: this.reason});
    },
    format(date) {
      return dateFormat(date);
    },
    checkState() {
      console.log(this.realty.state);
      this.isReason = this.realty.state === 'block' || this.realty.state === 're_block';
    },
  },

  head() {
    return {
      title: `${this.realty.title} | Дома без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
