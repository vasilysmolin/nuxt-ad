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
      <p class="first-letter:uppercase text-slate-400">{{ getAddress(ad)}}</p>
      <p class="mt-2 text-xl sm:text-2xl font-bold">{{ ad.price }}
        <span class="pl-2 text-sm">руб.</span>
      </p>
    </section>

    <BContactC
        :name="getUserName(ad)"
        :phone="getUserPhone(ad)"
    />

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Описание</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600" v-html="ad.description"></p>
    </section>

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white" v-if="isFilter(category)">
      <h2 class="text-sm font-bold text-black">Характеристики</h2>
      <table class="table-auto">
        <tbody v-for="(item, index) in getFilter(category)" :key="item.id">
        <tr v-if="isSelect(item)">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, ad.parameters) }}</td>
        </tr>
        <tr v-if="isRange(item)">
          <td>{{ item.name }}</td>
          <td>{{ getSelectParams(item, ad.parameters) }}</td>
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
          <td>{{ getCheckboxParams(comfort, ad.parameters) }}</td>
        </tr>
        </tbody>
      </table>
    </section>

    <template v-if="ad !== null">
      <BYandexMap
          :obj="ad"
      />
    </template>

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
import {mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categories.mixin';

import BContactC from "~/components/blocks/BContactC";
import BYandexMap from "~/components/blocks/BYandexMap";

export default {
  name: "CObject",
  layout: 'default-search',
  mixins: [CategoriesMixin],
  components: {BContactC, BYandexMap},
  async asyncData({store, route}) {
    await store.dispatch('filters/setSearchType', {parameter: 'catalog'});
    await store.dispatch('ads/getItem', {
      id: route.params.id,
      querySearch: route.query?.querySearch,
      expand: 'profile.user,profile.person'
    });
    await store.dispatch('categoriesAd/getItem', {id: store.state.ads.ad.category_id });
    return {
      ad: store.state.ads.ad,
    }
  },
  async mounted() {
  },
  methods: {
    getUserName(catalog) {
      if(catalog?.profile?.isPerson === true) {
        return catalog?.profile?.person?.name;
      }
      return catalog?.profile?.user?.name;
    },
    getAddress(ad) {
      let arrayAddress = [];
      if (ad.street && ad.house && ad?.house !== 'null') {
        arrayAddress = [ad.street, ad.house];
      } else if (ad.house) {
        arrayAddress = [ad.street];
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
    let title = this.ad?.title;
    if (this.isFlat(this.ad)) {
      const type = this.isBuy(this.ad) ? 'Продаётся' : 'Сдаётся';
      const entity = this.generateTitle(this.ad);
      const address = `по адресу ` + this.getAddress(this.ad);
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
