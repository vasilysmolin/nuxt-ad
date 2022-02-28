<template>
  <RAdminList/>
</template>

<script>
import UList from "../../../../components/RAdminList";
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

