<template>
  <section v-if="isLoading" class="flex flex-col self-start py-3 px-2.5 w-full rounded-lg bg-white">

    <div v-if="$device.isDesktop">
      <p class="font-bold leading-[27px] text-2xl">{{ price }}</p>
      <p class="mt-1.5 text-base text-gray-500" v-if="isNew">{{ price_per_square }} <span class="text-sm">за м<sup>2</sup></span></p>
      <p class="mt-1.5 text-sm text-gray-500"><span class="">{{ getActionUser() }} {{ name }}</span></p>
      <div class="mt-5 flex flex-col justify-start items-start">
        <p v-if="$auth.loggedIn" class="w-full text-sm text-gray-500 leading-none">Телефон:<span
            class="pl-2 text-black font-black text-lg leading-none">{{ number }}</span>
          <a v-if="isNew"
             class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
             :href="`mailto:${email}`">Оставить заявку</a>
          <a v-else
             class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
             :href="`mailto:${email}`">Написать {{ getActionUser2() }}</a>
        </p>
        <button v-else type="button"
                class="btn btn-primary inline-block px-5 py-3 bg-[#00A05D] w-full text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
                @click.prevent="showModalAuth">Показать телефон
        </button>
        <template v-if="isNew">
          <p class="mt-5 text-sm text-gray-500">Застройщик {{ agent }}</p>
          <NuxtLink :to="`/houses/${house.alias}`" class="text-gray-500 hover:text-black">{{
              house.name
            }}
          </NuxtLink>
        </template>

      </div>
      <p v-if="address != null" class="leading-relaxed font-medium">Адрес:<span class="pl-2 font-normal text-gray-800">{{
          address
        }}</span></p>
      <AuthModal/>
    </div>

    <div v-if="$device.isMobile" class="flex flex-col px-5 w-[100%]">
      <p class="leading-5 text-sm font-bold">Компания:<span class="pl-1 font-normal text-black">{{ name }}</span></p>
      <div class="my-5 flex justify-start items-center">
        <p v-if="$auth.loggedIn" class="font-bold text-sm leading-none">Телефон:<span
            class="pl-1 font-black text-base leading-none"><a class="text-blue-600" :href="`tel:${number}`">{{ number }}</a></span>
          <a class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]" :href="`mailto:${email}`">Откликнуться</a>
        </p>
        <button v-else type="button"
                class="btn btn-primary inline-block px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black"
                @click.prevent="showModalAuth">Показать телефон
        </button>
      </div>
      <p v-if="address != null" class="leading-5 text-sm font-bold">Адрес:<span
          class="pl-1 font-normal text-black">{{ address }}</span></p>
      <AuthModal/>
    </div>

  </section>
</template>

<script>
import AuthModal from "../../components/AuthModal";
import VMask from 'string-mask'

export default {
  name: "BContactC",
  data() {
    return {
      isLoading: false,
      number: null,
    }
  },
  components: {AuthModal},
  mounted() {
    setTimeout(() => {
      let formatter = new VMask('+7 (000) 000-00-00');
      this.number = formatter.apply(this.phone);
      this.isLoading = true;
    }, 800);
  },
  props: {
    name: String,
    phone: String,
    address: String,
    isNew: Boolean,
    isBuy: Boolean,
    price: String,
    price_per_square: String,
    agent: String,
    email: String,
    house: Object
  },
  computed: {},
  methods: {
    showModalAuth() {
      this.$modal.show('AuthModal');
    },
    getActionUser() {
      return this.isBuy ? 'Продавец' : 'Арендодатель';
    },
    getActionUser2() {
      return this.isBuy ? 'Продавцу' : 'Арендодателю';
    },
  },

}
</script>
