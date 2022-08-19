<template>
  <modal name="GoFilter" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <div class="container flex flex-col items-center mt-[20px] overflow-y-scroll">
      <div class="flex flex-col items-center px-5 py-3 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="flex text-center text-2xl mb-5">Фильтр</h1>
        <div class="mb-4 w-full sm:w-[27rem]">
        <label class="text-gray-500 mr-4">По цене</label>
        <input
            type="number"
            class="form-control forms-input-custom w-20"
            placeholder="от"
            v-model="priceFrom">
        <input
            type="number"
            class="form-control forms-input-custom w-20"
            placeholder="до"
            v-model="priceTo">
        </div>
        <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in getFilter(filters)" :key="item.id">

          <label :for="item.id" class="text-gray-500 mr-4">{{ item.name }}</label>
          <select
              @change="changeSelect($event, item)"
              v-model="parameters[`params-${item.alias}`]"
              v-if="isSelect(item)" class="form-select form-select-lg mt-2 forms-select"
          >
            <option value="0" key="0">Все</option>
            <option v-for="parameter in item.parameters"
                    :value="parameter.id"
                    :key="parameter.id"
            >
              {{ parameter.value }}
            </option>
          </select>



          <template v-if="isRange(item)" class="form-select form-select-lg mt-2 forms-select">
          <input
              @change="changeRange($event, item)"
              :id="item.id"
              type="number"
              class="form-control forms-input-custom w-20"
              placeholder=""
              :value="rangeSort[`params-${item.alias}`]">
<!--            <input @change="changeRange($event, item)"-->
<!--                   :id="item.id" type="range"-->
<!--                   :min="min(item)"-->
<!--                   :max="max(item)"-->
<!--                   :value="rangeSort[`params-${item.alias}`]"-->
<!--                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"-->
<!--            >-->
<!--            <div class="relative">-->
<!--              <div class="absolute top-0 left-0">{{rangeValue[`params-${item.alias}`]}}</div>-->
<!--            </div>-->
          </template>
          <template v-if="isCheckbox(item)" class="form-select form-select-lg mt-2 forms-select">
            <div class="form-check" v-for="parameter in item.parameters">
              <input class="form-check-input appearance-none h-4 w-4
                  border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                  checked:border-blue-600 focus:outline-none transition duration-200
                  mt-1 align-top bg-no-repeat bg-center bg-contain float-left
                  mr-2 cursor-pointer"
                     type="checkbox"
                     :value="parameters[`params-${item.alias}-${parameter.id}`]"
                     :id="parameter.id"
                     :checked="parameters[`params-${item.alias}-${parameter.id}`] === parameter.id"
                     @change="changeCheckbox($event, parameter.id, item)"
              >
              <label class="form-check-label inline-block text-gray-800" :for="parameter.id">
                {{ parameter.value }}
              </label>
            </div>

          </template>
        </div>
        <footer class="fixed flex justify-center items-center bottom-0 w-full px-5 py-1 bg-[#F7F7FC]">
          <button @click.prevent="submitted" type="button" :disabled="isDisabled"
                  class="btn btn-primary inline-block mt-1 px-9 py-3 bg-[#00A05D]
                  text-white font-bold text-sm tracking-wider leading-snug
                  rounded focus:outline-none focus:ring-0  transition duration-150
                  ease-in-out hover:bg-[#049055]">
            Применить
          </button>
        </footer>
<!--        <div  class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">-->
<!--          <button :disabled="isDisabled">Применить</button>-->
<!--        </div>-->

      </div>
    </div>

  </modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';

export default {
  name: 'GoFilter',
  mixins: [CategoriesMixin],
  async mounted() {
    // setTimeout(() => {
      if(this.filters){
        this.setSelectParamsFilter();
      }
    // },1700);

  },
  data() {
    return {
      querySearch: null,
      isDisabled: false,
      priceFrom: null,
      priceTo: null,
      data: {
      },
      files: [],
    }
  },
  computed: {
    ...mapGetters({
      filters: 'filters/filter',
      type: 'filters/type',
    }),
  },
  methods: {
    ...mapActions({
      getItemsAds: 'ads/getItems',
      setParameters: 'filters/setParameters',
      getItemsService: 'services/getItems',
      getItemsResumes: 'resumes/getItems',
      getItemsVacancies: 'vacancies/getItems',
    }),
    submitted() {
      // this.isDisabled = true;
      let filtersData = [];
      // console.log(this.parameters);
      _.forIn(this.parameters, function(value, key) {
        if(value !== 0) {
          filtersData.push(value);
        }
      });
      this.setParameters({
          parameters: filtersData
      })
      if(_.isEmpty(this.priceFrom)) {
        this.priceFrom = null;
      }
      if(_.isEmpty(this.priceTo)) {
        this.priceTo = null;
      }
      if(this.type === 'ads') {
        this.getItemsAds({
          alias: this.filters?.alias,
          filtersArray: filtersData,
          priceFrom: this.priceFrom,
          priceTo: this.priceTo
        }
        ).then(() => {
          this.$modal.hide('GoFilter');
        });
      }
      if(this.type === 'service') {
        this.getItemsService({
              alias: this.filters?.alias,
              filtersArray: filtersData,
              priceFrom: this.priceFrom,
              priceTo: this.priceTo
            }
        ).then(() => {
          this.$modal.hide('GoFilter');
        });
      }
      if(this.type === 'resume') {
        this.getItemsResumes({
              alias: this.filters?.alias,
              filtersArray: filtersData,
              priceFrom: this.priceFrom,
              priceTo: this.priceTo
            }
        ).then(() => {
          this.$modal.hide('GoFilter');
        });
      }
      if(this.type === 'vacancy') {
        this.getItemsVacancies({
              alias: this.filters?.alias,
              filtersArray: filtersData,
              priceFrom: this.priceFrom,
              priceTo: this.priceTo
            }
        ).then(() => {
          this.$modal.hide('GoFilter');
        });
      }

      // this.$axios.$get(`declarations/`, data).then(() => {
      //   this.$modal.hide('GoFilter');
      // }).catch((error) => {
      // });

    },
    hide() {
      this.$modal.hide('GoFilter');
    },

  },
}
</script>

<style scoped>
.forms-input-custom {
  @apply
  /*block*/
  w-20
  px-3
  py-1.5
  text-base
  font-normal
  text-black
  bg-[#EFF0F6] bg-clip-padding
  border border-solid border-[#EFF0F6]
  rounded-lg
  transition
  ease-in-out
  m-0
  focus:text-black focus:bg-white focus:border-black focus:outline-hidden
}
</style>
