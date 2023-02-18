<template>
  <HouseShow/>
</template>

<script>
import HouseShow from "~/components/HouseShow";

export default {
  components: {HouseShow},
  layout: 'default-search',
  name: "HouseShowIndex",
  head: {
    title: "Мои объявления на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
