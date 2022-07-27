<template>
  <section>

    <div v-if="$device.isDesktop" class="container flex flex-col mt-[70px] pb-[100px] max-w-3xl min-w-[768px]">
      <NavLocJobs/>
      <VList/>
    </div>

    <div v-if="$device.isMobile" class="container mt-[70px] px-[20px] pb-[80px] w-full flex flex-col items-center">
      <VList/>
    </div>

  </section>
</template>

<script>
import VList from "../../../components/VList";
import NavLocJobs from "../../../components/NavLocJobs";

export default {
  components: {VList, NavLocJobs},
  layout: 'default',
  head: {
    title: "Быстрый поиск работы по вакансиям от компаний на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

