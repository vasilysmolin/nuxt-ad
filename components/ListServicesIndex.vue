<template>
  <section>
    <div v-if="$device.isDesktop" class="mt-12 flex flex-row flex-wrap w-full justify-between items-center">
      <article @click="catalog" class="px-2 py-3 flex flex-col justify-between rounded-lg w-[165px] h-[140px] bg-[#FFF4D2] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE69B]">
        <IconListServicesIndexCatalog/>
        <div>
          <h2 class="text-base font-black">Объявления</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Продать, купить и многое другое.</h3>
        </div>
      </article>
      <article @click="jobs" class="px-2 py-3 flex flex-col justify-between rounded-lg w-[165px] h-[140px] bg-[#FFE2E0] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFC7C3]">
        <IconListServicesIndexJobs/>
        <div>
          <h2 class="text-base font-black">Работа</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Быстрый поиск работы или соискателя.</h3>
        </div>
      </article>
      <article @click="uslugi" class="px-2 py-3 flex flex-col justify-between rounded-lg w-[165px] h-[140px] bg-[#FFEBCD] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFD598]">
        <IconListServicesIndexUslugi/>
        <div>
          <h2 class="text-base font-black">Услуги</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Найти исполнителя или создать услугу.</h3>
        </div>
      </article>
      <article @click="travel" class="px-2 py-3 flex flex-col justify-between rounded-lg w-[165px] h-[140px] bg-[#F7C9FF] cursor-pointer transition duration-150 ease-in-out hover:bg-[#DF8CED]">
        <IconListServicesIndexTravel/>
        <div>
          <h2 class="text-base font-black">Путешествия</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Самые дешёвые билеты на самолет и отели.</h3>
        </div>
      </article>
      <article class="mt-8 px-2 py-3 flex flex-col justify-between rounded-lg w-[165px] h-[140px] bg-[#FFFDCB]">
        <IconListServicesIndexFood/>
        <div>
          <h2 class="text-base font-black">Еда</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Скоро доставка еды и создание ресторана.</h3>
        </div>
      </article>
    </div>

    <div v-if="$device.isMobile" class="mt-7 grid grid-cols-2 gap-6">
      <article @click="catalog" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFF4D2]">
        <IconListServicesIndexCatalog/>
        <div>
          <h2 class="text-sm font-black">Объявления</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Продать, купить и многое другое.</h3>
        </div>
      </article>
      <article @click="jobs" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE2E0]">
        <IconListServicesIndexJobs/>
        <div>
          <h2 class="text-sm font-black">Работа</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Быстрый поиск работы или соискателя.</h3>
        </div>
      </article>
      <article @click="uslugi" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
        <IconListServicesIndexUslugi/>
        <div>
          <h2 class="text-sm font-black">Услуги</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или создать услугу.</h3>
        </div>
      </article>
      <article @click="travel" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#F7C9FF]">
        <IconListServicesIndexTravel/>
        <div>
          <h2 class="text-base font-black">Путешествия</h2>
          <h3 class="mt-1 text-[12px] leading-snug">Дешёвые билеты на самолет и отели.</h3>
        </div>
      </article>
      <article class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFFDCB]">
        <IconListServicesIndexFood/>
        <div>
          <h2 class="text-sm font-black">Еда</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Скоро доставка еды и создание ресторана.</h3>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import IconListServicesIndexCatalog from "./icons/IconListServicesIndexCatalog";
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import IconListServicesIndexFood from "./icons/IconListServicesIndexFood";
import IconListServicesIndexTravel from "./icons/IconListServicesIndexTravel";
export default {
  components: {
    IconListServicesIndexFood,
    IconListServicesIndexUslugi, IconListServicesIndexJobs, IconListServicesIndexCatalog, IconListServicesIndexTravel},
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
    travel() {
      document.location.href = process.env.TRAVEL_URL;
    },
  }
}
</script>
