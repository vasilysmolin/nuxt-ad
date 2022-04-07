<template>
  <section class="container flex flex-col items-center pb-10 mt-20">

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Новые</h1>
      <article v-for="resume in resumesNew" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/jobs/resume/${resume.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(resume.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ resume.id }}</h3>
        </NuxtLink>

      </article>
      <button v-if="checkAmountNew" @click="addItems({skip: resumesNew.length, state: 'new'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>

    <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
      <h1>Активные</h1>
      <article v-for="resume in resumesActive" :key="resume.id" class="flex flex-col mt-[10px] p-3 rounded-lg bg-white">
        <NuxtLink :to="`/jobs/resume/${resume.id}`">
          <h2 class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ resume.name }}</h2>
          <p class="first-letter:uppercase font-bold text-[0.9375rem] leading-5 sm:text-lg">{{ dateFormat(resume.created_at) }}</p>
          <h3 class="mt-1 mb-2.5 text-lg">{{ resume.id }}</h3>
        </NuxtLink>

      </article>
      <button v-if="checkAmount" @click="addItems({skip: resumesActive.length, state: 'active'})" type="button" class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Смотреть дальше</button>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "VAdminList",
  async mounted() {
    if(this.resumesNew.length === 0) {
      await this.getItems({state: 'new'});
    }
    if(this.resumesActive.length === 0) {
      await this.getItems({state: 'active'});
    }

  },
  computed: {
    ...mapGetters({
      resumesNew: 'resumes/resumesNew',
      resumesActive: 'resumes/resumes',
      amount: 'resumes/amount',
      amountNew: 'resumes/amountNew',
    }),
    checkAmountNew(){
      return this.resumesNew.length < this.amountNew;
    },
    checkAmountActive(){
      return this.resumesActive.length < this.amount;
    },

  },
  methods: {
    ...mapActions({
        getItems: 'resumes/getItems',
        addItems: 'resumes/addItems',
      }),
    dateFormat(date) {
      if(date) {
        var dates = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return formatter.format(dates);
      }
    }
  },

}
</script>
