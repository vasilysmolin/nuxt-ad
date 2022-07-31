<template>
  <section v-if="isLoading">

    <div v-if="$device.isDesktop" class="flex flex-col px-5 w-[100%]">
      <p class="leading-5 font-medium">Имя:<span class="inline-block first-letter:uppercase pl-2 font-normal text-gray-800">{{ name }}</span></p>
      <div class="mt-6 flex justify-start items-center">
        <p v-if="$auth.loggedIn" class="font-medium leading-none">Телефон:<span
            class="pl-2 font-black text-lg leading-none">{{ phone }}</span>
          <a class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]" :href="`mailto:${email}`">Пригласить</a>
        </p>
        <button v-else type="button"
                class="btn btn-primary inline-block px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black"
                @click.prevent="showModalAuth">Показать телефон
        </button>
      </div>
      <AuthModal/>
    </div>

    <div v-if="$device.isMobile" class="flex flex-col px-5 w-[100%]">
      <p class="leading-5 text-sm font-bold">Имя:<span class="inline-block first-letter:uppercase pl-1 font-normal text-black">{{ name }}</span></p>
      <div class="mt-5 flex justify-start items-center">
        <p v-if="$auth.loggedIn" class="font-bold text-sm leading-none">Телефон:<span
            class="pl-1 font-black text-base leading-none"><a class="text-blue-600" :href="`tel:${phone}`">{{ phone }}</a></span>
          <a class="block mt-4 py-3 bg-[#00A05D] text-white text-center font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-[#049055]" :href="`mailto:${email}`">Пригласить</a>
        </p>
        <button v-else type="button"
                class="btn btn-primary inline-block px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black"
                @click.prevent="showModalAuth">Показать телефон
        </button>
      </div>
      <AuthModal/>
    </div>

  </section>
</template>

<script>
import AuthModal from "../../components/AuthModal";
import VMask from 'string-mask'

export default {
  name: "BContactR",
  data() {
    return {
      isLoading: false,
    }
  },
  components: {AuthModal},
  mounted() {
    setTimeout(() => {
      let formatter = new VMask('+7 (000) 000-00-00');
      this.phone = formatter.apply(this.phone);
      this.isLoading = true;
    }, 800);
  },
  props: {
    name: String,
    phone: String,
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
