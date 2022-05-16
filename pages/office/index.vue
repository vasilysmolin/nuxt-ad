<template>
  <section>
    <h1>Дашборд</h1>
    <UList/>
  </section>
</template>

<script>
import UList from "../../components/office/UList";
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
