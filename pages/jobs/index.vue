<template>
  <section class="container flex flex-col justify-center items-center mt-[100px]">
    <article class="flex flex-col items-start px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Вакансии для компаний</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Создавайте неограниченное количество бесплатных вакансий для своей компании. Делегируйте контроль или размещение своему представителю.</p>
      <p class="mt-3 font-bold"><nuxt-link to="/vacancies" class="text-blue-600">Смотреть вакансии</nuxt-link></p>
    </article>

    <article class="flex flex-col items-start mt-4 px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h2 class="font-black text-lg leading-5 sm:text-2xl">Резюме для поиска работы</h2>
      <p class="mt-3 text-sm sm:text-base text-gray-700">Размещайте без ограничений бесплатные резюме для поиска работы. Получайте приглашения на собеседования сразу на Тапиго.</p>
      <p class="mt-3 font-bold"><nuxt-link to="/resume" class="text-blue-600">Смотреть резюме</nuxt-link></p>
    </article>

    <p @click="signup">
    <nuxt-link to="" class="btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
    </nuxt-link>
    </p>

  </section>
</template>

<script>
export default {
  head: {
    title: "Бесплатно создавайте вакансии и резюме без ограничений на Tapigo.ru | Работа",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  methods: {
    signup() {
      document.location.href = process.env.AUTH_URL;
    }
  }
}
</script>
