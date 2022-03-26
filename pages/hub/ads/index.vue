<template>
  <AHubList/>
</template>

<script>
import AHubList from "../../../components/hub/AHubList";
export default {
  components: {AHubList},
  layout: 'hub',
  head: {
    title: "Мои объявления на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  middleware: ['redirect', 'person'],
}
</script>
