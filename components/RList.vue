<template>
  <section class="container flex flex-col items-center mt-[10px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="resume in resumes" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="getUrl(resume)">
          <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
          <h3 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">от</span>{{ resume.price }}<span class="pl-1 text-xs">руб.</span></h3>
          <h4 class="mt-1 mb-2.5 text-lg"><span class=" pr-1 text-xs">Контакт</span>{{ getUsername(resume) }}<span class="pl-1 text-xs"></span></h4>
          <div class="flex justify-between w-full">
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить в мой список</button>
            <!--
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Убрать</button>
            -->
          </div>
        </NuxtLink>

        <!--
             <NuxtLink :to="getUrl(resume)">
               <button>Редактировать</button>
             </NuxtLink>
       -->
      </article>
      <button @click="addItems({skip: resumes.length,expand: 'profile.user'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "RList",
  props: {
    type: String,
  },
  async mounted() {
    if (this.resumes.length === 0) {
      await this.getItems({state: 'active',expand: 'profile.user'});
    }
  },
  computed: {
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),

  },
  methods: {
    ...mapActions({
      getItems: 'resumes/getItems',
      addItems: 'resumes/addItems',
    }),
    getUrl(resume) {
      let cat = `/resume/${resume.categories ? resume.categories.alias : 'none'}`;
      return cat + '/' + `${resume.alias}`
    },
    getUsername(resume) {
      return resume?.profile?.user?.name
    },
  },

}
</script>
