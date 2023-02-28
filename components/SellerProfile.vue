<template>
  <section>
    <div v-if="$device.isDesktopOrTablet" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[1024px]">
      <div class="mx-auto flex flex-col w-full">
        <nav class="flex justify-start items-center mb-1.5">
          <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
            <li class="leading-6">
              <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Недвижимость</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <NuxtLink :to="`/houses`" class="text-gray-500 hover:text-black">Новостройки</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <NuxtLink :to="`/houses`" class="text-gray-500 hover:text-black">Каталог продавцов</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <p class="text-black">Заправкин</p>
            </li>
          </ul>
        </nav>

        <!--
        Поля для формы Добавить страницу продавца:
        1. Имя продавца (может заполнить, если не заполняет то тащим из хаба юр лица)
        2. Добавить логотип
        3. Добавить обложку страницы
        3. Телефон (может заполнить, если не заполняет тащим из хаба юр лица)
        4. Описание (текстареа с форматированием)
        5. На майлту подвесить надо почту из хаба, в BContactC тоже не пашет, пустое поле при вызове клиента
        -->

        <section class="relative mt-[15px]">

          <!-- Обложка страницы -->
          <figure class=" w-full h-[450px] bg-cover bg-center rounded-lg saturate-50"
                   style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/realty_new_building_index.jpg)">
          </figure>

          <!-- Логотип -->
          <figure class="absolute bottom-32 left-8 w-[100px] h-[100px] bg-cover bg-center rounded bg-transparent z-50" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/images/logo_profile_seller.png)"></figure>

          <h1 class="absolute bottom-12 left-8 p-2 inline-block text-3xl text-black font-black bg-white rounded">Группа компаний Заправкин</h1>
        </section>

        <section class="mt-8 flex justify-between items-center">
          <p class="font-bold text-xl">+7 (342) 270-03-55</p>
          <a href="mailto:" class="text-blue-600">Отправить письмо</a>
        </section>

        <section class="mt-8">
          <h2 class="inline-block font-bold text-xl">О продавце</h2>
          <p class="mt-5 leading-6 text-gray-700">Акционерное общество «Заправкин» образовано в 1963 году как производитель товарной извести. Сегодня основными видами деятельности предприятия являются жилищное строительство, производство строительных материалов для высотного и малоэтажного строительства, продажа жилых и нежилых помещений.</p>
          <p class="mt-5 leading-6 text-gray-700">Списочная численность работников предприятия в настоящее время составляет более 1700 человек — это один из самых крупных коллективов среди строительных организаций Пермского края. Завод обеспечивает работой 27 смежных организаций, на которых трудится около 3500 человек.</p>
        </section>

        <section class="mt-8">
          <h2 class="inline-block font-bold text-xl">Объекты</h2>
          <section class="mt-5 grid grid-cols-2 gap-12">
            <article class="group flex flex-col rounded-lg bg-white transition duration-150 ease-in-out">
              <!--
              <NuxtLink>
              -->
                <section class="flex flex-col">
                  <section class="w-full max-h-[350px]">
                    <img class="w-full rounded-t-lg h-[350px] saturate-50" src="https://storage.yandexcloud.net/backgrounds-images/images/1.jpg" alt="">
                  </section>
                  <section class="flex flex-col px-5 pb-6">
                    <h2 class="mt-2.5 font-black text-2xl">
                      ЖК Лесной рай
                    </h2>
                    <p class="mt-2.5 text-sm text-gray-500">Пермский край, Красновишерск, ул Мира, 9</p>
                    <p class="mt-2 text-sm text-black">Срок сдачи<span class="pl-3"></span>2 кв. 2025 г.</p>
                  </section>
                </section>
              <!--
              </>NuxtLink>
              -->
            </article>
          </section>
          <button type="button"
                  class="btn btn-primary block mx-auto mt-10 px-5 py-2.5 w-[220px] bg-transparent border-2 border-solid border-blue-900 text-blue-900 font-bold text-sm leading-normal rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:border-black hover:text-black">
            Показать все объекты
          </button>
        </section>

      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "SellerProfile",
}
</script>
