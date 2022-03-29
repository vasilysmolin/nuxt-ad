<template>
  <CatalogList />
</template>

<script>
import CatalogList from "../../components/CatalogList";
export default {
  components: {CatalogList},
  layout: 'catalog',
  head: {
    title: "Бесплатно создавайте объявления без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

