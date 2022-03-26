<template>
  <section class="container flex flex-col items-center mt-[20px] pb-10">
    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <article v-for="resume in resumes" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
        <p class="text-sm">{{resume.state}}</p>
        <NuxtLink :to="getUrl(resume)">
          <div class="flex justify-between mt-2 w-full">
            <button class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Редактировать</button>
          </div>
        </NuxtLink>
      </article>
      <button v-if="checkAmount" @click="addItems({status: 'all', skip: resumes.length, from: 'cabinet'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
    <NuxtLink :to="`/resume/new`">
      <button type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Добавить резюме</button>
    </NuxtLink>
  </section>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "RHubList",
  props: {
    type: String,
  },
  async mounted() {
    // if (this.resumes.length === 0) {
      await this.getItems({status: 'all', from: 'cabinet'});
    // }
  },
  computed: {
    ...mapGetters({
      resumes: 'resumes/resumes'
    }),
    checkAmount(){
      return this.resumes.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'resumes/getItems',
      addItems: 'resumes/addItems',
    }),
    getUrl(resume) {
      let cat = `/resume/${resume.categories ? resume.categories.alias : 'none'}`;
      return cat + '/' + `${resume.alias}`
    }
  },

}
</script>
