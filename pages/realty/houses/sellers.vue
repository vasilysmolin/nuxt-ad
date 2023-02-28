<template>
  <SellersList/>
</template>

<script>

import SellersList from "~/components/SellersList.vue";

export default {
  components: {SellersList},
  layout: 'default-search',
  name: "sellers",
  head: {
    title: "Каталог продавцов",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  }
}
</script>
