<template>
  <section>
    <div v-if="$device.isDesktopOrTablet" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
      <div class="mx-auto flex flex-col w-full">
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
              <p class="text-black">{{ house.name }}</p>
            </li>
          </ul>
        </nav>

        <section class="mt-[15px] w-full h-[450px] bg-cover bg-center rounded-lg saturate-50"
                 v-bind:style="{ backgroundImage: 'url(' + house.photo + ')' }">
          <h1 class="mt-8 ml-8 p-2 inline-block text-3xl text-black font-black bg-white rounded">{{ house.name }}</h1>
          <NuxtLink :to="getUrlSeller(house)"
                    class="absolute left-8 bottom-8 p-2 inline-block text-xl text-white bg-[#0445FF] rounded">
            {{ getUserName(house) }}
          </NuxtLink>
        </section>

        <section class="mt-8 flex justify-between items-center">
          <p class="text-lg">{{ house.full_address }}</p>
          <a href="" class="text-base text-blue-600">Посмотреть на карте</a>
        </section>

        <section class="mt-8 flex justify-between text-lg">
          <p class="text-gray-500">Застройщик<span class="pl-2.5 text-black">{{ getAgentHouse(house) }}</span></p>
          <p class="text-gray-500">Срок сдачи<span class="pl-2.5 text-black">{{ getDeadline(house) }}. {{ house.date_build }} г.</span></p>
          <p class="text-gray-500">Этажей в доме<span class="pl-2.5 text-black">{{ getAllFloorHouse(house) }}</span></p>
          <p class="text-gray-500">Тип дома<span class="pl-2.5 text-black">{{ getType(house) }}</span></p>
        </section>

        <button type="button" @click.prevent="showSpecificHouse" class="btn btn-primary block mx-auto mt-10 px-5 py-2.5 w-[220px] bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
            Все характеристики дома
        </button>
        <SpecificHouse/>

        <section class="mt-8">
          <h2 class="inline-block font-bold text-xl">О жилом комплексе</h2>
          <p class="mt-5 leading-6 text-gray-700" v-html="house.description"></p>
        </section>

        <p class="text-center">
          <NuxtLink :to="getAllFlats()"
                    class="btn btn-primary inline-block mt-10 px-5 py-2.5 bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
            Все квартиры этого дома
          </NuxtLink>
        </p>

        <section class="mt-10 w-full">
          <template v-if="house !== null">
            <BYandexMap
                :obj="house"
            />
          </template>
        </section>



        <!--
        <template v-for="(realty, ind) in realties">
          <article class="p-1 group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
            <NuxtLink :to="getUrl(realty)">
              <section class="grid grid-cols-[250px,450px,_1fr]">

                <section class="flex flex-col pl-5 pr-10">
                  <h2 class="mt-3 font-bold leading-[27px] text-2xl group-hover:text-blue-600">
                    {{ generateTitle(realty) }}<span class="text-lg"> м<sup>2</sup></span></h2>
                  <p class="mt-2.5 text-sm text-gray-500">{{ realty.full_address }}</p>
                  <h3 class="mt-5 font-bold text-2xl">{{ formatPrice(realty.price) }}</h3>
                  <h3 class="mt-1 text-sm text-gray-500">{{ getActionUser(realty) }} {{ getUserName(realty) }}</h3>
                </section>
              </section>
            </NuxtLink>
          </article>
        </template>


        <NuxtLink :to="getAllFlats(realty)">
          <button
              type="button"
              class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            Смотреть все квартиры
          </button>
        </NuxtLink>
        -->
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import BYandexMap from "~/components/blocks/BYandexMap";
import VueSlickCarousel from "vue-slick-carousel";
import SpecificHouse from "~/components/SpecificHouse.vue";

export default {
  name: "HouseShow",
  mixins: [CategoriesMixin],
  components: {SpecificHouse, BYandexMap, VueSlickCarousel},
  props: {
    type: String,
  },
  data() {
    return {
      house_id: null,
      realty: null,
    }
  },
  async mounted() {
    this.house_id = this.$route.params.house;
    console.log(this.$route.params);
    await this.getItems({category_ids: '410', house_id: this.house_id});
    await this.getItemsState();
    await this.getHouse({id: this.house_id});
    if (Object.keys(this.$store.getters['finishing/finishing']).length === 0) {
      await this.$store.dispatch('finishing/getItems');
    }
    if (Object.keys(this.$store.getters['typeHouse/typeHouse']).length === 0) {
      await this.$store.dispatch('typeHouse/getItems');
    }
    if (Object.keys(this.$store.getters['deadLine/deadLine']).length === 0) {
      await this.$store.dispatch('deadLine/getItems');
    }
    if (Object.keys(this.$store.getters['elite/elite']).length === 0) {
      await this.$store.dispatch('elite/getItems');
    }
    if (Object.keys(this.$store.getters['parking/parking']).length === 0) {
      await this.$store.dispatch('parking/getItems');
    }
  },
  computed: {
    ...mapGetters({
      realties: 'newBuildings/realties',
      house: 'houses/house',
      states: 'states/states',
      finishing: 'finishing/finishing',
      typeHouse: 'typeHouse/typeHouse',
      deadline: 'deadLine/deadLine',
      elite: 'elite/elite',
      parking: 'parking/parking',
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'newBuildings/getItems',
      getHouse: 'houses/getItem',
      getItemsState: 'states/getItems',
    }),
    getUrl(realty) {
      return `/houses/${this.house_id}/flats/${realty.alias}`
    },
    getAllFlats() {
      return `/houses/${this.house_id}/flats`
    },
    getUrlSeller(house) {
      return `/houses/sellers/${house?.profile?.user?.id}`
    },
    getElite(house) {
      return this.elite[house.elite] ?? '';
    },
    getFinishing(house) {
      return this.finishing[house.finishing] ?? '';
    },
    getType(house) {
      return this.typeHouse[house.type] ?? '';
    },
    getDeadline(house) {
      return this.deadline[house.deadline] ?? '';
    },
    getState(realty) {
      return this.states[realty.state];
    },
    showSpecificHouse() {
      this.$modal.show('SpecificHouse');
    },
  },

}
</script>
