<template>
  <nav class="container mt-[80px] sm:pl-0">
    <ul class="hub-nav flex justify-start sm:justify-center flex-nowrap pb-1 w-full text-sm sm:text-base text-[#6E7191] font-bold">
      <li class="pl-4">
        <NuxtLink to="/profile">Профиль</NuxtLink>
      </li>
      <li v-if="currentPerson" class="pl-4 sm:pl-6">
        <NuxtLink to="/house">Новостройки</NuxtLink>
      </li>
      <li class="pl-4 sm:pl-6">
        <NuxtLink to="/realty">Недвижимость</NuxtLink>
      </li>
      <li class="pl-4 sm:pl-6">
        <NuxtLink to="/catalog">Объявления</NuxtLink>
      </li>
      <li v-if="currentPerson" class="pl-4 sm:pl-6">
        <NuxtLink to="/vacancies">Вакансии</NuxtLink>
      </li>
      <li v-else class="pl-4 sm:pl-6">
        <NuxtLink to="/resume">Резюме</NuxtLink>
      </li>
      <li class="pl-4 sm:pl-6">
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
      </li>
      <li class="px-4 sm:pl-6">
        <NuxtLink to="/rest">Рестораны</NuxtLink>
      </li>

<!--      <li v-if="isPerson === false"  class="pl-4 sm:pl-6">-->
<!--        <NuxtLink to="/eat">Еда</NuxtLink>-->
<!--      </li>-->

    </ul>
  </nav>
</template>


<script>
import Person from "~/components/mixins/person.mixin";
import {mapGetters} from "vuex";

export default {
  name: "NavLocProfile",
  mixins: [Person],
  mounted() {

  },
  computed: {
    ...mapGetters({
      currentPerson: 'currentPerson/isPerson',
    }),
  },
}

</script>

<style scoped>
  a.nuxt-link-exact-active {
    padding-bottom: 3px;
    color: black;
    border-bottom: 2px solid black;
  }
</style>
