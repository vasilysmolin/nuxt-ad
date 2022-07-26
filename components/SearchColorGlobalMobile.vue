<template>
  <div class="mt-7 mx-auto py-4 px-2.5 w-full h-auto grid grid-cols-[1fr_24px] place-content-start place-items-center rounded bg-white border-solid border-[#EEEEEE] border">
    <span class="pr-10 text-xs">Найти объявление, работу или услугу</span>
    <GlobalSearch/>
  </div>
</template>

<script>

import SearchColor from "./icons/SearchColor";
import GlobalSearch from "./icons/GlobalSearch";

export default {
  name: "SearchColorGlobalMobile",
  components: {GlobalSearch},
}
</script>
