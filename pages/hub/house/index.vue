<template>
  <HouseHubList/>
</template>

<script>
import HouseHubList from "~/components/hub/HouseHubList";

export default {
  components: {HouseHubList},
  layout: 'hub',
  name: "IndexHubHouse",
  head: {
    title: "Мои объявления на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  middleware: ['redirect', 'person'],
}
</script>
