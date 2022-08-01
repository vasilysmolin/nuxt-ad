<template>

  <section>

    <div v-if="$device.isDesktop" class="mx-auto flex flex-col w-[500px]">
        <h1 class="mb-3 text-xl text-center font-black">Вакансии от компаний</h1>
        <article v-for="vacancy in vacancies" :key="vacancy.id" class="group flex flex-col mt-[15px] rounded-lg bg-white transition duration-150 ease-in-out">
          <NuxtLink :to="getUrl(vacancy)" class="px-4 py-6">
            <h2 class="first-letter:uppercase lowercase font-medium leading-[22px] text-lg group-hover:text-blue-600">{{ vacancy.name }}</h2>
            <h3 class="mt-2 text-base"><span class="pr-1 text-xs">от</span>{{ vacancy.min_price }}<span
                class="pl-1 text-xs">руб.</span></h3>
            <div class="flex justify-between w-full">
              <!--
              <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
              <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Убрать</button>
              -->
            </div>
          </NuxtLink>
        </article>
        <button @click="addItems({skip: vacancies.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
                type="button"
                class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Смотреть дальше
        </button>
    </div>

    <div v-if="$device.isMobile" class="mx-auto flex flex-col w-full">
      <NavLocJobs/>
      <article v-for="vacancy in vacancies" :key="vacancy.id" class="flex flex-col mt-[15px] rounded-lg bg-white">
        <NuxtLink :to="getUrl(vacancy)" class="px-2 py-4">
          <h2 class="first-letter:uppercase lowercase font-bold leading-4 text-sm">{{ vacancy.name }}</h2>
          <h3 class="mt-2 text-sm"><span class=" pr-1 text-xs">от</span>{{ vacancy.min_price }}<span
              class="pl-1 text-xs">руб.</span></h3>
          <div class="flex justify-between w-full">
            <!--
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Убрать</button>
            -->
          </div>
        </NuxtLink>
      </article>
      <button @click="addItems({skip: vacancies.length, state: 'active', expand: 'profile.user', from: 'catalog'})"
              type="button"
              class="m-auto w-[155px] inline-block mt-6 px-2 py-2 border-2 border-blue-600 text-blue-600 font-bold text-sm leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
        Смотреть дальше
      </button>
    </div>

  </section>

</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';
import NavLocJobs from "./NavLocJobs";

export default {
  name: "VList",
  props: {
    type: String,
  },
  async mounted() {
    if (this.vacancies.length === 0) {
      await this.getItems({state: 'active', expand: 'profile.user', from: 'catalog'});
    }
  },
  components: {
    NavLocJobs,
  },
  computed: {
    ...mapGetters({
      vacancies: 'vacancies/vacancies'
    }),

  },
  methods: {
    ...mapActions({
      getItems: 'vacancies/getItems',
      addItems: 'vacancies/addItems',
    }),
    getUrl(vacancy) {
      let cat = `/vacancies/${vacancy.categories ? vacancy.categories.alias : 'none'}`;
      return cat + '/' + `${vacancy.alias}`
    },
  },

}
</script>
