<template>
  <ServiceList />
</template>

<script>
import ServiceList from "../../../components/ServiceList";
import * as _ from "lodash";
export default {
  components: {ServiceList},
  layout: 'default-search',
  head: {
    title: "Бесплатно создавайте услуги без ограничений на Tapigo.ru | Услуги",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

