<template>
  <section v-if="isLoading" class="flex flex-col px-2.5 h-[220px] rounded-lg bg-white">

    <div v-if="$device.isDesktop" class="flex flex-col">
      <p>{{ price }}</p>
      <p v-if="isNew">{{ price_per_square }} <span class="">за м<sup>2</sup></span></p>
      <div class="flex flex-col justify-start items-start">
        <p v-if="$auth.loggedIn" class="w-full font-medium leading-none">Телефон:<span
            class="pl-2 font-black text-lg leading-none">{{ number }}</span>
          <a v-if="isNew" class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
             :href="`mailto:${email}`">Оставить заявку</a>
          <a v-else class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
             :href="`mailto:${email}`">Написать продавцу</a>
        </p>
        <button v-else type="button"
                class="btn btn-primary inline-block px-5 py-3 bg-[#00A05D] w-full text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]"
                @click.prevent="showModalAuth">Показать телефон
        </button>
        <p v-if="isNew">{{ agent }}</p>
        <p v-else class="leading-5 font-medium"><span class="pl-2 font-normal text-gray-500">{{ name }}</span></p>
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
import {isObject} from "lodash/lang";

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
    price: String,
    price_per_square: String,
    agent: String,
    email: String
  },
  computed: {},
  methods: {
    showModalAuth() {
      this.$modal.show('AuthModal');
    }
  },

}
</script>
