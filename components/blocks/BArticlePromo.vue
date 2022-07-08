<template>
    <article @click="linkTo(link)" v-bind:class="`px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px]  bg-[${color}]`">
      <slot></slot>
      <div>
        <h2 class="text-sm font-black">{{ title }}</h2>
        <h3 class="mt-1 text-[11px] leading-snug">{{ description }}</h3>
      </div>
    </article>
</template>

<script>
export default {
  name: "BArticlePromo",
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
    description: String,
    link: String,
    color: String,
  },
  methods: {
    linkTo(link) {
      document.location.href = link;
    },
  },

}
</script>
