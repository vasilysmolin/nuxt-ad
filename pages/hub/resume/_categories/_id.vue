<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          резюме</h1>

        <h2 class="mb-4 w-full text-base text-black font-bold text-center leading-none truncate">{{ data.name }}</h2>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Выберите направление</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.category_id">
                <option v-for="item in category" :value="item.id" :key="item.id"
                        :selected="item.id === data.category_id">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="name"
                     placeholder="Название вакансии"
                     v-model="data.name">
              <label for="name" class="text-[#6E7191]">Заголовок резюме</label>
              <span v-if="nameErrors" class="form-errors">
            {{ nameErrors }}
            </span>
            </div>
<!--
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="address"
                     placeholder="Адрес офиса"
                     v-model="data.address">
              <label for="address" class="text-[#6E7191]">Адрес офиса</label>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="phone"
                     placeholder="Телефон"
                     v-model="data.phone">
              <label for="phone" class="text-[#6E7191]">Телефон</label>
              <span v-if="phoneErrors" class="form-errors">
            {{ phoneErrors }}
            </span>
            </div>
-->
            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="duties"
                      id="duties"
                      placeholder="Презентация"
                      v-model="data.description"
                  >{{ data.duties }}</textarea>
              <span v-if="descriptionErrors" class="form-errors">
            {{ descriptionErrors }}
            </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Опыт работы</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.experience">
                <option v-for="[key, value] in Object.entries(experiences)" :value="key" :key="key"
                        :selected="key === data.experience">
                  {{ value }}
                </option>
              </select>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Образование</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.education">
                <option v-for="[key, value] in Object.entries(education)" :value="key" :key="key"
                        :selected="key === data.education">
                  {{ value }}
                </option>
              </select>
            </div>


            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">График работы</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.schedule">
                <option v-for="[key, value] in Object.entries(schedule)" :value="key" :key="key"
                        :selected="key === data.schedule">
                  {{ value }}
                </option>
              </select>
            </div>


            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="min_price"
                     placeholder="Зарплата"
                     v-model="data.price">
              <label for="min_price" class="text-[#6E7191]">Зарплата</label>
              <span v-if="priceErrors" class="form-errors">
              {{ priceErrors }}
              </span>
            </div>

            <BGeo
                :obj="data"
                :cityErrors="cityErrors"
                :addressErrors="addressErrors"
                @cityId="getCityId"
                @address="getAddress"
            />

            <button
                class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="submitted">Сохранить
            </button>

            <button v-if="data.state === 'active'" @click.prevent="up"
                    class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">
              Поднять
            </button>

            <button @click.prevent="deleted"
                    class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">
              Удалить
            </button>

            <div v-if="checkState()">
              <button v-if="data.state !== 'active'" @click.prevent="active" class="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">Активировать</button>
              <button v-else @click.prevent="pause"  class="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">На паузу</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {maxLength, minLength, numeric, required} from 'vuelidate/lib/validators';
import BGeo from "~/components/blocks/BGeo";
import Validations from "~/components/mixins/validations.mixin"

export default {
  name: "VObject",
  components: {BGeo},
  mixins: [Validations],
  layout: 'hub',
  head: {
    title: "Редактировать резюме на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      data: {
        cityId: null,
        address: null
      },
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
      },
      city_id: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(2)
      },
      street: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(2)
      },
      category_id: {
        required,
        numeric,
      },
      description: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
      price: {
        required,
        numeric,
        maxLength: maxLength(10),
        minLength: minLength(2)
      },
      // phone: {
      //   required,
      //   numeric,
      //   maxLength: maxLength(20),
      //   minLength: minLength(9)
      // },
    },

  },
  async mounted() {
    await this.$store.dispatch('resumes/getItem', {id: this.$route.params.id});
    this.data = _.cloneDeep(this.$store.getters['resumes/resume']);
    await this.$store.dispatch('categoriesResume/getItems');
    await this.$store.dispatch('experiences/getItems');
    await this.$store.dispatch('educations/getItems');
    await this.$store.dispatch('schedules/getItems');
    // await this.$store.dispatch('typeJobs/getItems');
  },
  computed: {
    // types: {
    //   get() {
    //     return _.cloneDeep(this.$store.getters['typeJobs/types']);
    //   },
    //   set(types) {
    //     return types
    //   }
    // },
    experiences: {
      get() {
        return _.cloneDeep(this.$store.getters['experiences/experience']);
      },
      set(experience) {
        return experience
      }
    },
    education: {
      get() {
        return _.cloneDeep(this.$store.getters['educations/education']);
      },
      set(education) {
        return education
      }
    },
    schedule: {
      get() {
        return _.cloneDeep(this.$store.getters['schedules/schedule']);
      },
      set(schedule) {
        return schedule
      }
    },
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesResume/categoriesResumes']);
      },
      set(category) {
        return category
      }
    },
  },
  methods: {
    getCityId(event) {
      this.data.city_id = event;
    },
    getAddress(event) {
      if (!_.isEmpty(event)) {
        this.data.street = event.data.street_with_type;
        this.data.house = event.data.house;
        this.data.latitude = event.data.geo_lat;
        this.data.longitude = event.data.geo_lon;
      } else {
        this.data.street = null;
      }
    },
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$axios.$put(`resume/${this.$route.params.id}`, this.data).then(() => {
        this.$router.push({name: 'resume___ru'});
        console.log('успех')
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    deleted() {
      this.$axios.$delete(`resume/${this.$route.params.id}`).then(() => {
        this.$router.push({name: 'resume___ru'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    active() {
      this.$axios.$put(`resume/${this.$route.params.id}/state`,{state: 'active'}).then(() => {
        this.$router.push({name: 'resume___ru'});
      }).catch((error) => {
      });

    },
    pause() {
      this.$axios.$put(`resume/${this.$route.params.id}/state`,{state: 'pause'}).then(() => {
        this.$router.push({name: 'resume___ru'});
      }).catch((error) => {
      });

    },
    up() {
      this.$axios.$put(`resume/${this.$route.params.id}/sort`,{}).then(() => {
        this.$router.push({name: 'resume___ru'});
      }).catch((error) => {
      });
    },
    checkState() {
      return this.data.state === 'active' || this.data.state === 'pause';
    }
  },
}
</script>
