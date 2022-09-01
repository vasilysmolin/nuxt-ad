<template>
  <div>
      <BInput
          :value="query"
          type="text"
          :error="cityErrors"
          :placeholder="$t('catalog.city')"
          v-on:input="debounceInput"
          @input="onInputCity"
      />
    <article class="relative mx-auto w-full sm:w-[27rem] bg-white z-50">
      <ul class="pt-1 px-3 w-full leading-8" v-if="cities.length > 0">
        <li @click="getCity(city)" style="list-style-type: none;" v-for="city in cities" :key="city.id">
          <p class="text-blue-700 hover:text-black">
            {{ city.name }}
          </p>
        </li>
      </ul>
    </article>

    <div v-if="showAddress" class="">
      <BInput
          :value="addressQuery"
          type="text"
          :error="addressErrors"
          :placeholder="$t('catalog.address')"
          v-on:input="debounceInputAddress"
          @input="onInputAddress"
      />
      <article class="relative mx-auto w-full sm:w-[27rem] bg-white z-50">
        <ul class="pt-1 px-3 w-full leading-8" v-if="addresses.length > 0">
          <li @click="getAddress(address)" style="list-style-type: none;" v-for="address in addresses">
            <p class="text-blue-700 hover:text-black">
              {{ address.value }}
            </p>
          </li>
        </ul>
      </article>
    </div>
    <div v-if="showMap" class="form-floating mb-6 w-full sm:w-[27rem]">
      <yandex-map
          ref="map"
          :coords="coords"
          :zoom="zoom"
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
            :coords="result.coordsBal"
            :balloon="{ body: 'title' }"
        ></ymap-marker>
      </yandex-map>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import {yandexMap, ymapMarker} from "vue-yandex-maps";
import BInput from "~/components/blocks/BInput";

export default {
  name: "BGeo",
  components: {yandexMap, ymapMarker, BInput},
  data() {
    return {
      query: '',
      addressQuery: '',
      zoom: 16,
      coords: [55.7540471, 37.620405],
      showMap: false,
      showAddress: false,
      mapSettings: {
        apiKey: process.env.YANDEX_MAP,
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
      },
      result: {
        address: null,
        city_id: null,
        coordsBal: [55.7540471, 37.620405],
      }
    }
  },
  async mounted() {
    setTimeout(() => {
      if (this.checkCityObj) {
        this.fullData(this.obj?.city);
        if (!_.isEmpty(this.obj.street) && !_.isEmpty(this.obj.house)) {
          this.addressQuery = `${this.obj.street}, ${this.obj.house}`
          this.showMap = true;
        }
      } else if (this.checkCity) {
        this.fullData(this.$auth.user?.city);
      }
    }, 1000);
  },
  props: {
    obj: {
      type: Object,
      default: {},
    },
    cityErrors: {
      type: String,
      default: null,
    },
    addressErrors: {
      type: String,
      default: null,
    }
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
      if (_.isEmpty(this.query)) {
        this.$emit('cityId', null);
      }
    },
    onInputAddress(event) {
      this.addressQuery = event;
      if (_.isEmpty(this.addressQuery)) {
        this.$emit('address', null);
      }
    },
    fullData(obj) {
      this.query = obj.name;
      this.coords = [obj.latitude, obj.longitude];
      if (_.isEmpty(obj.latitude) || _.isEmpty(obj.longitude)) {
        this.result.coordsBal = this.coords;
      } else {
        this.result.coordsBal = [obj.latitude, obj.longitude];
      }
      this.showAddress = true;
    },
    getCity(city) {
      this.query = city.name;
      this.result.city_id = city.id;
      this.coords = [city.latitude, city.longitude];
      this.result.coordsBal = [city.latitude, city.longitude];
      this.showAddress = true;
      this.addressQuery = '';
      this.result.address = null;
      this.showMap = false;
      this.$emit('cityId', this.result.city_id);
      this.removeItemsFull();
    },
    getAddress(address) {
      this.addressQuery = `${address.data.street_with_type} ${address.data.house_type} ${address.data.house}`;
      this.coords = [address.data.geo_lat, address.data.geo_lon];
      this.result.coordsBal = [address.data.geo_lat, address.data.geo_lon];
      this.showMap = true;
      this.result.address = address;
      this.$emit('address', this.result.address);
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
