<template>
  <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="city_id">
    <h2 class="text-sm font-bold text-black mb-3">Карта</h2>
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

export default {
  name: "BYandexMap",
  data() {
    return {
      zoom: 16,
    }
  },
  mounted() {
  },
  components: {yandexMap, ymapMarker},
  props: {
    city_id: Number,
    showMap: Boolean,
    coords: Array,
    coordsBal: Array,
  },
  computed: {},
  methods: {},

}
</script>
