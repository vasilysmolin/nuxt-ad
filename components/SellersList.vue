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
              <p class="text-black">Каталог продавцов</p>
            </li>
          </ul>
        </nav>

        <section class="mt-[10px]">
          <h1 class="inline-block text-2xl font-black leading-none">Каталог продавцов</h1>
          <section class="mt-5 grid grid-cols-4 gap-4">
            <template v-for="(seller, index) in sellers">
              <article class="group flex flex-col rounded-lg bg-white transition duration-150 ease-in-out">

                <NuxtLink :to="getUrl(seller)">
                  <section class="relative w-full h-[200px]">

                    <!-- Обложка из страницы продавца-->
                    <figure class="flex flex-col w-full h-full bg-cover bg-center rounded-t-lg saturate-50"
                            style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_new_building_index.jpg)"></figure>

                    <!-- Логотип-->
                    <section class="absolute bottom-4 left-0 right-0 flex justify-center items-center h-auto">
                      <figure class="w-[40px] h-[40px] bg-cover bg-center rounded bg-transparent"
                              style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/logo_profile_seller.png)"></figure>
                    </section>

                  </section>
                  <section class="flex flex-col px-2 pb-6">
                    <h2 class="mt-5 font-black text-lg leading-[21px]">{{ seller.profile.person.name }}</h2>
                    <p class="mt-5 px-2 py-1.5 inline-block text-sm font-medium text-black text-center rounded bg-gray-100">
                      {{ seller.profile.houses_count }} {{ trueEnding(seller.profile.houses_count) }}</p>
                  </section>
                </NuxtLink>
              </article>
            </template>

          </section>
          <button v-if="checkAmount" @click="addItems({ skip: sellers.length, seller: 'houses'})" type="button"
                  class="btn btn-primary block mx-auto mt-10 px-5 py-2.5 w-[220px] bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
            Показать всех продавцов
          </button>
        </section>

      </div>
    </div>
  </section>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "SellersList",
  data() {
    return {
    }
  },
  async mounted() {
    await this.getItems({seller: 'houses'});
  },
  computed: {
    ...mapGetters({
      sellers: 'users/sellers',
      amount: 'users/amountSellers',
    }),
    checkAmount() {
      return this.sellers.length < this.amount;
    },


  },
  methods: {
    ...mapActions({
      getItems: 'users/getSellers',
      addItems: 'users/addSellers',
    }),
    getUrl(seller) {
      return 'sellers/' + `${seller.id}`
    },
    trueEnding(amount) {
      if (amount % 100 <= 20 && amount % 100 >= 5) {
        return 'объектов';
      }

      if (amount % 10 === 1) {
        return 'объект';
      }

      return 'объекта';
    },
  },

}
</script>
