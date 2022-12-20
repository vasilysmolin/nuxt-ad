<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-3 w-full text-xl text-black font-black text-center leading-none truncate">{{
            $t('catalog.edit')
          }}</h1>

        <h2 class="mb-4 w-full text-base text-black font-bold text-center leading-none truncate">{{ data.name }}</h2>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in items" :key="index">
              <label v-if="item.title.length > 0" for="name" class="pl-4 text-gray-500">{{ item.title }}</label>
              <select @change="setCategory($event, index)" class="form-select form-select-lg mt-2 forms-select">
                <option v-for="category in item.categories"
                        :value="category.id"
                        :key="category.id"
                        :selected="category.id === category_id[index]"
                >
                  {{ category.name }}
                </option>
              </select>
              <span v-if="category_idErrors" class="form-errors">
            {{ category_idErrors }}
            </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in getFilter(filters)" :key="item.id">
              <label :for="item.id" class="pl-4 text-gray-500">{{ item.name }}</label>
              <select
                  @change="changeSelect($event, item)"
                  v-if="isSelect(item)" class="form-select form-select-lg mt-2 forms-select"
              >
                <option v-for="parameter in item.parameters"
                        :value="parameter.id"
                        :key="parameter.id"
                        :selected="checkSelectParams(item.id, parameter.id, item.parameters, item.alias)"
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
              </template>
              <template v-if="isCheckbox(item)" class="form-select form-select-lg mt-2 forms-select">
                <div class="form-check" v-for="parameter in item.parameters">
                  <input class="form-check-input appearance-none h-4 w-4
                  border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                  checked:border-blue-600 focus:outline-none transition duration-200
                  mt-1 align-top bg-no-repeat bg-center bg-contain float-left
                  mr-2 cursor-pointer"
                         type="checkbox"
                         :value="parameter.id"
                         :id="parameter.id"
                         :checked="checkCheckboxParams(item.id, parameter.id, item.parameters, item.alias)"
                         @change="changeCheckbox($event, parameter.id, item)"
                  >
                  <label class="form-check-label inline-block text-gray-800" :for="parameter.id">
                    {{ parameter.value }}
                  </label>
                </div>
              </template>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <the-mask :mask="['####']" v-model="data.date_build"
                        id="date_build"
                        type="text"
                        class="form-control forms-input"
                        :placeholder="$t('catalog.dateBuild')"/>
              <label class="text-[#6E7191]">{{ $t('catalog.dateBuild') }}</label>
              <span v-if="dateErrors" class="form-errors">
            {{ dateErrors }}
            </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
              <vue-editor v-model="data.description" :editorToolbar="customToolbar"></vue-editor>
              <span v-if="descriptionErrors" class="form-errors">
            {{ descriptionErrors }}
            </span>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="price"
                     :placeholder="$t('catalog.price')"
                     v-model="data.price">
              <label for="price" class="text-[#6E7191]">{{ $t('catalog.price') }}</label>
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

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
                <div class="mb-4 w-full" v-for="photo in data.photos">
                  <img :src="photo" class="max-w-full h-auto rounded" alt="">
                </div>
              </div>
              <div class="form-floating mb-6 w-full sm:w-[27rem]">
                <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
              </div>
              <div class="mt-6 py-2 flex justify-around items-center w-full rounded-md bg-[#262338]">

                <div v-if="data.external_id === null" @click.prevent="submitted"
                     class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                  <RefreshWhite/>
                  <button :disabled="isDisabled">{{ $t('save') }}</button>
                </div>

                <div @click.prevent="up"
                     class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                  <UpWhite/>
                  <button v-if="data.state === 'active'">{{ $t('up') }}</button>
                </div>

                <div v-if="checkState()"
                     class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                  <PauseWhite/>
                  <button v-if="data.state !== 'active'" @click.prevent="active">{{ $t('start') }}</button>
                  <button v-else @click.prevent="pause">{{ $t('pause') }}</button>
                </div>

                <div v-if="data.external_id === null" @click.prevent="deleted"
                     class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-red-600 cursor-pointer">
                  <DeleteWhite/>
                  <button>{{ $t('delete') }}</button>
                </div>
              </div>
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
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import UpWhite from "../../../../components/icons/UpWhite";
import PauseWhite from "../../../../components/icons/PauseWhite";
import DeleteWhite from "../../../../components/icons/DeleteWhite";
import RefreshWhite from "../../../../components/icons/RefreshWhite";
import Validations from "~/components/mixins/validations.mixin"
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VObject",
  components: {RefreshWhite, DeleteWhite, PauseWhite, UpWhite, BGeo},
  layout: 'hub',
  head: {
    title: "Редактировать объявление на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin, Validations],
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{list: "ordered"}, {list: "bullet"}],
        ["code-block"]
      ],
      hasName: true,
      currentCat: null,
      data: {
        cityId: null,
        address: null
      },
      files: [],
      isDisabled: false,
    }
  },
  validations: {
    data: {
      date_build: {
        required,
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
    },

  },
  async mounted() {
    this.showMap = true;
    await this.$store.dispatch('realty/getItem', {id: this.$route.params.id, expand: 'profile.user'}).then(() => {
      this.data = _.cloneDeep(this.$store.getters['realty/realty']);
    });
    if (this.category.length === 0) {
      await this.$store.dispatch('categoriesRealty/getItems', {from: 'cabinet', id: '410'});
    }
    await this.$store.dispatch('categoriesRealty/getItem', {id: this.data.category_id});
    this.items = this.iterator(this.category);
    this.category_id = this.index(this.items);
    if (this.category_id.includes(410)) {
      this.hasName = false;
    } else {
      this.hasName = true;
    }
    this.setSelectParams();

  },
  computed: {
    ...mapGetters({
      filters: 'categoriesRealty/categoryRealties',
      cities: 'cities/citiesFull',
    }),
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesRealty/categoriesRealties']);
      },
      set(category) {
        return category
      }
    },
  },
  beforeDestroy() {
    this.parameters = {};
    this.removeItem();
  },
  methods: {
    ...mapActions({
      removeItem: 'categoriesRealty/removeItem',
    }),
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
      let data = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        data.append('files[]', this.files[i]);
      }
      _.forIn(this.parameters, function (value, key) {
        data.append('filter[]', value);
      });
      data.append('date_build', this.data.date_build);
      data.append('description', this.data.description);
      data.append('price', this.data.price);
      data.append('sale_price', this.data.price);
      data.append('category_id', this.data.category_id);
      data.append('city_id', this.data.city_id);
      data.append('latitude', this.data.latitude);
      data.append('longitude', this.data.longitude);
      data.append('street', this.data.street);
      data.append('house', this.data.house);
      data.append('_method', 'put');
      this.$axios.$post(`realties/${this.$route.params.id}`, data).then(() => {
        this.$router.push({name: 'new-build___ru'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    deleted() {
      this.$axios.$delete(`realties/${this.$route.params.id}`).then(() => {
        this.$router.push({name: 'new-build___ru'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    active() {
      this.$axios.$put(`realties/${this.$route.params.id}/state`, {state: 'active'}).then(() => {
        this.$router.push({name: 'new-build___ru'});
      }).catch((error) => {
      });

    },
    pause() {
      this.$axios.$put(`realties/${this.$route.params.id}/state`, {state: 'pause'}).then(() => {
        this.$router.push({name: 'new-build___ru'});
      }).catch((error) => {
      });

    },
    up() {
      this.$axios.$put(`realties/${this.$route.params.id}/sort`, {}).then(() => {
        this.$router.push({name: 'catalog___ru'});
      }).catch((error) => {
      });
    },
    checkState() {
      return this.data.state === 'active' || this.data.state === 'pause';
    },
    isParent(category) {
      return category.parent_id === null;
    },
    onFileChange(e) {
      const files = e.target.files;
      let $this = this;
      this.files = files;
      _.each(files, function (file) {
        $this.data.photos.push(URL.createObjectURL(file))
      });
    },
  },
}
</script>

<style>
.ymap-container {
  height: 100%;
}

.ymap-class {
  width: 100vw;
  height: 100%;
}
</style>
