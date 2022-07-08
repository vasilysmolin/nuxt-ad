<template>
  <section class="mt-7 grid grid-cols-2 gap-6">
    <article @click="" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF1C8]">
      <IconListServicesUslugiSeek/>
      <div>
        <h2 class="text-sm font-black">Ищу</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Поиск исполнителя для выполения заказа</h3>
      </div>
    </article>
    <article @click="" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE3BA]">
      <IconListServicesUslugiSuggest/>
      <div>
        <h2 class="text-sm font-black">Предлагаю</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Размещение услуг для поиска клиента </h3>
      </div>
    </article>

  </section>
</template>

<script>
import IconListServicesUslugiSeek from "./icons/IconListServicesUslugiSeek";
import IconListServicesUslugiSuggest from "./icons/IconListServicesUslugiSuggest";
export default {
  components: {
    IconListServicesUslugiSeek,
    IconListServicesUslugiSuggest
  }
}
</script>
