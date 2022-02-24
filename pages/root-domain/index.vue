<template>
  <section class="container flex justify-center items-center mt-[100px]">
    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <p class="mb-5 leading-none text-xl font-normal leading-7">
        Привет &mdash; это Тапиго. Сейчас мы занимаемся запуском наших сервисов в абсолютно новом формате. Изменения и доступность сервисов происходят каждый день, поэтому если вы видите этот текст &mdash; значит всё в порядке: какие-то из сервисов уже доступны для просмотра.
      </p>
      <p class="mb-5 leading-none text-xl font-normal leading-7">В самое ближайшее время мы полностью обновим всю структуру Тапиго и обязательно пришлём вам об этом уведомление.</p>
      <h2 class="text-xl font-medium">Уже доступны:</h2>
      <ul class="mt-3 pl-5 marker:text-gray-300 list-disc text-2xl text-gray-400 font-medium">
        <li class="leading-10"><nuxt-link to="/auth/sign-in" class="text-blue-600">Личный кабинет</nuxt-link></li>
        <li class="leading-10" @click="vacancies"><nuxt-link to="" class="text-blue-600">Вакансии</nuxt-link></li>
        <li class="leading-10" @click="resume"><nuxt-link to="" class="text-blue-600">Резюме</nuxt-link></li>
        <li class="leading-10">Услуги</li>
        <li class="leading-10">Каталог</li>
        <li class="leading-10">Еда</li>
        <li class="leading-10">Журнал</li>
      </ul>
    </article>
  </section>
</template>

<script>
export default {

  methods: {
    vacancies() {
      document.location.href = process.env.JOBS_URL + '/vacancies';
    },
    resume() {
      document.location.href = process.env.JOBS_URL + '/resume';
    }
  }
}
</script>
