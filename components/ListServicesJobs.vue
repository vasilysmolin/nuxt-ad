<template>
  <section>
    <div v-if="$device.isDesktop" class="mt-10 flex flex-row justify-between items-center w-full">
      <article @click="vacancies" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFF2CB] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFE69B]">
        <IconListServicesJobsVacancies/>
        <div>
          <h2 class="mt-4 text-xl font-black">Смотреть вакансии</h2>
          <h3 class="mt-1 text-[13px] leading-normal">Найдите свою работу по вакансиям от компаний. Или как компания создавайте неограниченное количество бесплатных вакансий.</h3>
        </div>
      </article>
      <article @click="resume" class="p-3 flex flex-col rounded-lg w-[366px] bg-[#FFECD1] cursor-pointer transition duration-150 ease-in-out hover:bg-[#FFD9A1]">
        <IconListServicesJobsResume/>
        <div>
          <h2 class="mt-4 text-xl font-black">Найти резюме</h2>
          <h3 class="mt-1 text-[13px] leading-normal">Находите соискателя на должность или размещайте без ограничений бесплатные резюме для поиска работы.</h3>
        </div>
      </article>
    </div>


    <div v-if="$device.isMobile" class="mt-7 flex flex-col justify-start items-start w-full">
      <article @click="vacancies" class="p-3 flex flex-col rounded-lg w-full bg-[#FFF2CB]">
        <IconListServicesJobsVacancies/>
        <div>
          <h2 class="mt-4 text-base font-black">Смотреть вакансии</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Найдите свою работу по вакансиям от компаний. Или как компания создавайте неограниченное количество бесплатных вакансий.</h3>
        </div>
      </article>
      <article @click="resume" class="mt-4 p-3 flex flex-col rounded-lg w-full bg-[#FFECD1]">
        <IconListServicesJobsResume/>
        <div>
          <h2 class="mt-4 text-base font-black">Найти резюме</h2>
          <h3 class="mt-1 text-[11px] leading-snug">Находите соискателя на должность или размещайте без ограничений бесплатные резюме для поиска работы.</h3>
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
import IconListServicesJobsVacancies from "./icons/IconListServicesJobsVacancies"
import IconListServicesJobsResume from "./icons/IconListServicesJobsResume"

export default {
  components: {
    IconListServicesIndexFood,
    IconListServicesIndexUslugi,
    IconListServicesIndexJobs,
    IconListServicesIndexCatalog,
    IconListServicesJobsVacancies,
    IconListServicesJobsResume

  },
  methods: {
    vacancies() {
      document.location.href = `${process.env.JOBS_URL}/vacancies`;
    },
    resume() {
      document.location.href = `${process.env.JOBS_URL}/resume`;
    },
  }
}
</script>
