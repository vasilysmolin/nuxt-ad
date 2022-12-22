<template>
  <article class="container flex flex-col items-center mt-[80px] pb-[100px]">
    <Breadcrumbs
        :baseName="`Все категории`"
        :basePath="`/`"
        :depth="1"
        :link="adWithCategory"
    />

    <section class="flex flex-col p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 v-if="isFlat(realty)" class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">
        {{ generateTitle(realty) }}</h1>
      <h1 v-else class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-xl">
        {{ realty.name }}</h1>
      <p class="first-letter:uppercase text-slate-400">{{ getAddress(realty) }}</p>
      <p class="mt-2 text-xl sm:text-2xl font-bold">{{ realty.price }}
        <span class="pl-2 text-sm">руб.</span>
      </p>
    </section>

    <BContactC
        :name="getUserName(realty)"
        :phone="getUserPhone(realty)"
        :address="null"
    />

    <section class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-sm font-bold text-black">Описание</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600" v-html="realty.description"></p>
    </section>

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
  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';

import BContactC from "~/components/blocks/BContactC";
import BYandexMap from "~/components/blocks/BYandexMap";

export default {
  name: "RealtyCart",
  layout: 'default-search',
  mixins: [CategoriesMixin],
  components: {BContactC, BYandexMap},
  async asyncData({store, route}) {
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
  async mounted() {
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
      realty: 'realty/realty',
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
