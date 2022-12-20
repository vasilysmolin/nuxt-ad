<template>
  <NewBuildHubList/>
</template>

<script>
import NewBuildHubList from "../../../components/hub/NewBuildHubList";

export default {
  components: {NewBuildHubList},
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
