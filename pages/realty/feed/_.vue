<template>
  <section>
    <div v-if="$device.isDesktopOrTablet">
      <RealtyList/>
    </div>
    <div v-if="$device.isMobile">
      <RealtyList/>
    </div>
  </section>
</template>

<script>
import RealtyList from "~/components/RealtyList";

export default {
  components: {RealtyList},
  layout: 'default-search',
  head: {
    title: "Бесплатно создавайте объявления без ограничений на Tapigo.ru | Каталог",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

