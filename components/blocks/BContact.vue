<template>
  <section v-if="isLoading" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
    <h2 class="text-lg font-bold text-black">
      Контактное лицо
    </h2>
    <p class="text-[0.9375rem] leading-5 sm:text-lg">
      {{ name }}
    </p>
    <div class="flex w-[75%]">
      <p v-if="$auth.loggedIn" class="mt-1 text-[0.9375rem] leading-5 sm:text-lg">
        {{ phone}}
      </p>
      <div type="button" v-else class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
        <button  @click.prevent="showModalAuth">Посмотреть телефон</button>
      </div>
    </div>
    <AuthModal/>
  </section>
</template>

<script>
import AuthModal from "../../components/AuthModal";

export default {
  name: "BContact",
  data() {
    return {
      isLoading: false,
    }
  },
  components: {AuthModal},
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    })
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
