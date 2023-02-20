<template>
  <section class="flex flex-col w-full" v-if="checkCoords">
    <yandex-map
        v-if="showMap"
        ref="map"
        :coords="coordsBal"
        :zoom="zoom"
        style="width: 100%; height: 350px;"
        :controls="[]"
        :behaviors="['default', 'scrollZoom']"

      >
        <ymap-marker
            :key="1"
            :marker-id="1"
            marker-type="placemark"
            :coords="coordsBal"
            :balloon="{ body: 'title' }"
        ></ymap-marker>
      </yandex-map>
  </section>
</template>

<script>
import {yandexMap, ymapMarker} from 'vue-yandex-maps';
import * as _ from "lodash";

export default {
  name: "BYandexMap",
  data() {
    return {
      zoom: 16,
      coords: [55.7540471, 37.620405],
      coordsBal: [55.7540471, 37.620405],
      showMap: false,
      checkCoords: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showMap = true;
      this.checkCoords = !_.isEmpty(this.obj?.latitude);
      if (this.checkCity) {
        this.coords = [this.obj?.city?.latitude, this.obj?.city?.longitude];
        if (_.isEmpty(this.obj?.latitude) || _.isEmpty(this.obj?.longitude)) {
          this.coordsBal = this.coords;
        } else {
          this.coordsBal = [this.obj?.latitude, this.obj?.longitude];
        }
      }
    }, 1500);
  },
  components: {yandexMap, ymapMarker},
  props: {
    obj: Object,
  },
  computed: {},
  methods: {
    checkCity() {
      return this.obj?.city_id;
    },
  },

}
</script>
