<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-black text-center leading-none truncate">Создать
          объявление</h1>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in items" :key="index">
              <label v-if="item.title.length > 0" for="name" class="pl-4 text-gray-500">{{ item.title }}</label>
              <select @change="setCategoryCreate($event, index)" v-model="category_id[index]"
                      class="form-select form-select-lg mt-2 forms-select">
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
              <select @change="changeSelect($event, item)" v-if="isSelect(item)"
                      class="form-select form-select-lg mt-2 forms-select"
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

                <!--                <input @change="changeRange($event, item)"-->
                <!--                       :id="item.id" type="range"-->
                <!--                       :min="min(item)"-->
                <!--                       :max="max(item)"-->
                <!--                       :value="rangeSort[`params-${item.alias}`]"-->
                <!--                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"-->
                <!--                >-->
                <!--                <div class="relative">-->
                <!--                  <div class="absolute top-0 left-0">{{rangeValue[`params-${item.alias}`]}}</div>-->
                <!--                </div>-->
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

            <div v-if="hasName" class="form-floating mb-4 w-full sm:w-[27rem]">
              <the-mask :mask="['####']" v-model="data.date_build"
                        id="date_build"
                        type="text"
                        class="form-control forms-input"
                        placeholder="Дата постройки"/>
              <label class="text-[#6E7191]">Дата постройки</label>
              <span v-if="dateErrors" class="form-errors">
            {{ dateErrors }}
            </span>
            </div>


            <div v-if="hasName" class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="name"
                     placeholder="Название вакансии"
                     v-model="data.name">
              <label for="name" class="text-[#6E7191]">Название объявления</label>
              <span v-if="nameErrors" class="form-errors">
            {{ nameErrors }}
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

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="price"
                     placeholder="Зарплата"
                     v-model="data.price">
              <label for="price" class="text-[#6E7191]">Стоимость</label>
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

            <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
              <div class="mb-4 w-full" v-for="photo in data.photos">
                <img :src="photo" class="w-full h-auto rounded" alt="">
              </div>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
              <span v-if="photosErrors" class="form-errors w-full mb-2">{{ photosErrors }}</span>
            </div>

            <button :disabled="isDisabled"
                    class="btn btn-primary inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
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
import {maxLength, minLength, numeric, required} from 'vuelidate/lib/validators';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import {mapActions, mapGetters} from "vuex";
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import Validations from "~/components/mixins/validations.mixin"
import BGeo from "~/components/blocks/BGeo";

export default {
  name: "VObject",
  layout: 'hub',
  head: {
    title: "Разместить объявление на Тапиго",
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Список'
      }
    ]
  },
  mixins: [CategoriesMixin, Validations],
  components: {yandexMap, ymapMarker, BGeo},
  data() {
    return {
      query: '',
      hasName: true,
      data: {
        name: '',
        price: null,
        sale_price: 500,
        category_id: null,
        city_id: null,
        street: null,
        house: null,
        description: '',
        photos: [],
      },
      files: [],
      isDisabled: false,
    }
  },
  beforeDestroy() {
    this.parameters = {};
    this.removeItem();
  },
  validations: {
    data: {
      // name: {
      //   required,
      //   maxLength: maxLength(70),
      //   minLength: minLength(5)
      // },
      photos: {
        required,
      },
      date_build: {
        required,
      },
      category_id: {
        required,
        numeric,
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
    if (this.category.length === 0) {
      await this.$store.dispatch('categoriesRealty/getItems', {from: 'cabinet', id: '382,381'});
    }
    this.items.push({
      title: 'Категории',
      categories: this.category
    });
    this.showMap = true;

  },
  computed: {
    ...mapGetters({
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
    filters: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesRealty/categoryRealties']);
      },
      set(category) {
        return category
      }
      // filters: 'categoriesAd/categoryAds',
    },
  },
  methods: {
    ...mapActions({
      removeItem: 'categoriesRealty/removeItem',
    }),
    getCityId(event) {
      this.data.city_id = event;
    },
    isRealtyFlat() {
      return _.find(this.category_id, (cat) => cat === 383 || cat === 12 || cat === 410);
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
      // this.isDisabled = false;
      // return;
      data.append('name', this.data.name);
      data.append('date_build', this.data.date_build);
      data.append('description', this.data.description);
      data.append('price', this.data.price);
      data.append('sale_price', this.data.sale_price);
      data.append('category_id', this.data.category_id);
      data.append('city_id', this.data.city_id);
      data.append('latitude', this.data.latitude);
      data.append('longitude', this.data.longitude);
      data.append('street', this.data.street);
      data.append('house', this.data.house);
      this.$axios.$post(`realties`, data).then(() => {
        this.$router.push({name: 'realty___ru'});
        console.log('успех')
      }).catch((error) => {

        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    onFileChange(e) {
      const files = e.target.files;
      let $this = this;
      this.files = files;
      _.each(files, function (file) {
        $this.data.photos.push(URL.createObjectURL(file))
      });
    },
    onMapInit(event) {
      this.zoom = event.getZoom();
    },
    onBoundsChange(event) {
      this.zoom = event.originalEvent.map.getZoom();
    },
    checkCity() {
      return this.user?.city;
    },
    ...mapActions({
      getItems: 'cities/getItemsFull',
      removeItemsFull: 'cities/removeItemsFull',
    }),
    getCity(city) {
      this.query = city.name;
      this.data.city_id = city.id;
      this.coords = [city.latitude, city.longitude];
      this.coordsBal = [city.latitude, city.longitude];
      this.removeItemsFull();
    },
    onClick(e) {
      this.coordsBal = e.get('coords');
    },
    debounceInput: _.debounce(function (e) {
      if (this.query === '') {
        this.error = true;
        this.removeItemsFull();
      } else {
        this.error = false;
        this.getItems({querySearch: this.query}).then((res) => {
        }).catch((error) => {
          // console.log(error.response.data.errors);
          // this.$v.nameErrors = 'какой-то текст';
        });
      }

    }, 500)
  },
}
</script>
