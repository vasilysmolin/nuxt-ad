<template>
  <section class="mt-7 grid grid-cols-2 gap-5">
    <article class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF4D2]">
      <IconListServicesIndexCatalog/>
      <div>
        <h2 class="text-sm font-black">Объявления</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Продать, купить и многое другое.</h3>
      </div>
    </article>
    <article class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE2E0]">
      <IconListServicesIndexJobs/>
      <div>
        <h2 class="text-sm font-black">Работа</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Бесплатно создавайте вакансии и резюме.</h3>
      </div>
    </article>
    <article class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
      <IconListServicesIndexUslugi/>
      <div>
        <h2 class="text-sm font-black">Услуги</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или предложить услугу.</h3>
      </div>
    </article>
    <article class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFFDCB]">
      <IconListServicesIndexFood/>
      <div>
        <h2 class="text-sm font-black">Еда</h2>
        <h3 class="mt-1 text-[11px] leading-snug">Скоро доставка еды и  создание ресторана.</h3>
      </div>
    </article>

  </section>
</template>

<script>
import IconListServicesIndexCatalog from "./icons/IconListServicesIndexCatalog";
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import IconListServicesIndexFood from "./icons/IconListServicesIndexFood";
export default {
  components: {
    IconListServicesIndexFood,
    IconListServicesIndexUslugi, IconListServicesIndexJobs, IconListServicesIndexCatalog}
}
</script>
