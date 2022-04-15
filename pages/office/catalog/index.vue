<template>
  <COfficeList/>
</template>

<script>
import COfficeList from "../../../components/office/COfficeList";
export default {
  components: {COfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

