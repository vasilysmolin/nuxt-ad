<template>
  <SellerProfile/>
</template>

<script>

import SellerProfile from "~/components/SellerProfile.vue";

export default {
  components: {SellerProfile},
  layout: 'default-search',
  name: "profile-s",
  head: {
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  }
}
</script>
