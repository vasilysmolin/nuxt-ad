<template>
  <HouseAdminList/>
</template>

<script>
import HouseAdminList from "~/components/office/HouseOfficeList";

export default {
  components: {HouseAdminList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

