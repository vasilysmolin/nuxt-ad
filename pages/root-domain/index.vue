<template>
  <section class="container flex flex-col justify-center items-center mt-[80px] pb-[100px]">
    <h1 class="px-5 text-3xl text-center font-black">Привет &mdash; это Тапиго<span class="mt-2 block font-normal text-gray-600 text-xl">Каталог обьявлений, вакансии и резюме, поиск исполнителя, доставка еды и создание ресторана.</span></h1>

    <p @click="linkHub">
      <nuxt-link to="" class="btn btn-primary inline-block my-8 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
      </nuxt-link>
    </p>

    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Вакансии для компаний</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Создавайте неограниченное количество бесплатных вакансий для своей компании. Делегируйте контроль или размещение своему представителю.</p>
      <p class="mt-3 font-bold" @click="vacancies"><nuxt-link to="" class="text-blue-600">Смотреть вакансии</nuxt-link></p>
    </article>

    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Резюме для поиска работы</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Размещайте без ограничений бесплатные резюме для поиска работы. Получайте приглашения на собеседования сразу на Тапиго.</p>
      <p class="mt-3 font-bold" @click="resume"><nuxt-link to="" class="text-blue-600">Смотреть резюме</nuxt-link></p>
    </article>

    <article class="flex flex-col items-start mt-6 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Поиск исполнителя</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Забить гвоздь, помыть и убрать помещение, отремонтировать бытовую технику, починить электронику, муж на час и многое другое.</p>
      <p class="mt-3 font-bold" @click="uslugi"><nuxt-link to="" class="text-blue-600">Найти исполнителя</nuxt-link></p>
    </article>

    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Каталог обьявлений</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Бесплатный каталог почти по всем направлениям &mdash; продать или купить, найти работу или подработку, хэндмэй и барахолка.</p>
      <p class="mt-3 font-bold" @click="catalog"><nuxt-link to="" class="text-blue-600">Смотреть обьявления</nuxt-link></p>
    </article>

    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Доставка еды</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Создавайте свои рестораны и оформляйте заказы или доставку еды без зависимости от внешних платформ и ненужных комиссий.</p>
      <p class="mt-3 text-gray-400">Скоро для компаний и заказов</p>
    </article>

  </section>
</template>

<script>
export default {

  methods: {
    linkHub() {
      var host = window.location.host
      if(this.$auth.loggedIn) {
          document.location.href = `${process.env.HUB_URL}/profile`;
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    vacancies() {
      document.location.href = process.env.JOBS_URL + '/vacancies';
    },
    resume() {
      document.location.href = process.env.JOBS_URL + '/resume';
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    }
  }
}
</script>
