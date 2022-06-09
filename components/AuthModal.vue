<template>
  <modal name="AuthModal" :min-width="620" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <h1>Для просмотра телефона, необходимо авторизоваться</h1>
    <button type="button" @click.prevent="hide"
            class="inline-block px-5 py-4
            bg-blue-600 text-white font-bold text-base leading-snug
            rounded-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
      Закрыть
    </button>

    <button type="button" @click.prevent="goAuth"
            class="inline-block px-5 py-4 bg-blue-600 text-white
            font-bold text-base leading-snug rounded-lg hover:bg-blue-700
            hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out">
      Войти в аккаунт
    </button>
  </modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';

export default {
  name: 'AuthModal',
  async mounted() {

  },
  data() {
    return {
      query: null,
    }
  },
  computed: {
  },
  methods: {
    hide() {
      this.$modal.hide('AuthModal');
    },
    goAuth() {
      document.location.href = `${process.env.AUTH_URL}?from=${window.location.href}`;
    },

  },
}
</script>
