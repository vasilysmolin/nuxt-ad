<template>
  <ROfficeList/>
</template>

<script>
import ROfficeList from "../../../../components/office/ROfficeList";
export default {
  components: {ROfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

