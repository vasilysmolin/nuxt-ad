<template>
  <div class="container flex flex-col items-center mt-[70px] pb-10">
    <NuxtLink :to="`/vacancies`">
      <h1 class="text-3xl font-bold underline">Все вакансии</h1>
    </NuxtLink>

    <h1 class="text-3xl font-bold underline">Название вакансии: {{ data.name }}</h1>
    <div class="form-group">
      <label for="name">Выберите направление</label>
      <select class="form-control" v-model="data.category_id">
        <option v-for="item in category" :value="item.id" :key="item.id" :selected="item.id === data.category_id">
          {{ item.name }}
        </option>
      </select>
      <!--      <VSelect-->
      <!--          :model="data.category_id"-->
      <!--          :items="category"-->
      <!--          :select="data.category_id"-->
      <!--      />-->
    </div>
    <div class="form-group">
      <label for="name">Опыт работы</label>
      <select class="form-control" v-model="data.experience">
        <option v-for="[key, value] in Object.entries(experiences)" :value="key" :key="key" :selected="key === data.experience">
          {{ value }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="name">Образование</label>
      <select class="form-control" v-model="data.education">
        <option v-for="[key, value] in Object.entries(education)" :value="key" :key="key" :selected="key === data.education">
          {{ value}}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="name">График работы</label>
      <select class="form-control" v-model="data.schedule">
        <option v-for="[key, value] in Object.entries(schedule)" :value="key" :key="key" :selected="key === data.schedule">
          {{ value}}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="name">Обязанности</label>
      <textarea
          name="duties"
          id="duties"
          class="form-control"
          v-model="data.duties"
          placeholder="Обязанности" rows="5">
          {{ data.duties }}
        </textarea>
    </div>
    <div class="form-group">
      <label for="name">Требования</label>
      <textarea name="demands" id="demand" class="form-control"
                v-model="data.demands"
                placeholder="Требования" rows="5">{{ data.demands }}</textarea>
    </div>
    <div class="form-group">
      <label for="name">Название вакансии</label>
      <input type="text"
             id="name"
             class="form-control"
             v-model="data.name">
    </div>
    <div class="form-group">
      <label for="address">Адрес офиса</label>
      <input type="text"
             id="address"
             class="form-control"
             v-model="data.address">
    </div>
    <div class="form-group">
      <label for="min_price">Зарплата</label>
      <input type="text"
             id="min_price"
             class="form-control"
             v-model="data.min_price">
    </div>
    <div class="form-group">
      <label for="phone">Телефон</label>
      <input type="text"
             id="phone"
             class="form-control"
             v-model="data.phone">
    </div>
    <button class="btn btn-primary"
            @click.prevent="submitted">Разместить
    </button>
  </div>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
// import VSelect from "../../../components/ui/v-select";

export default {
  name: "VObject",
  layout: 'hub',
  // components: {VSelect},
  data() {
    return {
      data: {},
    }
  },
  async fetch() {
    await this.$store.dispatch('vacancies/getItem', { id: this.$route.params.id  });
    this.data = _.cloneDeep(this.$store.getters['vacancies/vacancy']);
    await this.$store.dispatch('categoriesVacancy/getItems');
    await this.$store.dispatch('experiences/getItems');
    await this.$store.dispatch('educations/getItems');
    await this.$store.dispatch('schedules/getItems');

  },
  mounted() {
    console.log('-----------');
  },
  computed: {
    experiences: {
      get(){
        return _.cloneDeep(this.$store.getters['experiences/experience']);
      },
      set(experience){
        return experience
      }
    },
    education: {
      get(){
        return _.cloneDeep(this.$store.getters['educations/education']);
      },
      set(education){
        return education
      }
    },
    schedule: {
      get(){
        return _.cloneDeep(this.$store.getters['schedules/schedule']);
      },
      set(schedule){
        return schedule
      }
    },
    category: {
      get(){
        return _.cloneDeep(this.$store.getters['categoriesVacancy/categoriesVacancies']);
      },
      set(category){
        return category
      }
    },
  },
  methods: {
    submitted() {
      let resp = this.data;
      this.$axios.$put(`vacancies/${this.$route.params.id}`, resp);
    },
  },
}
</script>
