<template>
  <div class="">
    <ul class="flex w-full text-sm font-black text-[18px] text-gray-300">
      <li class="pl-6" @click="jobs"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600 text-black">Работа</nuxt-link></li>
      <li class="pl-6" @click="uslugi"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600 text-black" >Услуги</nuxt-link></li>
      <li class="pl-6" @click="catalog"><nuxt-link to="#" class="flex justify-start items-center hover:text-blue-600 text-black">Каталог</nuxt-link></li>
      <li class="pl-6">Еда</li>
      <li class="pl-6">Журнал</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "LineMenu",
  methods: {
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    }
  }
}
</script>
