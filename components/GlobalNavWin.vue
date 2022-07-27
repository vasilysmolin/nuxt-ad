<template>
  <div v-show="toggleG" class="absolute top-4 left-4 w-[230px] py-4 px-3 bg-white rounded-lg shadow-lg z-60">
    <ul class="px-2.5 w-full font-black text-base text-gray-300">
      <li class="py-2 flex flex-row items-center justify-start hover:bg-sky-100 rounded cursor-pointer" @click="catalog">
        <div class="ml-2.5 flex justify-center items-center w-[20px]">
          <IconListServicesIndexCatalog/>
        </div>
        <p class="pl-2.5 flex justify-start items-center text-black">Каталог</p>
      </li>
      <li class="py-2 flex flex-row items-center justify-start hover:bg-sky-100 rounded cursor-pointer" @click="jobs">
        <div class="ml-2.5 flex justify-center items-center w-[20px]">
          <IconListServicesIndexJobs/>
        </div>
        <p class="pl-2.5 flex justify-start items-center text-black">Работа</p>
      </li>
      <li class="py-2 flex flex-row items-center justify-start hover:bg-sky-100 rounded cursor-pointer" @click="uslugi">
        <div class="ml-2.5 flex justify-center items-center w-[20px]">
          <IconListServicesIndexUslugi/>
        </div>
        <p class="pl-2.5 flex justify-start items-center text-black">Услуги</p>
      </li>
      <li class="py-2 flex flex-row items-center justify-start hover:bg-white rounded cursor-default" @click="">
        <div class="ml-2.5 flex justify-center items-center w-[20px]">
          <IconListServicesIndexFood/>
        </div>
        <p class="pl-2.5 flex justify-start items-center text-black">Еда</p>
      </li>
    </ul>
  </div>
</template>

<script>
import IconListServicesIndexCatalog from "./icons/IconListServicesIndexCatalog";
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import IconListServicesIndexFood from "./icons/IconListServicesIndexFood";

export default {
  name: "GlobalNavWin",
  components: {
    IconListServicesIndexFood,
    IconListServicesIndexUslugi, IconListServicesIndexJobs, IconListServicesIndexCatalog
  },
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
