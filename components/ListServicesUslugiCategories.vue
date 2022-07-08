<template>
  <section>
    <section class="mt-7 grid grid-cols-2 gap-6">
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
          <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
          <h2 class="mt-6 text-xs font-medium">Ремонт и установка техники</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-medium">Творчество, хобби и рукоделие</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-medium">Перевозки и курьеры</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-medium">Организация мероприятий</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-medium">Ремонт и строительство</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-medium">Артисты</h2>
      </article>
    </section>

    <div class="flex justify-center items-center mt-7 w-full rotate-180">
      <ArrowClick/>
    </div>

  </section>
</template>


<script>
import ArrowClick from "./icons/ArrowClick";
export default {
  name: "ListServicesUslugiCategories",
  components: {ArrowClick}
}

</script>
