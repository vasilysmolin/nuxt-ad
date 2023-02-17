<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-black text-center leading-none truncate">{{
            $t('house.edit')
          }}</h1>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">
            <label for="name" class="items-start text-left pl-4 text-gray-500">{{ $t('house.finishing') }}</label>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.finishing">
                <option v-for="[key, value] in Object.entries(finishing)" :value="key" :key="key"
                        :selected="key === data.finishing">
                  {{ value }}
                </option>
              </select>
            </div>

            <label for="name" class="items-start text-left pl-4 text-gray-500">{{ $t('house.typeHouse') }}</label>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.type">
                <option v-for="[key, value] in Object.entries(typeHouse)" :value="key" :key="key"
                        :selected="key === data.type">
                  {{ value }}
                </option>
              </select>
            </div>

            <label for="name" class="items-start text-left pl-4 text-gray-500">{{ $t('house.elite') }}</label>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.elite">
                <option v-for="[key, value] in Object.entries(elite)" :value="key" :key="key"
                        :selected="key === data.elite">
                  {{ value }}
                </option>
              </select>
            </div>

            <label for="name" class="items-start text-left pl-4 text-gray-500">{{ $t('house.deadline') }}</label>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <select class="form-select form-select-lg mt-2 forms-select"
                      v-model="data.deadline">
                <option v-for="[key, value] in Object.entries(deadline)" :value="key" :key="key"
                        :selected="key === data.deadline">
                  {{ value }}
                </option>
              </select>
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

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="nameAgent"
                     :placeholder="$t('catalog.nameAgent')"
                     v-model="dataAgent.name">
              <label for="nameAgent" class="text-[#6E7191]">{{ $t('catalog.nameAgent') }}</label>

            </div>


            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="name"
                     :placeholder="$t('house.name')"
                     v-model="data.name">
              <label for="name" class="text-[#6E7191]">{{ $t('house.name') }}</label>
              <span v-if="nameErrors" class="form-errors">
            {{ nameErrors }}
            </span>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="number"
                     class="form-control forms-input" id="total_floors"
                     :placeholder="$t('house.total_floors')"
                     v-model="data.total_floors">
              <label for="name" class="text-[#6E7191]">{{ $t('house.total_floors') }}</label>
              <span v-if="total_floorsErrors" class="form-errors">
            {{ total_floorsErrors }}
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
import {maxLength, minLength, required} from 'vuelidate/lib/validators';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import {mapActions, mapGetters} from "vuex";

import Validations from "~/components/mixins/validations.mixin"
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import BGeo from "~/components/blocks/BGeo";

export default {
  name: "realtyHouseNew",
  layout: 'hub',
  head: {
    title: "Разместить дом на Тапиго",
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
      data: {
        cityId: null,
        city_id: null,
        street: null,
        house: null,
        address: null
      },
      files: [],
      dataAgent: {
        name: null,
      },
      isDisabled: false,
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(3)
      },
      total_floors: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(1)
      },
      street: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(2)
      },
      city_id: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(2)
      },
      description: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
    },

  },
  async mounted() {
    await this.$store.dispatch('houses/getItem', {id: this.$route.params.id, expand: 'profile.user'}).then(() => {
      this.data = _.cloneDeep(this.$store.getters['houses/house']);
    });
    this.dataAgent.name = this.data?.agent?.name;
    if (Object.keys(this.$store.getters['finishing/finishing']).length === 0) {
      await this.$store.dispatch('finishing/getItems');
    }
    if (Object.keys(this.$store.getters['typeHouse/typeHouse']).length === 0) {
      await this.$store.dispatch('typeHouse/getItems');
    }
    if (Object.keys(this.$store.getters['deadLine/deadLine']).length === 0) {
      await this.$store.dispatch('deadLine/getItems');
    }
    if (Object.keys(this.$store.getters['elite/elite']).length === 0) {
      await this.$store.dispatch('elite/getItems');
    }
  },
  computed: {
    ...mapGetters({
      cities: 'cities/citiesFull',
      finishing: 'finishing/finishing',
      typeHouse: 'typeHouse/typeHouse',
      deadline: 'deadLine/deadLine',
      elite: 'elite/elite',
    }),
  },
  methods: {
    getCityId(event) {
      this.data.city_id = event;
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

      data.append('name', this.data.name);
      if (this.data.finishing) {
        data.append('finishing', this.data.finishing);
      }
      data.append('name', this.data.name);
      data.append('finishing', this.data.finishing);
      data.append('type', this.data.type);
      data.append('total_floors', this.data.total_floors);
      data.append('deadline', this.data.deadline);
      data.append('date_build', this.data.date_build);
      data.append('name_agent', this.dataAgent?.name);
      data.append('description', this.data.description);
      data.append('city_id', this.data.city_id);
      data.append('street', this.data.street);
      data.append('elite', this.data.elite);
      data.append('house', this.data.house);
      data.append('latitude', this.data.latitude);
      data.append('longitude', this.data.longitude);
      data.append('_method', 'put');
      this.$axios.$post(`houses/${this.$route.params.id}`, data).then(() => {
        this.$router.push({name: 'house___ru'});
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
    onClick(e) {
      this.coordsBal = e.get('coords');
    },
  },
}
</script>
