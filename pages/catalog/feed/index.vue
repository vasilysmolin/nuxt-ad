<template>
  <CatalogList />
</template>

<script>
import CatalogList from "~/components/CatalogList";
export default {
  components: {CatalogList},
  layout: 'default',
  head: {
    title: "Бесплатно создавайте объявления без ограничений на Tapigo.ru | Каталог объявлений",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

