<template>
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
      <article v-for="service in services" :key="service.id" class="flex flex-col p-3 rounded-lg bg-white">
        <NuxtLink :to="getUrl(service)">
          <p class="mt-1 mb-2.5">{{types[service.type]}}</p>
          <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ service.name }}</h2>
          <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ service.price }}<span class="pl-1 text-xs">руб.</span></h3>
          <div class="flex justify-between w-full">
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
          </div>
        </NuxtLink>

      </article>
      <button @click="addItems({skip: services.length, state: 'active', expand: 'profile.user', from: 'catalog'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import * as _ from "lodash";
import BCategoriesNav from "~/components/blocks/BCategoriesNav";
import Breadcrumbs from "./Breadcrumbs";
import BAmount from "~/components/blocks/BAmount";

export default {
  name: "CatalogList",
  components: {Breadcrumbs, BCategoriesNav, BAmount},
  props: {
    type: String,
  },
  async mounted() {
    if(this.services.length === 0) {
      await this.getItems({state: 'active', expand: 'profile.user', from: 'catalog'});
    }
    const sub = this.$route.fullPath.split('/').pop();
    if(this.$route.path !== '/feed') {
      await this.getItem({id: sub });
    } else {
      await this.removeItem();
    }

    await this.$store.dispatch('typeServices/getItems');
  },
  computed: {
    ...mapGetters({
      services: 'services/services',
      amount: 'services/amount'
    }),
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
        addItems: 'services/addItems',
        getItem: 'categoriesService/getItem',
        removeItem: 'categoriesService/removeItem',
      }),
    getUrl(service) {
      let cat = `/feed/${ service.categories ? service.categories.alias : 'none'}`;
      return  cat + '/' + `${ service.alias}`
    },
    getUsername(vacancy) {
      return vacancy?.profile?.user?.name
    },
  },

}
</script>
