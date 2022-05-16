<template>
  <section class="container flex flex-col justify-center items-center mt-[120px] pb-10">
    <h1 class="px-5 text-3xl text-center font-black">Бесплатный каталог<span class="mt-2 block font-normal text-gray-600 text-xl">Продать или купить, найти работу или услуги, большая барахолка и многое другое.</span></h1>

    <p @click="signup">
      <nuxt-link to="" class="btn btn-primary inline-block mt-8 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">Создать аккаунт
      </nuxt-link>
    </p>

    <section class="mt-10 flex justify-between w-full">
      <article class="article-card-catalog-index">
        <h2>Недвижимость</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки.</h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Квартиры</li>
          <li>Комнаты</li>
          <li>Коммерческая недвижимость</li>
          <li>Гаражи и машиноместа</li>
          <li>Офисные помещения</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Вся недвижимость</nuxt-link></li>
        </ul>
      </article>
      <article class="article-card-catalog-index">
        <h2>Услуги</h2>
        <h3 class="text-gray-500">Большоле количество самых разных услуг и предложений &mdash; перевозки, ремонт, мастер на час, клининг, обучение, бухгалтерия.</h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Транспорт и перевозки</li>
          <li>Красота и здоровье</li>
          <li>Ремонт и обслуживание техники</li>
          <li>Организация праздников</li>
          <li>Строительство и ремонт</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Все услуги</nuxt-link></li>
        </ul>
      </article>
    </section>

    <section class="mt-10 flex justify-between w-full">
      <article class="article-card-catalog-index">
        <h2>Дом и сад</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Мебель и интерьер</li>
          <li>Кухонные предметы</li>
          <li>Бытовая техника</li>
          <li>Ремонт и строительство</li>
          <li>Сад и огород</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Весь список</nuxt-link></li>
        </ul>
      </article>
      <article class="article-card-catalog-index bg-[#262338]">
        <h2 class="text-white">Мода и стиль</h2>
        <h3 class="text-gray-400">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3 bg-blue-300">
        <ul class="list-disc list-inside leading-7 text-gray-400">
          <li>Мужской гардероб</li>
          <li>Женский гардероб</li>
          <li>Красота и здоровье</li>
          <li>Пошив одежды и ремонт обуви</li>
          <li>Аксессуары</li>
          <li class="font-bold text-white"><nuxt-link to="/feed">Весь список</nuxt-link></li>
        </ul>
      </article>
    </section>

    <section class="mt-10 flex justify-between w-full">

      <article class="article-card-catalog-index bg-[#FF5858]">
        <h2 class="text-white">Детский мир</h2>
        <h3 class="text-white">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7 text-white">
          <li>Гардероб для мальчиков</li>
          <li>Гардероб для девочек</li>
          <li>Гардероб для новорожденных</li>
          <li>Детская мебель</li>
          <li>Детские товары</li>
          <li class="font-bold text-white"><nuxt-link to="/feed">Весь список</nuxt-link></li>
        </ul>
      </article>

      <article class="article-card-catalog-index">
        <h2>Отдых и спорт</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Все для отдыха</li>
          <li>Коллекционирование</li>
          <li>Охота и рыбалка</li>
          <li>Прокат оборудования</li>
          <li>Спортивная экипировка и инвентарь</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Весь список</nuxt-link></li>
        </ul>
      </article>

    </section>

    <section class="mt-10 flex justify-between w-full">
      <article class="article-card-catalog-index">
        <h2>Животные</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Собаки</li>
          <li>Кошки</li>
          <li>Птицы</li>
          <li>Рыбки и аквариумы</li>
          <li>Зоотовары</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Весь список</nuxt-link></li>
        </ul>
      </article>
      <article class="article-card-catalog-index">
        <h2>Электроника</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Телефоны и аксессуары</li>
          <li>Аудио и видео</li>
          <li>Фотооборудование</li>
          <li>Компьютеры и коплектующие</li>
          <li>Ноутбуки</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Вся электроника</nuxt-link></li>
        </ul>
      </article>
    </section>

    <section class="mt-10 flex justify-between w-full">
      <article class="article-card-catalog-index">
        <h2>Бизнес</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Готовый бизнес</li>
          <li>Оборудование</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Весь бизнес</nuxt-link></li>
        </ul>
      </article>
      <article class="article-card-catalog-index">
        <h2>Работа</h2>
        <h3 class="text-gray-500">Продажа, покупка и аренда любого типа недвижимости - жилая, коммерческая, складские помещения, земельные участки </h3>
        <hr class="my-3">
        <ul class="list-disc list-inside leading-7">
          <li>Резюме</li>
          <li>Вакансии</li>
          <li class="font-bold text-black"><nuxt-link to="/feed">Вся работа</nuxt-link></li>
        </ul>
      </article>
    </section>

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
