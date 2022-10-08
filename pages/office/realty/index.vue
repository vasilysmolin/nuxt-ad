<template>
  <RealtyOfficeList/>
</template>

<script>
import RealtyOfficeList from "../../../components/office/RealtyOfficeList";

export default {
  components: {RealtyOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

