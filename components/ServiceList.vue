<template>
  <section>
    <BCategoriesNav
        :category="category"
    />
    <section class="container flex flex-col items-center mt-[100px] pb-10">
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <Breadcrumbs
            :baseName="`Главная`"
            :basePath="`/`"
            :depth="1"
            :link="category"
        />
        <BCategoriesNav
            :title="category.name"
            :category="category"
        />
        <BAmount
            :title="`объявлений`"
            :amount="amount"
        />
        <template v-for="(service, ind)  in services">
          <article class="flex mb-[10px] flex-col p-3 rounded-lg bg-white">
            <NuxtLink :to="getUrl(service)">
              <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg"><span
                  class="mt-1 mb-2.5">{{ types[service.type] }}: </span>{{ service.name }}</h2>
              <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ service.price }}<span
                  class="pl-1 text-xs">руб.</span></h3>
              <div class="flex justify-between w-full">
                <button
                    class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Добавить в мой список
                </button>
              </div>
            </NuxtLink>

          </article>
          <div class="mt-5" v-if="everySix(ind + 1)">
            <div v-bind:id="`yandex_rtb_R-A-1779902-4-${ind+1}`"></div>
          </div>
        </template>
        <button v-if="checkAmount" @click="addItems(
          {
        skip: services.length,
        state: 'active',
        expand: 'profile.user',
        alias: alias,
        type: type,
        from: 'catalog'
      }
      )" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
      </section>
    </section>
    </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import * as _ from "lodash";
import Breadcrumbs from "./Breadcrumbs";
import BAmount from "~/components/blocks/BAmount";
import BHead from "~/components/blocks/BHead";
import CategoriesMixin from '~/components/mixins/categories.mixin';
import BCategoriesNav from "~/components/blocks/BCategoriesNav";

export default {
  name: "ServiceList",
  components: {Breadcrumbs, BCategoriesNav, BAmount, BHead},
  mixins: [CategoriesMixin],
  data() {
    return {
      alias: null,
      type: null,
    }
  },
  async mounted() {

    this.alias = this.$route.path.split('/').pop();
    this.type = this.$route.query.type;
    this.setItems({
      type: 'service'
    });
    await this.$store.dispatch('filters/setSearchType', {parameter: 'service'});
    if(this.$route.path !== '/feed') {
      await this.getItem({id: this.alias }).then(() => {
        this.setItems({
          filter: this.category
        });
      });;
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

    await this.$store.dispatch('typeServices/getItems');
    await this.getItems({
      state: 'active',
      expand: 'profile.user',
      from: 'catalog',
      type: this.type,
      alias: this.alias
    });
  },
  computed: {
    ...mapGetters({
      services: 'services/services',
      amount: 'services/amount',
      categories: 'categoriesService/categoriesServices',
      category: 'categoriesService/category'
    }),
    checkAmount(){
      return this.services.length < this.amount;
    },
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesService/category']);
      },
      set(category) {
        return category
      }
    },
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeServices/types']);
      },
      set(types) {
        return types
      }
    },

  },
  methods: {
    ...mapActions({
      getItems: 'services/getItems',
      setItems: 'filters/setItems',
      addItems: 'services/addItems',
      getItem: 'categoriesService/getItem',
      getItemsCategories: 'categoriesService/getItems',
      setItemCategory: 'categoriesService/setItem',
      removeItem: 'categoriesService/removeItem',
    }),
    everySix(count) {
      if (count % 6 === 0) {
        window.yaContextCb.push(() => {
          Ya.Context.AdvManager.render({
            renderTo: `yandex_rtb_R-A-1779902-4-${count}`,
            blockId: 'R-A-1779902-4',
            pageNumber: count + 1,
          })
        })
      }
      return count % 6 === 0;
    },
    getUrl(service) {
      let cat = `/feed/${service.categories ? service.categories.alias : 'none'}`;
      return cat + '/' + `${service.alias}`
    },
    getUsername(vacancy) {
      return vacancy?.profile?.user?.name
    },
  },

}
</script>
