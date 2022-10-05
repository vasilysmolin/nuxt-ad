<template>
  <RealtyHubList/>
</template>

<script>
import RealtyHubList from "../../../components/hub/RealtyHubList";

export default {
  components: {RealtyHubList},
  layout: 'hub',
  name: "RealtyList",
  head: {
    title: "Мои объявления на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  middleware: ['redirect', 'person'],
}
</script>
