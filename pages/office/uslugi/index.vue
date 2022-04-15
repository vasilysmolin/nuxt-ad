<template>
  <UOfficeList/>
</template>

<script>
import UOfficeList from "../../../components/office/UOfficeList";
export default {
  components: {UOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

