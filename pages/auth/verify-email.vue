<template>
</template>
<script>

export default {
  name: 'VerifyEmail',
  data() {
    return {
      hash: null
    }
  },
  mounted() {
    if (this.$route.query.hash) {
      this.hash = this.$route.query.hash;
    }
    this.$axios.$get(`/auth/verify-email?hash=${this.hash}`).then(() => {
      this.$router.push({path: 'lk/ads'});
    });
  },
};
</script>
