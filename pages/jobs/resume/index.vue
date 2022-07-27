<template>
  <section>

    <div v-if="$device.isDesktop" class="container mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <NavLocJobs/>
      <RList/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px]">
      <RList/>
    </div>

  </section>
</template>

<script>
import RList from "../../../components/RList";
import NavLocJobs from "../../../components/NavLocJobs";

export default {
  components: {RList, NavLocJobs},
  layout: 'default',
  head: {
    title: "Быстрый поиск работника или соискателя по резюме на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>
