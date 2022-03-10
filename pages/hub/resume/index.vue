<template>
  <RHubList/>
</template>

<script>
import RHubList from "../../../components/hub/RHubList";
export default {
  components: {RHubList},
  layout: 'hub',
  head: {
    title: "Бесплатно создавайте резюме без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
