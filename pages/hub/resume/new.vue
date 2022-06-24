<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-5 w-full text-xl text-black font-bold text-center leading-none truncate">Создать резюме</h1>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]">
              <label for="name" class="pl-4 text-gray-500">Тип</label>
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.type">
                <option v-for="[key, value] in Object.entries(types)" :value="key" :key="key"
                        :selected="key === 'my'">
                  {{ value }}
                </option>
              </select>
            </div>

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
import * as _ from "lodash";

export default {
  layout: 'hub',
  head: {
    title: "Создать новое резюме на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      data: {
        name: '',
        price: '',
        category_id: null,
        address: '',
        phone: '',
      },
      isDisabled: false,
    }
  },
  async mounted() {
    await this.$store.dispatch('categoriesResume/getItems');
    await this.$store.dispatch('experiences/getItems');
    await this.$store.dispatch('educations/getItems');
    await this.$store.dispatch('schedules/getItems');
    await this.$store.dispatch('typeJobs/getItems');
  },
  computed: {
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeJobs/types']);
      },
      set(types) {
        return types
      }
    },
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
    submitted() {
      this.isDisabled = true;
      this.$axios.$post(`resume`, this.data).then(() => {
        this.$router.push({name: 'resume'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    }
  },
}
</script>
