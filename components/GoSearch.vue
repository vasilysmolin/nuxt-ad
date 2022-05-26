<template>
  <modal name="GoSearch" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <section class="flex justify-center items-center w-full">
      <section class="input-group relative flex flex-wrap items-stretch w-full">
        <input type="text"
               class="form-control relative flex-auto min-w-0 block w-full px-6 py-4 text-base font-bold bg-white bg-clip-padding border border-solid border-blue-900 rounded transition ease-in-out m-0 focus:font-bold focus:outline-none focus:ring-0"
               placeholder="Поиск" aria-label="Поиск" aria-describedby="button-addon2">
        <button
            class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-base tracking-wider rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-black  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button" id="button-addon2">Найти
        </button>
      </section>
    </section>
    <article class="mt-0">
      <ul class="py-4 px-6 w-full leading-9 hidden">
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Квартира на набережной Перми</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Сдаю квартиру</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Большая квартира с огромной кухней</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Сдам комнату в 3-х комнатной квартире</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Сдам квартирантам или студентам</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Уборка в квартирах и домах</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Клининг квартир и офисов</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Удаленная работа не выходя из квартиры</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Удобные и уютные квартиры в новостройках</nuxt-link></li>
        <li><nuxt-link to="" class="text-blue-700 hover:text-black">Деньги под залог квартиры быстро</nuxt-link></li>
      </ul>
    </article>
  </modal>
</template>

<script>
export default {
  name: 'GoSearch',
  methods: {
    hide() {
      this.$modal.hide('GoSearch');
    }
  }
}
</script>
