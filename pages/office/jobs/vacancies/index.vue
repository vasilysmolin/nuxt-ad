<template>
  <VAdminList/>
</template>

<script>
import UList from "../../../../components/VAdminList";
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

