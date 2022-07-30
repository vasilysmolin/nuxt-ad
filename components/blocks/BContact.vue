<template>
  <section v-if="isLoading" class="flex flex-col px-5 w-[100%]">

    <p class="leading-5 font-medium">Компания:<span class="pl-2 font-normal text-gray-800">{{ name }}</span></p>

    <div class="mt-4 pt-1 pb-1.5 flex justify-start items-center">
      <a :href="`tel:${phone}`" v-if="$auth.loggedIn" class="font-medium leading-none">Телефон:<span
          class="pl-2 font-black text-lg">{{ phone }}</span><span
          class="block mt-2 py-2 text-center text-sm font-bold bg-transparent border-2 border-solid border-blue-600 text-blue-600 rounded hover:border-black hover:text-black transition duration-150 ease-in-out">Позвонить</span></a>
      <button v-else type="button"
              class="btn btn-primary inline-block px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black"
              @click.prevent="showModalAuth">Показать телефон
      </button>
    </div>

    <p class="mt-4 leading-relaxed font-medium">Адрес:<span class="pl-2 font-normal text-gray-800">{{ address }}</span></p>

    <AuthModal/>

  </section>
</template>

<script>
import AuthModal from "../../components/AuthModal";
import VMask from 'string-mask'

export default {
  name: "BContact",
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
    address: String,
  },
  computed: {},
  methods: {
    showModalAuth() {
      this.$modal.show('AuthModal');
    }
  },

}
</script>
