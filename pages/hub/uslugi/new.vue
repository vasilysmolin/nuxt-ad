<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Создать
          услугу</h1>

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
              <label for="name" class="pl-4 text-gray-500">Категория</label>
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
              <label for="name" class="text-[#6E7191]">Название услуги</label>
              <span v-if="nameErrors" class="caption-2 px-1 pt-s c-error">
            {{ nameErrors }}
            </span>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="phone"
                     placeholder="Телефон"
                     v-model="data.phone">
              <label for="phone" class="text-[#6E7191]">Телефон</label>
              <span v-if="phoneErrors" class="caption-2 px-1 pt-s c-error">
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
            </div>

            <button :disabled="isDisabled" class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Разместить
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {maxLength, minLength, required, integer, numeric} from 'vuelidate/lib/validators';
import {mapGetters} from "vuex";

export default {
  name: "VObject",
  layout: 'hub',
  head: {
    title: "Новая услуга на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      data: {
        name: '',
        price: 500,
        category_id: null,
        description: '',
        contract: false,
        guarantee: false,
        hourly_payment: false,
        consultation: false,
        phone: '',
      },
      isDisabled: false,
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
    },

  },
  async mounted() {
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
    nameErrors: {
      get() {
        if (!this.$v.data.name.$dirty) {
          return '';
        }

        if (!this.$v.data.name.required) {
          return 'Введите название';
        }

        if (!this.$v.data.name.maxLength) {
          return 'Превышена допустимая длина названия';
        }
        if (!this.$v.data.name.minLength) {
          return 'Ошибка, минимальное значение';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    phoneErrors() {
      if (!this.$v.data.phone.$dirty) {
        return '';
      }

      if (!this.$v.data.phone.required) {
        return 'Введите телефон';
      }

      if (!this.$v.data.phone.maxLength) {
        return 'Превышена допустимая длина названия';
      }
      if (!this.$v.data.phone.minLength) {
        return 'Ошибка, минимальное значение';
      }
      if (!this.$v.data.phone.numeric) {
        return 'Укажите только числа, без других символов';
      }

      return '';
    },
  },
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.isDisabled = true;
      this.$axios.$post(`services`, this.data).then(() => {
        this.$router.push({name: 'uslugi'});
        console.log('успех')
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
  },
}
</script>
