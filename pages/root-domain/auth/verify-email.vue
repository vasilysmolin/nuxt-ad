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
      document.location.href = process.env.HUB_URL + '/profile';
    });
  },
};
</script>
