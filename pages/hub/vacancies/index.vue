<template>
  <VHubList v-bind:type="'vacancies'" />
</template>

<script>
import VHubList from "../../../components/hub/VHubList";
export default {
  components: {VHubList},
  layout: 'hub',
  head: {
    title: "Мои вакансии на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  middleware: ['redirect', 'person'],
}
</script>

