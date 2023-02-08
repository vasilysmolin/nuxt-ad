<template>
  <section v-if="$device.isDesktopOrTablet" class="container mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
    <Breadcrumbs
        :baseName="`Все категории`"
        :basePath="`/`"
        :depth="1"
        :link="adWithCategory"
    />
    <article class="mt-[15px] grid grid-cols-[620px,_1fr] gap-[20px]">
      <section class="rounded-lg bg-white w-[620px]">
        <section class="w-full">
          <h1 v-if="isFlat(realty)" class="mt-3 px-2.5 font-bold leading-[27px] text-2xl">
            {{ generateTitle(realty) }} <span class="text-lg"> м<sup>2</sup></span></h1>

          <h1 v-else class="mt-3 px-2.5 font-bold leading-[27px] text-2xl">
            {{ realty.name }}</h1>

          <p class="mt-1.5 px-2.5 text-sm text-gray-500">{{ realty.full_address }}</p>

        </section>

        <section class="mt-5 w-full bg-blue-300 container container--fluid">
          <div class="row no-gutters align-center justify-center carousel-wrapper as-nav-for">
            <VueSlickCarousel
                ref="main"
                :asNavFor="$refs.preview"
                :focusOnSelect="true"
            >
              <!--              <div v-for="(photo, index) in realty.photos">-->
              <img v-for="(photo, index) in realty.photos" :src="photo" alt="" :key="index">
              <!--              </div>-->
            </VueSlickCarousel>
          </div>
          <div class="row no-gutters align-center justify-center carousel-wrapper as-nav-for">
            <VueSlickCarousel
                ref="preview"
                :asNavFor="$refs.main"
                :slidesToShow="4"
                :focusOnSelect="true"
                v-show="main"
            >
              <!--              <div >-->
              <img v-for="(photo, index) in realty.photos" :src="photo" alt="" :key="index">
              <!--              </div>-->
            </VueSlickCarousel>
          </div>
          <!--          </div>-->
          <!--          <div class="grid grid-cols-1 bg-white">-->
          <!--            <div class="flex justify-center items-center">-->
          <!--              <img class="cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--            </div>-->
          <!--            <div class="mt-2.5 pl-[20px] pr-[20px] flex justify-center items-center">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->
          <!--              <img class="mx-1 rounded w-[50px] h-[50px] cursor-pointer" src="https://storage.yandexcloud.net/backgrounds-images/images/realty_flats_index.jpg" alt="">-->

          <!--            </div>-->
          <!--          </div>-->
        </section>

      </section>

        <!--
      <h2 class="text-sm font-bold text-black">Описание</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600" v-html="realty.description"></p>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="isFilter(category)">
      <h2 class="text-sm font-bold text-black">Характеристики</h2>
      <table class="table-auto">
        <tbody v-for="(item, index) in getFilter(category)" :key="item.id">
        <tr v-if="isSelect(item) && getSelectParams(item, realty.parameters) !== null">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, realty.parameters) }}</td>
        </tr>
        <tr v-if="isRange(item) && getSelectParams(item, realty.parameters) !== null">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, realty.parameters) }}</td>
        </tr>
        </tbody>
      </table>
      <table class="table-auto">
        <tbody>
        <tr v-if="realty.ceiling_height">
          <td>Высота потолков</td>
          <td>{{ realty.ceiling_height }}</td>
        </tr>
        <tr v-if="realty.date_build">
          <td>Дата постройки</td>
          <td>{{ realty.date_build }}</td>
        </tr>
        <tr v-if="realty.cadastral_number">
          <td>Кадастровый номер</td>
          <td>{{ realty.cadastral_number }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="isFilter(category)">
      <h2 class="text-sm font-bold text-black">Удобства</h2>
      <table class="table-auto">
        <tbody v-for="(item, index) in getFilter(category)" :key="item.id">
        <tr v-if="isCheckbox(item)"
            v-for="(comfort, index) in item.parameters">
          <td>{{ comfort.value }}</td>
          <td v-if="getCheckboxParams(comfort, realty.parameters)">✅</td>
          <td v-else>❌</td>

        </tr>
        </tbody>
      </table>
    </section>

    <template v-if="realty !== null">
      <BYandexMap
          :obj="realty"
      />
    </template>

    <section v-if="checkPhotos(realty)" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Фотографии</h2>
      <section class="mt-4 grid grid-cols-2 gap-4 w-full">
        <div v-for="photo in realty.photos">
          <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
        </div>
      </section>
    </section>
-->

        <BContactC
            :name="getUserName(realty)"
            :phone="getUserPhone(realty)"
            :price="formatPrice(realty.price)"
            :price_per_square="formatPrice(realty.price_per_square)"
            :isNew="isNewBuilding(realty)"
            :agent="getAgent(realty)"
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

export default {
  name: "RealtyCart",
  layout: 'default-search',
  mixins: [CategoriesMixin],
  components: {BContactC, BYandexMap, VueSlickCarousel},
  async asyncData({store, route}) {
    await store.dispatch('filters/setSearchType', {parameter: 'realty'});
    await store.dispatch('realty/getItem', {
      id: route.params.id,
      querySearch: route.query?.querySearch,
      expand: 'profile.user,profile.person'
    });
    await store.dispatch('categoriesRealty/getItem', {id: store.state.realty.realty.category_id});
    return {
      realty: store.state.realty.realty,
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
      // realty: 'realty/realty',
      category: 'categoriesRealty/categoryRealties',
    }),
  },
  head() {
    let title = this.realty.title;
    if (this.isFlat(this.realty)) {
      const type = this.isBuy(this.realty) ? 'Продаётся' : 'Сдаётся';
      const entity = this.generateTitle(this.realty);
      const address = `по адресу ` + this.getAddress(this.realty);
      title = `${type} ${entity} ${address}`;
    }

    return {
      title: title,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },

}
</script>


<style scoped>
::v-deep .slick-slide {
  padding: 7px;
}

::v-deep .slick-slider {
  background: #fff;

}

::v-deep .slick-next {
  right: 40px;
}

::v-deep .slick-prev {
  left: 20px;
  z-index: 1;
}

::v-deep .slick-prev:before {
  font-size: 40px;
}

::v-deep .slick-next:before {
  font-size: 40px;
}
</style>
