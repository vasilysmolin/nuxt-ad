<template>
  <div class="mt-7 py-6 w-[150px] flex flex-col justify-center items-center rounded-lg border-solid border-[#D9DBE9] border">
    <SearchColor/>
    <span class="pt-2 text-sm font-bold">Быстрый поиск</span>
  </div>
</template>

<script>

import SearchColor from "./icons/SearchColor";
export default {
  name: "SearchColorGlobalMobile",
  components: {SearchColor},
}
</script>
