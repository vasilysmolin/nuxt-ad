<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-5 w-full text-xl text-black font-bold text-center leading-none truncate">Создать вакансию</h1>

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
              <span v-if="category_idErrors" class="form-errors">
              {{ category_idErrors }}
              </span>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="name"
                     placeholder="Название вакансии"
                     v-model="data.name">
              <label for="name" class="text-[#6E7191]">Название вакансии</label>
              <span v-if="nameErrors" class="form-errors">
            {{ nameErrors }}
            </span>
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

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="duties"
                      id="duties"
                      placeholder="Обязанности"
                      v-model="data.duties"
                  >{{ data.duties }}</textarea>
              <span v-if="dutiesErrors" class="form-errors">
              {{ dutiesErrors }}
              </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="demands"
                      id="demand"
                      placeholder="Требования"
                      v-model="data.demands"
                  >{{ data.demands }}</textarea>
              <span v-if="demandsErrors" class="form-errors">
              {{ demandsErrors }}
              </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="additionally"
                      id="additionally"
                      placeholder="Дополнительные условия"
                      v-model="data.additionally"
                  >{{ data.additionally }}</textarea>
              <span v-if="additionallyErrors" class="form-errors">
              {{ additionallyErrors }}
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
              <span v-if="experienceErrors" class="form-errors">
              {{ experienceErrors }}
              </span>
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
              <span v-if="educationErrors" class="form-errors">
              {{ educationErrors }}
              </span>
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
              <span v-if="scheduleErrors" class="form-errors">
              {{ scheduleErrors }}
              </span>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="min_price"
                     placeholder="Зарплата"
                     v-model="data.min_price">
              <label for="min_price" class="text-[#6E7191]">Зарплата</label>
              <span v-if="minPriceErrors" class="form-errors">
            {{ minPriceErrors }}
            </span>
            </div>

            <BGeo
                :obj="data"
                :cityErrors="cityErrors"
                :addressErrors="addressErrors"
                @cityId="getCityId"
                @address="getAddress"
            />

            <button :disabled="isDisabled"
                    class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Разместить
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import * as _ from "lodash";
import {maxLength, minLength, numeric, required} from 'vuelidate/lib/validators';
import BGeo from "~/components/blocks/BGeo";
import Validations from "~/components/mixins/validations.mixin"

export default {
  layout: 'hub',
  head: {
    title: "Создать новую вакансию на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  components: {BGeo},
  mixins: [Validations],
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
      },
      additionally: {
        required,
        maxLength: maxLength(2550),
        minLength: minLength(10)
      },
      demands: {
        required,
        maxLength: maxLength(2550),
        minLength: minLength(10)
      },
      duties: {
        required,
        maxLength: maxLength(2550),
        minLength: minLength(10)
      },
      phone: {
        required,
        numeric,
        maxLength: maxLength(20),
        minLength: minLength(9)
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
      experience: {
        required
      },
      schedule: {
        required
      },
      education: {
        required
      },
      min_price: {
        required,
        numeric,
        maxLength: maxLength(10),
        minLength: minLength(2)
      },
    },

  },
  data() {
    return {
      data: {
        name: null,
        min_price: 500,
        max_price: 0,
        category_id: null,
        phone: null,
        city_id: null,
        street: null,
        house: null,
      },
      isDisabled: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('categoriesVacancy/getItems');
    await this.$store.dispatch('experiences/getItems');
    await this.$store.dispatch('educations/getItems');
    await this.$store.dispatch('schedules/getItems');
  },
  computed: {
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
        return _.cloneDeep(this.$store.getters['categoriesVacancy/categoriesVacancies']);
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
      this.isDisabled = true;
      this.$axios.$post(`vacancies`, this.data).then(() => {
        this.$router.push({name: 'vacancies___ru'});
        this.isDisabled = false;
      }).catch((error) => {
        this.isDisabled = false;
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    }
  },
}
</script>
