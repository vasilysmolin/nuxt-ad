<template>
  <div class="mt-7 mx-auto py-4 px-2.5 w-[100%] h-auto grid grid-cols-[1fr_24px] place-content-start items-center rounded bg-[#F7F7FC] border-solid border-gray-400 border">
    <span class="pr-10 text-sm text-[#999999] tracking-wide">Недвижимость, работа, услуги</span>
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
