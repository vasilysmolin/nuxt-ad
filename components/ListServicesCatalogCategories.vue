<template>
  <section>
    <section class="mt-7 grid grid-cols-2 gap-6">
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Недвижимость</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Транспорт</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Животные</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Услуги</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Мода и стиль</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Детский мир</h2>
      </article>
    </section>
    <!-- вставка для перелинка сервисов -->
    <section class="mt-7 grid grid-cols-2 gap-6">
      <article @click="jobs" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFE2E0]">
        <IconListServicesIndexJobs/>
        <div>
          <h2 class="text-sm font-black">Работа</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Бесплатно создавайте вакансии и резюме.</h3>
        </div>
      </article>
      <article @click="uslugi" class="px-2 py-5 flex flex-col justify-between rounded-lg w-[140px] h-[140px] bg-[#FFEBCD]">
        <IconListServicesIndexUslugi/>
        <div>
          <h2 class="text-sm font-black">Услуги</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Найти исполнителя или создать услугу.</h3>
        </div>
      </article>
    </section>
    <!-- -->

    <section class="mt-7 grid grid-cols-2 gap-6">
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Бизнес</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Отдых и спорт</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Дом и сад</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Электроника</h2>
      </article>
      <article @click="" class="px-2 py-4 flex flex-col justify-start rounded-lg w-[140px] bg-[#FFFFFF]">
        <span class="inline-block w-[10px] h-[10px] rounded-full bg-[#D9D9D9]"></span>
        <h2 class="mt-6 text-xs font-bold">Работа</h2>
      </article>
    </section>



  </section>
</template>

<script>
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";

export default {
  name: "ListServicesCatalogCategories",
  components: {
    IconListServicesIndexJobs,
    IconListServicesIndexUslugi
  },
  methods: {
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
  }
}

</script>
