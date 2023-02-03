<template>
  <section>
    <BCategoriesNav
        :category="category"
    />
    <div v-if="$device.isDesktopOrTablet" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
      <div class="mx-auto flex flex-col w-full">
        <h1 class="text-2xl font-black leading-none">
          {{ getH1() }}
        </h1>
        <Breadcrumbs
            :baseName="`Все категории`"
            :basePath="`/`"
            :depth="1"
            :link="category"
        />
        <template v-for="(realty, ind) in realties">
          <article class="p-1 group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
            <NuxtLink :to="getUrl(realty)">
              <section class="grid grid-cols-[250px,450px,_1fr]">

                <section>
                  <img class="w-full rounded-lg bg-cover" :src="getPhoto(realty)" :alt="realty.name">
                </section>

                <section class="flex flex-col pl-5 pr-10">
                  <h2 v-if="isFlat(realty)"
                      class="mt-3 font-bold leading-[27px] text-2xl group-hover:text-blue-600">
                    {{ generateTitle(realty) }}<span class="text-lg"> м<sup>2</sup></span></h2>
                  <h2 v-else
                      class="mt-3 font-bold leading-[27px] text-2xl group-hover:text-blue-600">
                    {{ realty.name }}</h2>

                  <p class="mt-2.5 text-sm text-gray-500">{{ realty.full_address }}</p>

                  <h3 class="mt-5 font-bold text-2xl">{{ formatPrice(realty.price) }}</h3>

                  <h3 v-if="isNewBuilding(realty)" class="mt-1 text-sm text-gray-500">Застройщик ЗАПРАВКИН</h3>

                </section>

                <section v-if="isNewBuilding(realty)" class="grid grid-cols-2 gap-4 items-center text-sm">
                  <ul class="text-gray-500 leading-9">
                    <li>Стоимость, м<sup><small>2</small></sup></li>
                    <li>Этаж</li>
                    <li>Тип дома</li>
                    <li>Тип комнат</li>
                    <li class="text-black font-bold">Срок сдачи</li>
                  </ul>
                  <ul class="text-gray-500 leading-9">
                    <li v-if="isNewBuilding(realty)" class="mt-1 text-gray-500">{{ formatPrice(realty.price_per_square) }}</li>
                    <li>{{ getFloor(realty) }}</li>
                    <li>{{ getHouseType(realty) }}</li>
                    <li>{{ getTypeRooms(realty) }}</li>
                    <li class="text-black font-bold">{{ getDateBuild(realty) }} год</li>
                  </ul>
                </section>

                <section v-else class="grid grid-cols-2 gap-4 items-center text-sm">
                  <ul class="text-gray-500 leading-9">
                      <li v-for="(item, index) in getParamsSelect(realty)" :key="item.id">
                        <template v-if="index <= 2">{{ item.filter.name }}</template>
                      </li>
                      <li v-for="(item, index) in getParamsRange(realty)" :key="item.id">
                        <template v-if="index <= 2">{{ item.filter.name }}</template>
                      </li>
                  </ul>
                  <ul class="text-gray-500 leading-9">
                      <li v-for="(item, index) in getParamsSelect(realty)" :key="item.id">
                        <template v-if="index <= 2">{{ item.value }}</template>
                      </li>
                      <li v-for="(item, index) in getParamsRange(realty)" :key="item.id">
                        <template v-if="index <= 2">{{ item.value }}</template>
                      </li>
                  </ul>
                </section>

              </section>
            </NuxtLink>
          </article>
          <div class="mt-5" v-if="everySix(ind + 1)">
            <div v-bind:id="`yandex_rtb_R-A-1779902-1-${ind+1}`"></div>
          </div>
        </template>

        <button v-if="checkAmount" @click="addItems({
        skip: realties.length,
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
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <article v-for="realty in realties" :key="realty.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
          <NuxtLink :to="getUrl(realty)">
            <section class="grid grid-cols-[25%,_1fr]">
              <section>
                <img class="w-full rounded-lg" :src="getPhoto(realty)" :alt="realty.name">
              </section>
              <section class="flex flex-col justify-between pl-4">
                <h2 v-if="isFlat(realty)"
                    class="first-letter:uppercase font-bold sm:font-black text-[0.75rem] leading-tight sm:leading-5 sm:text-lg">
                  {{ generateTitle(realty) }}</h2>
                <h2 v-else
                    class="first-letter:uppercase font-bold sm:font-black text-[0.75rem] leading-tight sm:leading-5 sm:text-lg">
                  {{ realty.name }}</h2>
                <p class="first-letter:uppercase text-slate-400">{{ realty.full_address }}</p>
                <div v-if="isFlat(realty)" class="table-auto mb-2 mt-2">
                  <p class="first-letter:uppercase">{{ getSeller(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getRooms(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getFloor(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getHouseType(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getTypeRooms(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getIsNew(realty) }}</p>
                  <p class="first-letter:uppercase">{{ getDateBuild(realty) }}</p>
                </div>
                <h3 class="mt-1 text-sm sm:text-lg"><span class=" pr-1 text-xs">от</span>{{ formatPrice(realty.price) }}
                </h3>
                <h3 v-if="isNewBuilding(realty)" class="mt-1 text-sm sm:text-lg">{{
                    formatPrice(realty.price_per_square)
                  }} <span
                      class=" pr-1 text-xs">м.кв</span>
                </h3>
              </section>
            </section>
          </NuxtLink>
        </article>
        <button v-if="checkAmount" @click="addItems({
          skip: realties.length,
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
import {mapActions, mapGetters} from 'vuex';
import Breadcrumbs from "./Breadcrumbs";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import BCategoriesNav from "~/components/blocks/BCategoriesNav";
import BAmount from "~/components/blocks/BAmount";

export default {
  name: "RealtyList",
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
    await this.setSearchType({parameter: 'realty'});
    const sub = this.$route.path.split('/').pop();
    this.querySearch = this.$route.query?.querySearch;
    this.setItems({
      type: 'realties'
    });
    if (this.$route.path !== '/feed') {
      this.alias = sub !== 'feed' ? sub : null;
      await this.getItem({id: this.alias}).then(() => {
        this.setItems({
          filter: this.categoryFilter,
          type: 'realties'
        });
      });
    } else {
      await this.removeItem();
      await this.getItemsCategories({}).then(() => {
        this.setItemCategory({
          cat: {
            name: 'Лента объявлений',
            alias: 'root',
            categories: this.categories
          }
        });
      });
    }
    if (_.isEmpty(this.alias) || this.alias !== this.categoryAlias) {
      await this.setAdCategory({categoryAlias: this.alias});
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
      realties: 'realty/realties',
      categories: 'categoriesRealty/categoriesRealties',
      categoryFilter: 'categoriesRealty/categoryRealties',
      amount: 'realty/amount',
      categoryAlias: 'realty/categoryAlias'
    }),
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesRealty/categoryRealties']);
      },
      set(category) {
        return category
      }
    },
    checkAmount() {
      return this.realties.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'realty/getItems',
      setAdCategory: 'realty/setrealtyCategory',
      setItems: 'filters/setItems',
      addItems: 'realty/addItems',
      getItem: 'categoriesRealty/getItem',
      setItemCategory: 'categoriesRealty/setItem',
      getItemsCategories: 'categoriesRealty/getItems',
      removeItem: 'categoriesRealty/removeItem',
      setSearchType: 'filters/setSearchType',
    }),
    everySix(count) {
      if (count % 6 === 0) {
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            renderTo: `yandex_rtb_R-A-1779902-1-${count}`,
            blockId: 'R-A-1779902-1',
            pageNumber: count + 1,
          })
        })
      }
      return count % 6 === 0;
    },
    getUrl(realty) {
      return `/feed/alias/${realty.alias}`
    },
    getUsername(catalog) {
      return catalog?.profile?.user?.name
    },
    getPhoto(realty) {
      return realty.photo ?? 'https://storage.yandexcloud.net/tapigo-static/empty.png';
    },
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
      }).format(price);
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
    getH1() {
      return this.category.name;
      //return this.category.name ?? 'Поиск по: ' + this.querySearch;
    },
    linkHub() {
      if (this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/catalog/new`;
      } else {
        document.location.href = `${process.env.AUTH_URL}?from=${process.env.HUB_URL}/catalog/new`;
      }
    },
  },

}
</script>
