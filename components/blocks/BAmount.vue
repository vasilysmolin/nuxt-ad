<template>
  <section v-if="isLoading" >
    <p class="first-letter:uppercase text-[12px] text-gray-500 mb-[4px]">
      <span class="font-bold">{{ amount }}
      </span>
      {{ title }}</p>
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
