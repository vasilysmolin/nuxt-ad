<template>
  <VOfficeList/>
</template>

<script>
import VOfficeList from "../../../../components/office/VOfficeList";
export default {
  components: {VOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

