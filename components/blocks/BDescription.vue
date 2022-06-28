<template>
    <section v-if="isLoading" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="text-lg font-bold text-black">{{ title }}</h2>
      <p class="mt-1 text-sm sm:text-base text-gray-600">{{ description }}</p>
    </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';
import * as _ from "lodash";

export default {
  name: "BDescription",
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
    title: String,
    description: String,
  },
  computed: {
  },
  methods: {
  },

}
</script>
