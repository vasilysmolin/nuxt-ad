<template>
  <VHubList v-bind:type="'vacancies'" />
</template>

<script>
import VHubList from "../../../components/hub/VHubList";
export default {
  components: {VHubList},
  layout: 'hub',
  head: {
    title: "Бесплатно создавайте вакансии без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

