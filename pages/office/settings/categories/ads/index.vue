<template>
  <CategoryOfficeList/>
</template>

<script>
import CategoryOfficeList from "../../../../../components/office/settings/categories/ads/CategoryOfficeList";
export default {
  components: {CategoryOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

