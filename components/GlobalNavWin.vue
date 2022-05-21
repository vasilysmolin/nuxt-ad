<template>
  <div v-show="toggleG" class="absolute top-4 left-4 w-[230px] pl-12 py-2 bg-white rounded-lg shadow-lg z-60">
    <ul class="pb-5 w-full text-sm font-black text-[18px] list-disc text-gray-300">
      <li class="pt-6" @click="jobs"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600 text-black">Работа</nuxt-link></li>
      <li class="pt-6" @click="uslugi"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600 text-black" >Услуги</nuxt-link></li>
      <li class="pt-6" @click="catalog"><nuxt-link to="#" class="flex justify-start items-center hover:text-blue-600 text-black">Каталог</nuxt-link></li>
      <li class="pt-6">Еда</li>
      <li class="pt-6">Журнал</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GlobalNavWin",
  props: {
    toggleG: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bool: false
    }
  },
  methods: {
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    },
  }
}
</script>
