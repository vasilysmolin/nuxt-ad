<template>
  <ServiceList />
</template>

<script>
import ServiceList from "../../../components/ServiceList";
export default {
  components: {ServiceList},
  layout: 'default',
  head: {
    title: "Бесплатно создавайте услуги без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

