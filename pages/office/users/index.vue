<template>
  <UList/>
</template>

<script>
import UList from "../../../components/UList";
export default {
  components: {UList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

