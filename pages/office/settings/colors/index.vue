<template>
  <ColorsOfficeList/>
</template>

<script>
import ColorsOfficeList from "../../../../components/office/settings/colors/ColorsOfficeList";
export default {
  components: {ColorsOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

