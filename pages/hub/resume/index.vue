<template>
  <RHubList/>
</template>

<script>
import RHubList from "../../../components/hub/RHubList";
export default {
  components: {RHubList},
  layout: 'hub',
  head: {
    title: "Мои резюме на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
