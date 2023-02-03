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
    title: "Новостройки и квартиры от застройщика на Tapigo.ru | Каталог недвижимости",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

