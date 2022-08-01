<template>
  <section v-if="isLoading" >
    <span class="inline-block mt-1 text-base text-gray-300">{{ amount }}</span>
  </section>
</template>

<script>
export default {
  name: "BAmount",
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    });
  },
  props: {
    title: String,
    amount: Number,
  },
  computed: {
  },
  methods: {
  },

}
</script>
