<template>
  <section class="flex justify-between mb-2.5 w-[95%] sm:max-w-screen-sm">
    <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-sm"><span class="pr-1">1208</span>размещенных вакансий</span>
    <Configure/>
    <ArrowClick/>
  </section>
</template>

<script>
import Configure from "./icons/Configure";
import ArrowClick from "./icons/ArrowClick";
export default {
  name: "HeaderContentList",
  components: {
    ArrowClick,
    Configure,
  }
}

</script>
