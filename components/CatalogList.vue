<template>
  <section>
    <BCategoriesNav
        :category="category"
    />
    <div v-if="$device.isDesktop" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
      <!-- Yandex.RTB R-A-1779902-1 -->
      <div id="yandex_rtb_R-A-1779902-1"></div>
      <script>window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
          renderTo: 'yandex_rtb_R-A-1779902-1',
          blockId: 'R-A-1779902-1'
        })
      })</script>
      <!-- Yandex.RTB R-A-1779902-1 -->
    <div class="mx-auto flex flex-col w-[500px]">
      <h1 class="text-xl text-center font-black leading-none">
        {{ getH1() }}
      </h1>
      <Breadcrumbs
          :baseName="`Все категории`"
          :basePath="`/`"
          :depth="1"
          :link="category"
      />
      <article v-for="ad in ads" :key="ad.id" class="group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
        <NuxtLink :to="getUrl(ad)">
          <section class="grid grid-cols-[25%,_1fr]">

            <section>
              <img class="w-full rounded-lg" :src="getPhoto(ad)" :alt="ad.name">
            </section>

            <section class="flex flex-col px-4">
              <h2 class="mt-3 first-letter:uppercase lowercase font-medium leading-[22px] text-lg group-hover:text-blue-600">{{ ad.name }}</h2>
              <h3 class="mt-1.5 font-medium"><span class="pr-1 text-xs">от</span>{{ formatPrice(ad.price) }}</h3>
              <p class="mt-1.5  first-letter:uppercase lowercase text-sm text-gray-500">{{ getAddress(ad)}}</p>

              <table class="table-auto mb-2 mt-2">
                <tbody v-for="(item, index) in getParamsSelect(ad)" :key="item.id">
                <tr v-if="index <= 1">
                  <td>{{ item.filter.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
                </tbody>
                <tbody v-for="(item, index) in getParamsRange(ad)" :key="item.id">
                <tr v-if="index <= 1">
                  <td>{{ item.filter.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
                </tbody>
              </table>

            </section>

          </section>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({
        skip: ads.length,
        state: 'active',
        expand: 'profile.user',
        alias: alias,
        from: 'catalog',
        querySearch: querySearch
      })" type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>
    </div>
    <section v-if="$device.isMobile" class="container flex flex-col items-center mt-[80px] pb-[100px]">
    <section  class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="ad in ads" :key="ad.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="getUrl(ad)">
          <section class="grid grid-cols-[25%,_1fr]">
            <section>
              <img class="w-full rounded-lg" :src="getPhoto(ad)" :alt="ad.name">
            </section>
            <section class="flex flex-col justify-between pl-4">
              <h2 class="first-letter:uppercase font-bold sm:font-black text-[0.75rem] leading-tight sm:leading-5 sm:text-lg">{{ ad.name }}</h2>
              <p class="first-letter:uppercase text-slate-400">{{ getAddress(ad)}}</p>
              <table class="table-auto mb-2 mt-2">
                <tbody v-for="(item, index) in getParamsSelect(ad)" :key="item.id">
                <tr v-if="index <= 1">
                  <td>{{ item.filter.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
                </tbody>
                <tbody v-for="(item, index) in getParamsRange(ad)" :key="item.id">
                <tr v-if="index <= 1">
                  <td>{{ item.filter.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
                </tbody>
              </table>
              <h3 class="mt-1 text-sm sm:text-lg"><span class=" pr-1 text-xs">от</span>{{ formatPrice(ad.price) }}
                <!--                <span class="pl-1 text-xs">руб.</span>-->
              </h3>
            </section>
          </section>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({
          skip: ads.length,
          state: 'active',
          expand: 'profile.user',
          alias: alias,
          from: 'catalog',
          querySearch: querySearch
        })" type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </section>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';
import Breadcrumbs from "./Breadcrumbs";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import BCategoriesNav from "~/components/blocks/BCategoriesNav";
import BAmount from "~/components/blocks/BAmount";

export default {
  name: "CatalogList",
  components: {Breadcrumbs, BCategoriesNav, BAmount},
  mixins: [CategoriesMixin],
  props: {
    type: String,
  },
  data() {
    return {
      alias: null,
      querySearch: null,
    }
  },
  async mounted() {
    const sub = this.$route.path.split('/').pop();
    this.querySearch = this.$route.query?.querySearch;
    this.setItems({
      type: 'ads'
    });
    if(this.$route.path !== '/feed') {
      this.alias = sub !== 'feed' ? sub : null;
      await this.getItem({id: this.alias }).then(() => {
        this.setItems({
          filter: this.categoryFilter,
          type: 'ads'
        });
      });
    } else {
      await this.removeItem();
      await this.getItemsCategories({}).then(() => {
        this.setItemCategory({ cat: {
            name: 'Лента объявлений',
            alias: 'root',
            categories: this.categories
          }
        });
      });
    }
    if (_.isEmpty(this.alias) || this.alias !== this.categoryAlias) {
      await this.setAdCategory({ categoryAlias: this.alias});
      await this.getItems({
        state: 'active',
        expand: 'profile.user',
        alias: this.alias,
        from: 'catalog',
        querySearch: this.$route.query?.querySearch
      });
    }
  },
  computed: {
    ...mapGetters({
      ads: 'ads/ads',
      categories: 'categoriesAd/categoriesAds',
      categoryFilter: 'categoriesAd/categoryAds',
      amount: 'ads/amount',
      categoryAlias: 'ads/categoryAlias'
    }),
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesAd/categoryAds']);
      },
      set(category) {
        return category
      }
    },
    checkAmount(){
      return this.ads.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'ads/getItems',
      setAdCategory: 'ads/setAdCategory',
      setItems: 'filters/setItems',
      addItems: 'ads/addItems',
      getItem: 'categoriesAd/getItem',
      setItemCategory: 'categoriesAd/setItem',
      getItemsCategories: 'categoriesAd/getItems',
      removeItem: 'categoriesAd/removeItem',
    }),
    getUrl(ad) {
      return `/feed/alias/${ad.alias}`
    },
    getUsername(catalog) {
      return catalog?.profile?.user?.name
    },
    getPhoto(ad) {
      return ad.photo ?? 'https://storage.yandexcloud.net/tapigo-static/empty.png';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price);
    },
    getAddress(ad) {
      let arrayAddress = [];
      if(ad.street && ad.house) {
        arrayAddress = [ad.street, ad.house];
      } else if(ad.house) {
        arrayAddress = [ad.street];
      } else {
        arrayAddress = [];
      }

      return _.join(arrayAddress);
    },
    getH1(){
      return this.category.name;
      //return this.category.name ?? 'Поиск по: ' + this.querySearch;
    },
    linkHub() {
      if(this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/catalog/new`;
      } else {
        document.location.href = `${process.env.AUTH_URL}?from=${process.env.HUB_URL}/catalog/new`;
      }
    },
  },

}
</script>
