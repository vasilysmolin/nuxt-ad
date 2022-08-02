<template>
  <section>
    <div v-if="$device.isDesktopOrTablet">
      <CatalogList/>
    </div>
    <div v-if="$device.isMobile">
      <CatalogList/>
    </div>
  </section>
</template>

<script>
import CatalogList from "~/components/CatalogList";
export default {
  components: {CatalogList},
  layout: 'default-search',
  head: {
    title: "Бесплатно создавайте объявления без ограничений на Tapigo.ru | Каталог",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

