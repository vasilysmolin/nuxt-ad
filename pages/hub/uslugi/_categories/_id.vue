<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          услугу</h1>

        <h2 class="mb-4 w-full text-base text-black font-bold text-center leading-none truncate">{{ data.name }}</h2>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Тип</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.type">
                <option v-for="[key, value] in Object.entries(types)" :value="key" :key="key"
                        :selected="key === data.type">
                  {{ value }}
                </option>
              </select>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Категории</label>
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
              <label for="name" class="text-[#6E7191]">Название услуги</label>
              <span v-if="nameErrors" class="form-errors">
            {{ nameErrors }}
            </span>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <the-mask :mask="['+7 (###) ###-##-##']" v-model="data.phone"
                        id="floatingPassword"
                        type="text"
                        class="form-control forms-input"
                        placeholder="Ваш телефон" />
              <label class="text-[#6E7191]">Tелефон</label>
              <span v-if="phoneErrors" class="form-errors">
            {{ phoneErrors }}
            </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="description"
                      id="description"
                      placeholder="Описание"
                      v-model="data.description"
                  >{{ data.description }}</textarea>
              <span v-if="descriptionErrors" class="form-errors">
              {{ descriptionErrors }}
              </span>
            </div>
            <div class="mb-4 w-full sm:w-[27rem]">
              <input type="checkbox" id="contract" value="data.contract" v-model="data.contract">
              <label for="contract">Договор</label>
            </div>
            <div class="mb-4 w-full sm:w-[27rem]">
              <input type="checkbox" id="guarantee" value="data.guarantee" v-model="data.guarantee">
              <label for="guarantee">Гарантия</label>
            </div>
            <div class="mb-4 w-full sm:w-[27rem]">
              <input type="checkbox" id="hourly_payment" value="data.hourly_payment" v-model="data.hourly_payment">
              <label for="hourly_payment">Часовая оплата</label>
            </div>
            <div class="mb-4 w-full sm:w-[27rem]">
              <input type="checkbox" id="consultation" value="data.consultation" v-model="data.consultation">
              <label for="hourly_payment">Консультация</label>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="min_price"
                     placeholder="Зарплата"
                     v-model="data.price">
              <label for="min_price" class="text-[#6E7191]">Стоимость</label>
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
  layout: 'hub',
  head: {
    title: "Редактировать услугу на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  components: {BGeo},
  mixins: [Validations],
  data() {
    return {
      data: {},
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
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
      price: {
        required,
        numeric,
        maxLength: maxLength(10),
        minLength: minLength(2)
      },
    },

  },
  async mounted() {
    await this.$store.dispatch('services/getItem', {id: this.$route.params.id});
    this.data = _.cloneDeep(this.$store.getters['services/service']);
    await this.$store.dispatch('categoriesService/getItems');
    await this.$store.dispatch('typeServices/getItems');
  },
  computed: {
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeServices/types']);
      },
      set(types) {
        return types
      }
    },
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesService/categoriesServices']);
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
      const obj = this.data;
      Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
          delete obj[key];
        }
      });
      this.$axios.$put(`services/${this.$route.params.id}`, obj).then(() => {
        this.$router.push({name: 'uslugi___ru'});
        console.log('успех')
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    deleted() {
      this.$axios.$delete(`services/${this.$route.params.id}`).then(() => {
        this.$router.push({name: 'uslugi___ru'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    active() {
      this.$axios.$put(`services/${this.$route.params.id}/state`,{state: 'active'}).then(() => {
        this.$router.push({name: 'uslugi___ru'});
      }).catch((error) => {
      });

    },
    pause() {
      this.$axios.$put(`services/${this.$route.params.id}/state`,{state: 'pause'}).then(() => {
        this.$router.push({name: 'uslugi___ru'});
      }).catch((error) => {
      });

    },
    up() {
      this.$axios.$put(`services/${this.$route.params.id}/sort`,{}).then(() => {
        this.$router.push({name: 'uslugi___ru'});
      }).catch((error) => {
      });
    },
    checkState() {
      return this.data.state === 'active' || this.data.state === 'pause';
    }
  },
}
</script>
