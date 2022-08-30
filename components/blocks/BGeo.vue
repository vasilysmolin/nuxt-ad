<template>
  <div>
    <div class="form-floating mb-4 w-full sm:w-[27rem]">
      <BInput
          :value="query"
          type="text"
          :placeholder="$t('catalog.city')"
          :error="cityErrors"
          v-on:input="debounceInput"
          @input="onInputCity"
      />
      <article class="relative mx-auto w-full sm:w-[27rem] bg-white z-50">
        <ul class="pt-1 px-3 w-full leading-8" v-if="cities.length > 0">
          <li @click="getCity(city)" style="list-style-type: none;" v-for="city in cities" :key="city.id">
            <nuxt-link to="#" class="text-blue-700 hover:text-black">
              {{ city.name }}
            </nuxt-link>
          </li>
        </ul>
      </article>
    </div>
    <div v-if="showAddress" class="form-floating mb-4 w-full sm:w-[27rem]">
      <BInput
          :value="addressQuery"
          type="text"
          :placeholder="$t('catalog.address')"
          v-on:input="debounceInputAddress"
          @input="onInputAddress"
      />
      <article class="relative mx-auto w-full sm:w-[27rem] bg-white z-50">
        <ul class="pt-1 px-3 w-full leading-8" v-if="addresses.length > 0">
          <li @click="getAddress(address)" style="list-style-type: none;" v-for="address in addresses">
            <nuxt-link to="#" class="text-blue-700 hover:text-black">
              {{ address.value }}
            </nuxt-link>
          </li>
        </ul>
      </article>
    </div>
    <div v-if="showMap" class="form-floating mb-6 w-full sm:w-[27rem]">
      <yandex-map
          ref="map"
          :coords="coords"
          zoom="10"
          style="width: 100%; height: 250px;"
          :controls="[]"
          :settings="mapSettings"
          :behaviors="['default', 'scrollZoom']"
          @map-was-initialized="onMapInit"

      >
        <ymap-marker
            :key="1"
            :marker-id="1"
            marker-type="placemark"
            :coords="coordsBal"
            :balloon="{ body: 'title' }"
        ></ymap-marker>
      </yandex-map>
    </div>
  </div>
</template>

<script>
import Validations from "~/components/mixins/validations.mixin"
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import BInput from "~/components/blocks/BInput";

export default {
  name: "BGeo",
  mixins: [Validations],
  components: {yandexMap, ymapMarker, BInput},
  validations: {
    result: {
      cityId: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(2)
      },
    },
  },
  data() {
    return {
      query: '',
      addressQuery: '',
      zoom: 10,
      coords: [55.7540471, 37.620405],
      coordsBal: [55.7540471, 37.620405],
      showMap: false,
      showAddress: false,
      mapSettings: {
        apiKey: process.env.YANDEX_MAP,
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
      },
      result: {}
    }
  },
  async mounted() {
    setTimeout(() => {
      if (this.checkCityObj) {
        this.query = this.obj?.city?.name;
        this.coords = [this.obj?.city?.latitude, this.obj?.city?.longitude];
        if (_.isEmpty(this.obj?.latitude) || _.isEmpty(this.obj?.longitude)) {
          this.coordsBal = this.coords;
        } else {
          this.coordsBal = [this.obj?.latitude, this.obj?.longitude];
        }
        this.showAddress = true;
      } else if (this.checkCity) {
        this.query = this.$auth.user?.city.name;
        this.coords = [this.$auth.user?.city?.latitude, this.$auth.user?.city?.longitude];
        if (_.isEmpty(this.$auth.user?.latitude) || _.isEmpty(this.$auth.user?.longitude)) {
          this.coordsBal = this.coords;
        } else {
          this.coordsBal = [this.$auth.user?.latitude, this.$auth.user?.longitude];
        }
        this.showAddress = true;
      } else {
        this.error = true;
        this.coords = [55.7540471, 37.620405];
        this.coordsBal = [55.7540471, 37.620405];
      }
    }, 1000);
  },
  props: {
    obj: {
      type: Object,
      default: {},
    },
  },
  computed: {
    ...mapGetters({
      cities: 'cities/citiesFull',
      addresses: 'cities/addresses',
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'cities/getItemsFull',
      getItemsAddress: 'cities/getItemsAddress',
      removeItemsAddress: 'cities/removeItemsAddresses',
      removeItemsFull: 'cities/removeItemsFull',
    }),
    onMapInit(event) {
      this.zoom = event.getZoom();
    },
    checkCityObj() {
      return this.obj?.city;
    },
    checkCity() {
      return this.$auth.user?.city;
    },
    onInputCity(event) {
      this.query = event;
    },
    onInputAddress(event) {
      this.addressQuery = event;
    },
    getCity(city) {
      this.query = city.name;
      this.result.city_id = city.id;
      this.coords = [city.latitude, city.longitude];
      this.coordsBal = [city.latitude, city.longitude];
      this.showAddress = true;
      this.removeItemsFull();
    },
    getAddress(address) {
      this.addressQuery = `${address.data.street} ${address.data.house}`;
      this.coords = [address.data.geo_lat, address.data.geo_lon];
      this.coordsBal = [address.data.geo_lat, address.data.geo_lon];
      this.showMap = true;
      this.result.address = address;
      this.removeItemsAddress();
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
    }, 500),
    debounceInputAddress: _.debounce(function (e) {
      if (this.addressQuery === '') {
        this.error = true;
        this.removeItemsAddress();
      } else {
        this.error = false;
        this.getItemsAddress({querySearch: this.query + ' ' + this.addressQuery}).then((res) => {
        }).catch((error) => {
          // console.log(error.response.data.errors);
          // this.$v.nameErrors = 'какой-то текст';
        });
      }
    }, 500)
  },

}
</script>
