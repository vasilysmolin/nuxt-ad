<template>
  <section>

    <div v-if="$device.isDesktop" class="mt-10 flex flex-row justify-between items-center w-full">
      <article @click="linkToNeed" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFF1C8] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE38E]">
        <IconListServicesUslugiSeek/>
        <div>
          <h2 class="mt-4 text-xl font-black">Ищу исполнителя</h2>
          <h3 class="mt-1 text-[13px] leading-normal">Поиск исполнителя для выполнения заказа</h3>
        </div>
      </article>
      <article @click="linkToMy" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFE3BA] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FECC82]">
        <IconListServicesUslugiSuggest/>
        <div>
          <h2 class="mt-4 text-xl font-black">Предлагаю услугу</h2>
          <h3 class="mt-1 text-[13px] leading-normal">Размещение своих услуг для поиска клиента</h3>
        </div>
      </article>
    </div>

    <div v-if="$device.isMobile" class="mt-7 grid grid-cols-2 gap-6">
      <article @click="linkToNeed" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF1C8]">
        <IconListServicesUslugiSeek/>
        <div>
          <h2 class="text-base font-black">Ищу</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Поиск исполнителя для выполения заказа</h3>
        </div>
      </article>
      <article @click="linkToMy" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE3BA]">
        <IconListServicesUslugiSuggest/>
        <div>
          <h2 class="text-base font-black">Предлагаю</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Размещение услуг для поиска клиента </h3>
        </div>
      </article>
    </div>

  </section>
</template>

<script>
import IconListServicesUslugiSeek from "./icons/IconListServicesUslugiSeek";
import IconListServicesUslugiSuggest from "./icons/IconListServicesUslugiSuggest";
export default {
  components: {
    IconListServicesUslugiSeek,
    IconListServicesUslugiSuggest,
  },
  methods: {
    linkToMy() {
      document.location.href = `${process.env.USLUGI_URL}/feed?type=my`;
    },
    linkToNeed() {
      document.location.href = `${process.env.USLUGI_URL}/feed?type=need`;
    },
  }
}
</script>
