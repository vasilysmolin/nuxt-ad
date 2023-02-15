<template>
  <HouseList/>
</template>

<script>
import HouseList from "~/components/HouseList";

export default {
  components: {HouseList},
  layout: 'default-search',
  name: "IndexHouse",
  head: {
    title: "Дома новостроек на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  }
}
</script>
