<template>
  <section v-if="isLoading" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
    <h1 class="first-letter:uppercase text-[0.9375rem] leading-5 sm:text-xl"><span v-if="type">{{type}}:</span> {{ name }}</h1>
    <p class="text-xl sm:text-2xl font-bold">
      <span v-if="priceFrom" class="text-sm">от</span>
      {{ formatPrice(price) }}
    </p>
  </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';
import * as _ from "lodash";

export default {
  name: "BHead",
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    })
  },
  props: {
    type: String,
    name: String,
    price: Number,
    priceFrom: Boolean
  },
  computed: {
  },
  methods: {
    formatPrice(price) {
      if (price) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price);
      }
    },
  },

}
</script>
