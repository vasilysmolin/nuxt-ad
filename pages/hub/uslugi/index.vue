<template>
  <UHubList/>
</template>

<script>
import UHubList from "../../../components/hub/UHubList";
export default {
  components: {UHubList},
  layout: 'hub',
  head: {
    title: "Мои услуги на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  middleware: ['redirect', 'person'],
}
</script>
