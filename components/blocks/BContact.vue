<template>
  <section v-if="isLoading" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
    <h2 class="text-lg font-bold text-black">
      Контактное лицо
    </h2>
    <p class="text-[0.9375rem] leading-5 sm:text-lg">
      {{ name }}
    </p>
    <div class="flex w-[75%]">
      <a :href="`tel:${phone}`" v-if="$auth.loggedIn" class="mt-1 text-[0.9375rem] leading-5 sm:text-lg">
        {{ phone}}
      </a>
      <div type="button" v-else class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
        <button  @click.prevent="showModalAuth">Посмотреть телефон</button>
      </div>
    </div>
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
    },800);
  },
  props: {
    name: String,
    phone: String,
  },
  computed: {
  },
  methods: {
    showModalAuth() {
      this.$modal.show('AuthModal');
    }
  },

}
</script>
