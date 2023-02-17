<template>
  <section>
    <div v-if="$device.isDesktopOrTablet" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">

      <div class="mx-auto flex flex-col w-full">
        <div class="flex justify-between">
          <h1 class="first-letter:uppercase mb-4 w-full text-xl text-black font-black text-center leading-none truncate">
            {{ $t('house.title') }}: {{ house.name }}</h1>
          <!--          <section class="grid grid-cols-2 gap-4 items-center text-sm">-->
          <!--            <ul class="text-gray-500 leading-9">-->
          <!--              <li>Элитный</li>-->
          <!--              <li>Отделка</li>-->
          <!--              <li>Срок сдачи}</li>-->
          <!--            </ul>-->
          <!--            <ul class="text-gray-500 leading-9">-->
          <!--              <li>{{getElite(house)}}</li>-->
          <!--              <li>{{getFinishing(house)}}</li>-->
          <!--              <li>{{getDeadline(house)}} {{house.date_build}}</li>-->
          <!--            </ul>-->
          <!--          </section>-->
        </div>
        <nav class="flex justify-start items-center mt-3 mb-1.5">
          <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
            <li class="leading-6">
              <NuxtLink :to="`/houses`" class="text-gray-500 hover:text-black">Все дома</NuxtLink>
            </li>
          </ul>
        </nav>
        <template v-for="(realty, ind) in realties">
          <article class="p-1 group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
            <NuxtLink :to="getUrl(realty)">
              <section class="grid grid-cols-[250px,450px,_1fr]">

                <section>
                  <img class="w-full rounded-lg bg-cover" :src="getPhoto(realty)" :alt="realty.name">
                </section>

                <section class="flex flex-col pl-5 pr-10">
                  <h2 class="mt-3 font-bold leading-[27px] text-2xl group-hover:text-blue-600">
                    {{ generateTitle(realty) }}<span class="text-lg"> м<sup>2</sup></span></h2>

                  <p class="mt-2.5 text-sm text-gray-500">{{ realty.full_address }}</p>

                  <h3 class="mt-5 font-bold text-2xl">{{ formatPrice(realty.price) }}</h3>

                  <h3 class="mt-1 text-sm text-gray-500">{{ getActionUser(realty) }} {{ getUserName(realty) }}</h3>

                </section>

                <section class="grid grid-cols-2 gap-4 items-center text-sm">
                  <ul class="text-gray-500 leading-9">
                    <li>Стоимость, м<sup><small>2</small></sup></li>
                    <li>Этаж</li>
                    <li>Тип комнат</li>
                  </ul>
                  <ul class="text-gray-500 leading-9">
                    <li class="mt-1 text-gray-500">{{ formatPrice(realty.price_per_square) }}
                    </li>
                    <li>{{ getFloor(realty) }}</li>
                    <li>{{ getTypeRooms(realty) }}</li>
                  </ul>
                </section>

              </section>
            </NuxtLink>
          </article>
          <div class="mt-5" v-if="everySix(ind + 1)">
            <div v-bind:id="`yandex_rtb_R-A-1779902-1-${ind+1}`"></div>
          </div>
        </template>
        <button v-if="checkAmount" @click="addItems({ skip: realties.length, from: 'cabinet', category_ids: '410'})"
                type="button"
                class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Смотреть дальше
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';

export default {
  name: "RealtyHubList",
  mixins: [CategoriesMixin],
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
    }),
    checkAmount() {
      return this.realties.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'newBuildings/getItems',
      getHouse: 'houses/getItem',
      addItems: 'newBuildings/getItems',
      getItemsState: 'states/getItems',
    }),
    getUrl(realty) {
      return `/feed/alias/${realty.alias}`
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
    }
  },

}
</script>
