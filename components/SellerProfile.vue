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
              <NuxtLink :to="`/houses/sellers`" class="text-gray-500 hover:text-black">Каталог продавцов</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <p class="text-black">{{ getUserName(sellerHouse) }}</p>
            </li>
          </ul>
        </nav>
        <section class="relative mt-[15px]">

          <!-- Обложка страницы -->
          <figure class=" w-full h-[450px] bg-cover bg-center rounded-lg saturate-50"
                  v-bind:style="{ backgroundImage: 'url(' + getBackground(sellerHouse) + ')' }">
          </figure>

          <!-- Логотип -->
          <figure class="absolute bottom-32 left-8 w-[100px] h-[100px] bg-cover bg-center rounded bg-transparent z-50"
                  v-bind:style="{ backgroundImage: 'url(' + getLogo(sellerHouse) + ')' }"></figure>

          <h1 class="absolute bottom-12 left-8 p-2 inline-block text-3xl text-black font-black bg-white rounded">
            {{ getUserName(sellerHouse) }}</h1>
        </section>

        <section class="mt-8 flex justify-between items-center">
          <p class="font-bold text-xl">{{ number }}</p>
          <!--          <a :href="`mailto:${getEmail(sellerHouse)}`" class="text-blue-600">Отправить письмо</a>-->
          <p>{{ getEmail(sellerHouse) }}</p>
        </section>

        <section class="mt-8">
          <h2 class="inline-block font-bold text-xl">О продавце</h2>
          <p class="mt-5 leading-6 text-gray-700">
            {{ getDesc(sellerHouse) }}</p>
        </section>

        <section class="mt-8">
          <h2 class="inline-block font-bold text-xl">Объекты</h2>
          <section class="mt-5 grid grid-cols-2 gap-12">
            <template v-for="(house, index) in houses">
              <article class="group flex flex-col rounded-lg bg-white transition duration-150 ease-in-out">
                <NuxtLink :to="getUrl(house)">
                  <section class="flex flex-col">
                    <section class="w-full max-h-[350px]">
                      <img class="w-full rounded-t-lg h-[350px] saturate-50" :src="getPhoto(house)" :alt="house.name">
                    </section>
                    <section class="flex flex-col px-5 pb-6">
                      <h2 class="mt-2.5 font-black text-2xl">
                        {{ house.name }}
                      </h2>
                      <p class="mt-2.5 text-sm text-gray-500">{{ house.full_address }}</p>
                      <p class="mt-2 text-sm text-black">Срок сдачи<span class="pl-3"></span>{{ getDeadline(house) }}.
                        {{ house.date_build }} г.</p>
                    </section>
                  </section>
                </NuxtLink>
              </article>
            </template>
          </section>
          <button type="button"
                  class="btn btn-primary block mx-auto mt-10 px-5 py-2.5 w-[220px] bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
            Показать все объекты
          </button>
        </section>

      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import VMask from 'string-mask'

export default {
  name: "SellerProfileAll",
  mixins: [CategoriesMixin],
  data() {
    return {
      number: null
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
    await this.getSellerHouse({id: this.id}).then(() => {
      let formatter = new VMask('+7 (000) 000-00-00');
      this.number = formatter.apply(this.sellerHouse.profile.user.phone);
      console.log(this.number);
      this.getHouses({user_id: this.sellerHouse.profile.user.id})
    });

  },
  computed: {
    ...mapGetters({
      sellerHouse: 'sellerHouse/seller',
      houses: 'houses/houses',
      amount: 'houses/amount',
    }),
    checkAmount() {
      return this.houses.length < this.amount;
    },
  },
  methods: {
    ...mapActions({
      getSellerHouse: 'sellerHouse/getItem',
      getHouses: 'houses/getItems',
    }),
    getUrl(house) {
      return `/houses/${house.id}`;
    },
    getBackground(seller) {
      return seller?.background_image;
    },
    getLogo(seller) {
      return seller?.logo;
    },
    getEmail(seller) {
      return seller?.profile?.user?.email;
    },
    getDesc(seller) {
      return seller?.description;
    },
  },

}
</script>
