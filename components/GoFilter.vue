<template>
  <modal name="GoFilter" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <div class="container flex flex-col items-center mt-[20px] scroll-smooth">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <div @click.prevent="submitted" class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
          <button :disabled="isDisabled">Применить</button>
        </div>
        <label class="pl-4 text-gray-500">По цене</label>
        от
        <input
            type="number"
            class="form-control forms-input w-20"
            placeholder=""
            v-model="priceFrom">
        до
        <input
            type="number"
            class="form-control forms-input w-20"
            placeholder=""
            v-model="priceTo">
        <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in getFilter(filters)" :key="item.id">

          <label :for="item.id" class="pl-4 text-gray-500">{{ item.name }}</label>
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
              class="form-control forms-input w-20"
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
    setTimeout(() => {
      if(this.filters){
        this.setSelectParamsFilter();
      }
    },1700);

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
      // getItems: 'categoriesAd/getItemsFull',
      getItemsAds: 'ads/getItems',
      getItemsService: 'services/getItems',
    }),
    submitted() {
      // this.isDisabled = true;
      let filtersData = [];
      console.log(this.parameters);
      _.forIn(this.parameters, function(value, key) {
        if(value !== 0) {
          filtersData.push(value);
        }
      });
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
