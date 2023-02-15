<template>
  <NewBuildList/>
</template>

<script>
import NewBuildList from "~/components/NewBuildList";

export default {
  components: {NewBuildList},
  layout: 'default-search',
  name: "RealtyList",
  head: {
    title: "Мои объявления на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
