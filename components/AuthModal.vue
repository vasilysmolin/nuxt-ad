<template>
  <modal name="AuthModal" :min-width="620" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <section class="flex justify-center items-center w-full">

      <h1>Для просмотра телефона, необходимо авторизоваться</h1>
      <section class="input-group relative flex flex-wrap items-stretch w-full">
        <button type="button" @click.prevent="hide"
            class="form-control relative flex-auto min-w-0 block w-full
               px-6 py-4 text-base font-bold bg-white bg-clip-padding border
                border-solid border-gray-300 rounded transition
                ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
    >
      Закрыть
    </button>

    <button type="button" @click.prevent="goAuth"
            class="form-control relative flex-auto min-w-0 block w-full
               px-6 py-4 text-base font-bold bg-white bg-clip-padding border
                border-solid border-gray-300 rounded transition
                ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
    >
      Войти в аккаунт
    </button>
      </section>
    </section>
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
      querySearch: null,
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
