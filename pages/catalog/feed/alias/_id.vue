<template>
  <article class="container flex flex-col items-center mt-[80px] pb-[100px]">
    <Breadcrumbs
        :baseName="`Все категории`"
        :basePath="`/`"
        :depth="1"
        :link="adWithCategory"
    />

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">{{ ad.name }}</h1>
      <p class="mt-2 text-xl sm:text-2xl font-bold">{{ ad.price }}
        <span class="pl-2 text-sm">руб.</span>
      </p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="font-bold text-[0.9375rem] leading-5 sm:text-lg">
        <span class="pr-2 font-bold text-sm text-gray-500">Контакт:</span>{{ getUsername(ad)}}
      </p>

      <p v-if="$auth.loggedIn" class="mt-1 font-bold text-[0.9375rem] leading-5 sm:text-lg">
        <span  class="pr-2 font-bold text-sm text-gray-500">
          Телефон:</span>{{ getUserPhone(ad)}}
      </p>
      <div v-else class=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
      <button @click.prevent="showModalAuth">Посмотреть телефон</button>
      </div>
    </section>
    <AuthModal/>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Описание</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ ad.description }}</p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="isFilter(category)">
      <h2 class="text-sm font-bold text-black">Характеристики</h2>
      <table class="table-auto">
        <tbody v-for="(item, index) in getFilter(category)" :key="item.id">
        <tr v-if="isSelect(item)">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, ad.ad_parameters) }}</td>
        </tr>
        <tr v-if="isRange(item)">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, ad.ad_parameters) }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="isFilter(category)">
      <h2 class="text-sm font-bold text-black">Удобства</h2>
      <table class="table-auto">
        <tbody v-for="(item, index) in getFilter(category)" :key="item.id">
        <tr v-if="isCheckbox(item)" v-for="(comfort, index) in item.parameters">
            <td>{{ comfort.value }}</td>
            <td>{{ getCheckboxParams(comfort, ad.ad_parameters) }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="ad.city_id">
      <h2 class="text-sm font-bold text-black mb-3">Карта</h2>
        <yandex-map
            v-if="showMap"
            ref="map"
            :coords="coords"
            zoom="10"
            style="width: 100%; height: 350px;"
            :controls="[]"
            :settings="mapSettings"
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

    <section v-if="checkPhotos(ad)" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Фотографии</h2>
      <section class="mt-4 grid grid-cols-2 gap-4 w-full">
      <div v-for="photo in ad.photos">
        <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
      </div>
      </section>
    </section>
  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapActions, mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import AuthModal from "../../../../components/AuthModal";

export default {
  name: "CObject",
  layout: 'default',
  mixins: [CategoriesMixin],
  components: {yandexMap, ymapMarker, AuthModal},
  async asyncData({store, route}) {
    await store.dispatch('ads/getItem', { id: route.params.id, expand: 'profile.user,profile.person'});
    await store.dispatch('categoriesAd/getItem', {id: store.state.ads.ad.category_id });
    return {
      coords: [55.7540471, 37.620405],
      coordsBal: [55.7540471, 37.620405],
      showMap: false,
      ad: store.state.ads.ad,
      mapSettings: {
        apiKey: process.env.YANDEX_MAP,
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1',
      },
    }
  },
  async mounted() {
    this.showMap = true;
    if(this.checkCity) {
      this.query = this.ad?.city?.name;
      this.coords = [this.ad?.city?.latitude, this.ad?.city?.longitude];
      this.coordsBal = [this.ad?.latitude, this.ad?.longitude];
    }
  },
  methods: {
    getUsername(catalog) {
      if(catalog?.profile?.isPerson === true) {
        return catalog?.profile?.person?.name;
      }
      return catalog?.profile?.user?.name;
    },
    checkCity(){
      return this.user?.city;
    },
    getUserPhone(catalog) {
      return catalog?.profile?.user?.phone;
    },
    checkPhotos(catalog) {
      return !_.isEmpty(catalog.photos);
    },
    showModalAuth() {
      this.$modal.show('AuthModal');
    }
  },
  computed: {
    adWithCategory() {
      return {
          'name' : this.ad.name,
          'alias' : this.ad.alias,
          'categories_parent': _.cloneDeep(this.category),
      }
    },
    ...mapGetters({
      ads: 'ads/ads',
      category: 'categoriesAd/categoryAds',
    }),
  },
  head() {
    const title = `${this.ad.title} | Бесплатно создавайте объявления без ограничений на Tapigo.ru | Каталог`;
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },

}
</script>
