<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-3 w-full text-xl text-black font-black text-center leading-none truncate">Редактировать
          объявление</h1>

        <h2 class="mb-4 w-full text-base text-black font-bold text-center leading-none truncate">{{ data.name }}</h2>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in items" :key="index">
              <label v-if="item.title.length > 0" for="name" class="pl-4 text-gray-500">{{ item.title }}</label>
              <select @change="setCategory($event, index)"  class="form-select form-select-lg mt-2 forms-select">
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
<!--                <div class="relative">-->
<!--                  <div class="absolute top-0 left-0">{{minValue(item)}}</div>-->
<!--                </div>-->
<!--                <div class="relative">-->
<!--                  <div class="absolute top-0 right-0">{{maxValue(item)}}</div>-->
<!--                </div>-->
                  <input @change="changeRange($event, item)"
                         :id="item.id"
                         type="range"
                         :min="min(item)"
                         :max="max(item)"
                         :value="rangeSort[`params-${item.alias}`]"
                         class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  >
                <div class="relative">
                  <div class="absolute top-0 left-0">{{rangeValue[`params-${item.alias}`]}}</div>
                </div>
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
            <div class="form-floating mb-6 w-full sm:w-[27rem]">


<!--              <yandex-map-->
<!--                  v-if="showMap"-->
<!--                  ymap-class="ymap-class"-->
<!--                  :zoom="10"-->
<!--                  :coords="coords"-->
<!--                  :settings="mapSettings"-->
<!--                  :cluster-options="{-->
<!--                        1: {-->
<!--                            groupByCoordinates: false,-->
<!--                            clusterDisableClickZoom: false,-->
<!--                            clusterHideIconOnBalloonOpen: false,-->
<!--                            geoObjectHideIconOnBalloonOpen: false,-->
<!--                        },-->
<!--                    }"-->
<!--                  :behaviors="['default', 'scrollZoom']"-->
<!--                  @map-was-initialized="onMapInit"-->
<!--                  @boundschange="onBoundsChange"-->
<!--              >-->
<!--&lt;!&ndash;                <ymap-marker&ndash;&gt;-->
<!--&lt;!&ndash;                      marker-id="123"&ndash;&gt;-->
<!--&lt;!&ndash;                      :coords="coords"&ndash;&gt;-->
<!--&lt;!&ndash;                      :icon="markerIcon">&ndash;&gt;-->
<!--&lt;!&ndash;                </ymap-marker>&ndash;&gt;-->
<!--              </yandex-map>-->



            <!--
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="sale_price"
                     placeholder="Зарплата"
                     v-model="data.sale_price">
              <label for="sale_price" class="text-[#6E7191]">Стоимость со скидкой</label>
            </div>
            -->
            <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
              <div class="mb-4 w-full" v-for="photo in data.photos">
                <img :src="photo" class="max-w-full h-auto rounded" alt="">
              </div>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
            </div>

            <!--
            <button :disabled="isDisabled" class="btn btn-primary inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>
             -->
            <div class="mt-6 py-2 flex justify-around items-center w-full rounded-md bg-[#262338]">

              <div @click.prevent="submitted" class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                <RefreshWhite/>
                <button :disabled="isDisabled">Сохранить</button>
              </div>

              <div @click.prevent="up" class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                <UpWhite/>
                <button v-if="data.state === 'active'">Поднять</button>
              </div>

              <div v-if="checkState()" class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-[#34304B] cursor-pointer">
                <PauseWhite/>
                <button v-if="data.state !== 'active'" @click.prevent="active">Запустить</button>
                <button v-else @click.prevent="pause">На паузу</button>
              </div>

              <div @click.prevent="deleted" class="p-3 flex flex-col justify-center items-center text-white text-[14px] tracking-wider transition-colors duration-150 bg-[#262338] rounded-md focus:shadow-outline hover:bg-red-600 cursor-pointer">
                <DeleteWhite/>
                <button>Удалить</button>
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
import {maxLength, minLength, required, integer, numeric} from 'vuelidate/lib/validators';
// import {mapGetters} from "vuex";
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import CategoriesMixin from '~/components/mixins/categories.mixin';
import UpWhite from "../../../../components/icons/UpWhite";
import PauseWhite from "../../../../components/icons/PauseWhite";
import DeleteWhite from "../../../../components/icons/DeleteWhite";
import RefreshWhite from "../../../../components/icons/RefreshWhite";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "VObject",
  components: {RefreshWhite, DeleteWhite, PauseWhite, UpWhite, yandexMap, ymapMarker},
  layout: 'hub',
  head: {
    title: "Редактировать объявление на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  data() {
    return {
      zoom: 10,
      coords: [47.79491, 52.011795],
      showMap: false,
      mapSettings: {
        apiKey: process.env.YANDEX_MAP,
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
      },
      markerIcon: {
        layout: 'default#imageWithContent',
        // imageHref: 'https://image.flaticon.com/icons/png/512/33/33447.png',
        imageSize: [43, 43],
        imageOffset: [0, 0],
        content: '123 v12',
        contentOffset: [0, 15],
        // contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      },
      data: {
      },
      files: [],
      isDisabled: false,
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(5)
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
    await this.$store.dispatch('ads/getItem', {id: this.$route.params.id, expand: 'profile.user'});
    this.data = _.cloneDeep(this.$store.getters['ads/ad']);
    if(this.category.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems', {from: 'cabinet'});
    }
    await this.$store.dispatch('categoriesAd/getItem', {id: this.data.category_id});
    this.items = this.iterator(this.category);
    this.category_id = this.index(this.items);
    this.setSelectParams();

  },
  computed: {
    ...mapGetters({
      filters: 'categoriesAd/categoryAds',
    }),
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesAd/categoriesAds']);
      },
      set(category) {
        return category
      }
    },
    nameErrors: {
      get() {
        if (!this.$v.data.name?.$dirty) {
          return '';
        }

        if (!this.$v.data.name.required) {
          return 'Ой, вы забыли написать название объявления';
        }

        if (!this.$v.data.name.maxLength) {
          return 'Текст объявления вы можете написать в поле Описание';
        }
        if (!this.$v.data.name.minLength) {
          return 'Как вы думаете, вас поймут?';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    descriptionErrors: {
      get() {
        if (!this.$v.data.description?.$dirty) {
          return '';
        }

        if (!this.$v.data.description.required) {
          return 'Правильное описание даёт преимущество объявлению';
        }

        if (!this.$v.data.description.maxLength) {
          return 'Давайте сделаем текст поменьше';
        }
        if (!this.$v.data.description.minLength) {
          return 'Опишите более подробно и результат не заставит ждать';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    priceErrors() {
      if (!this.$v.data.price?.$dirty) {
        return '';
      }

      if (!this.$v.data.price.required) {
        return 'Напишите справедливую цену';
      }
      if (!this.$v.data.price.maxLength) {
        return 'Кажется, вы указали заоблачную стоимость';
      }
      if (!this.$v.data.price.minLength) {
        return 'Рекомендуем указать цену от 10 рублей';
      }
      if (!this.$v.data.price.numeric) {
        return 'Вас не поймут, цена — это цифры';
      }

      return '';
    },
    category_idErrors() {
      if (!this.$v.data.category_id?.$dirty) {
        return '';
      }

      if (!this.$v.data.category_id.required) {
        return 'Выберите категорию для объявления';
      }
      if (!this.$v.data.category_id.numeric) {
        return 'Что-то пошло не так, обратитесь в поддержку';
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
      let data = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        data.append('files[]', this.files[i]);
      }
      _.forIn(this.parameters, function(value, key) {
        data.append('filter[]', value);
      });
      data.append('name', this.data.name);
      data.append('description', this.data.description);
      data.append('price', this.data.price);
      data.append('sale_price', this.data.sale_price);
      data.append('category_id', this.data.category_id);
      data.append('_method', 'put');
      this.$axios.$post(`declarations/${this.$route.params.id}`, data).then(() => {
          this.$router.push({name: 'catalog'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    deleted() {
      this.$axios.$delete(`declarations/${this.$route.params.id}`).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    active() {
      this.$axios.$put(`declarations/${this.$route.params.id}/state`,{state: 'active'}).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
      });

    },
    pause() {
      this.$axios.$put(`declarations/${this.$route.params.id}/state`,{state: 'pause'}).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
      });

    },
    up() {
      this.$axios.$put(`declarations/${this.$route.params.id}/sort`,{}).then(() => {
        this.$router.push({name: 'catalog'});
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
      _.each(files, function(file){
        $this.data.photos.push(URL.createObjectURL(file))
      });
    },
    onMapInit(event) {
      this.zoom = event.getZoom();
    },
    onBoundsChange(event) {
      this.zoom = event.originalEvent.map.getZoom();
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
