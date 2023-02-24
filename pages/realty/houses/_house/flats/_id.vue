<template>
  <section v-if="$device.isDesktopOrTablet" class="container mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
    <nav class="flex justify-start items-center mb-1.5">
      <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
        <li class="leading-6">
          <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Недвижимость</NuxtLink>
        </li>
        <li><span class="px-2 text-gray-500">/</span></li>
        <li class="leading-6">
          <NuxtLink :to="`/houses`" class="text-gray-500 hover:text-black">Новостройки</NuxtLink>
        </li>
        <li><span class="px-2 text-gray-500">/</span></li>
        <li class="leading-6">
          <NuxtLink :to="`/houses/${realty.house.alias}`" class="text-gray-500 hover:text-black">{{
              realty.house.name
            }}
          </NuxtLink>
        </li>
        <li><span class="px-2 text-gray-500">/</span></li>
        <li class="leading-6">
          <NuxtLink :to="`/houses/${realty.house.alias}/flats`" class="text-gray-500 hover:text-black">Квартиры
          </NuxtLink>
        </li>
        <li><span class="px-2 text-gray-500">/</span></li>
        <li class="leading-6">
          <p class="text-black">{{ generateTitle(realty) }} <span
              class=""> м<sup>2</sup></span></p>
        </li>
      </ul>
    </nav>
    <article class="mt-[15px] grid grid-cols-[620px,_1fr] gap-[20px]">
      <section class="rounded-lg bg-white w-[620px]">
        <section class="w-full">
          <h1 class="mt-3 px-2.5 font-bold leading-[27px] text-2xl">
            {{ generateTitle(realty) }} <span class="text-lg"> м<sup>2</sup></span></h1>
          <p class="mt-1.5 px-2.5 text-sm text-gray-500">{{ realty.full_address }}</p>
        </section>

        <section class="mt-5" v-if="realty.photos.length > 0">
          <div class="">
            <VueSlickCarousel
                ref="main"
                :asNavFor="$refs.preview"
                :focusOnSelect="true"
                :adaptiveHeight="true"
            >
              <img v-for="(photo, index) in realty.photos" :src="photo" alt="" :key="index">

            </VueSlickCarousel>
          </div>
          <div class="cursor-pointer">
            <VueSlickCarousel
                ref="preview"
                :asNavFor="$refs.main"
                :slidesToShow="8"
                :focusOnSelect="true"
                :arrows="false"
                :centerMode="true"
                v-show="main"

            >
              <img class="rounded" v-for="(photo, index) in realty.photos" :src="photo" alt="" :key="index">
            </VueSlickCarousel>
          </div>
        </section>

        <section class="mt-5 mx-auto w-[300px]">
          <section class="grid grid-cols-3 gap-6">
            <div class="text-center">
              <p class="text-sm text-gray-500">Общая</p>
              <p class="text-xl font-bold">{{ getArea(realty) }}<span> м<sup><small>2</small></sup></span></p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">Жилая</p>
              <p class="text-xl font-bold">{{ getAreaLeave(realty) }}<span> м<sup><small>2</small></sup></span></p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">Кухня</p>
              <p class="text-xl font-bold">{{ getAreaKitchen(realty) }}<span> м<sup><small>2</small></sup></span></p>
            </div>
          </section>
          <hr class="mt-5 bg-gray-300 w-full h-[1px]">

          <section class="mt-5 grid grid-cols-2 gap-4">
            <ul class="text-gray-500 leading-9">
              <li>Кол-во комнат</li>
              <li>Этаж</li>
              <li>Этажей в доме</li>
              <li>{{ $t('house.ceiling_height') }}</li>
              <li>Тип дома</li>
              <li>Дом элитный</li>
              <li>Отделка</li>
              <li>Тип комнат</li>
              <li>Вид из окон</li>
              <li>Срок сдачи</li>
            </ul>
            <ul class="text-black font-medium leading-9">
              <li>{{ getRooms(realty) }}</li>
              <li>{{ getFloor(realty) }}</li>
              <li>{{ getAllFloorNew(realty) }}</li>
              <li>{{ realty.house.ceiling_height }}</li>
              <li>{{ getType(realty) }}</li>
              <li>{{ getElite(realty) }}</li>
              <li>{{ getFinishingNew(realty) }}</li>
              <li>{{ getTypeRooms(realty) }}</li>
              <li>{{ getWindow(realty) }}</li>
              <li>{{ getDeadlineNew(realty) }} {{ getDateBuildNew(realty) }} г.</li>
            </ul>
          </section>
          <hr class="mt-5 bg-gray-300 w-full h-[1px]">
        </section>

        <section class="mt-5 mx-auto w-[90%]">
          <p class="leading-6 text-gray-700" v-html="realty.description"></p>
        </section>

        <section class="mt-5 mx-auto w-[300px]">
          <hr class="mt-5 bg-gray-300 w-full h-[1px]">
          <section class="mt-5 grid grid-cols-2 gap-4">
            <ul class="text-gray-500 leading-9" v-for="(item, index) in getFilter(category)" v-if="isCheckbox(item)"
                :key="item.id">
              <li v-for="(comfort, index) in item.parameters">{{ comfort.value }}</li>
            </ul>
            <ul class="text-black font-medium leading-9" v-for="(item, index) in getFilter(category)"
                v-if="isCheckbox(item)" :key="item.id">
              <li v-if="getCheckboxParams(comfort, realty.parameters)" v-for="(comfort, index) in item.parameters">да
              </li>
              <li v-else>&mdash;</li>
            </ul>
          </section>
          <hr class="mt-5 bg-gray-300 w-full h-[1px]">
        </section>

        <p class="mt-5 mx-auto w-[90%] leading-5 text-sm text-gray-500">{{ getAction(realty) }}
          {{ generateTitle(realty) }} м<sup><small>2</small></sup> по адресу {{ realty.full_address }}</p>
        <section class="mt-5 w-full">
          <template v-if="realty !== null">
            <BYandexMap
                :obj="realty.house"
            />
          </template>
        </section>
        <p class="my-5 text-center text-sm text-gray-500">Размещено {{ format(realty.created_at) }}</p>
      </section>

      <BContactC
          :name="getUserName(realty)"
          :phone="getUserPhone(realty)"
          :price="formatPrice(realty.price)"
          :price_per_square="formatPrice(realty.price_per_square)"
          :isNew="isNewBuilding(realty)"
          :isBuy="isBuy(realty)"
          :agent="getAgent(realty)"
          :house="realty.house"
          :address="null"
      />

    </article>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';

import BContactC from "~/components/blocks/BContactC";
import BYandexMap from "~/components/blocks/BYandexMap";

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import {dateFormat} from "~/helper/dataFormat";

export default {
  name: "RealtyCart",
  layout: 'alias-realty',
  mixins: [CategoriesMixin],
  components: {BContactC, BYandexMap, VueSlickCarousel},
  async asyncData({store, route}) {
    await store.dispatch('filters/setSearchType', {parameter: 'realty'});
    await store.dispatch('newBuildings/getItem', {
      id: route.params.id,
      querySearch: route.query?.querySearch,
      expand: 'profile.user,profile.person'
    });
    if (Object.keys(store.getters['finishing/finishing']).length === 0) {
      await store.dispatch('finishing/getItems');
    }
    if (Object.keys(store.getters['typeHouse/typeHouse']).length === 0) {
      await store.dispatch('typeHouse/getItems');
    }
    if (Object.keys(store.getters['deadLine/deadLine']).length === 0) {
      await store.dispatch('deadLine/getItems');
    }
    if (Object.keys(store.getters['elite/elite']).length === 0) {
      await store.dispatch('elite/getItems');
    }
    if (Object.keys(store.getters['parking/parking']).length === 0) {
      await store.dispatch('parking/getItems');
    }
    await store.dispatch('categoriesRealty/getItem', {id: store.state.newBuildings.realty.category_id});
    return {
      realty: store.state.newBuildings.realty,
    }
  },
  data() {
    return {
      main: null,
      preview: null,
    }
  },
  async mounted() {
    this.main = this.$refs.main;
    this.preview = this.$refs.preview;
  },
  methods: {
    getUserName(catalog) {
      if (catalog?.profile?.isPerson === true) {
        return catalog?.profile?.person?.name;
      }
      return catalog?.profile?.user?.name;
    },
    getAddress(realty) {
      let arrayAddress = [];
      if (realty.street && realty.house) {
        arrayAddress = [realty.street, realty.house];
      } else if (realty.house) {
        arrayAddress = [realty.street];
      } else {
        arrayAddress = [];
      }

      return _.join(arrayAddress);
    },
    getUserPhone(catalog) {
      return catalog?.profile?.user?.phone;
    },
    checkPhotos(catalog) {
      return !_.isEmpty(catalog.photos);
    },
    showModalAuth() {
      this.$modal.show('AuthModal');
    },
    format(date) {
      return dateFormat(date);
    }
  },
  computed: {
    adWithCategory() {
      return {
        'name': this.realty.name,
        'alias': this.realty.alias,
        'categories_parent': _.cloneDeep(this.category),
      }
    },
    ...mapGetters({
      category: 'categoriesRealty/categoryRealties',
      finishing: 'finishing/finishing',
      typeHouse: 'typeHouse/typeHouse',
      deadline: 'deadLine/deadLine',
      elite: 'elite/elite',
      parking: 'parking/parking',
    }),
  },
  head() {
    let title = '';
    const type = 'Продаётся';
    const entity = this.generateTitle(this.realty);
    const address = `по адресу ` + this.realty?.full_address;
    title = `${type} ${entity} ${address}`;
    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content: 'Объект'}
      ]
    }
  },

}
</script>


<style scoped>
::v-deep .slick-slider {
}

::v-deep .slick-slide {
  padding: 3px;
  max-height: 400px;
}

::v-deep .slick-next {
  right: 20px;
}

::v-deep .slick-list {
  margin-top: 2px;
}

::v-deep .slick-prev {
  left: 10px;
  z-index: 1;
}

::v-deep .slick-prev:before {
  font-size: 30px;
}

::v-deep .slick-next:before {
  font-size: 30px;
}
</style>
