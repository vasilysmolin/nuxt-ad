<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Добавить цвет</h1>
        <article>
          <section>
            <form class="w-[95%]">

              <div class="flex flex-col items-center w-full">
                <div class="form-floating mb-4 w-full sm:w-[27rem]">
                  <input type="text"
                         class="form-control forms-input" id="name"
                         placeholder="Название вакансии"
                         v-model="data.name">
                  <label for="name" class="text-[#6E7191]">Название цвета</label>

                </div>
                <div class="form-floating mb-4 w-full sm:w-[27rem]">
                  <input type="text"
                         class="form-control forms-input" id="hash"
                         placeholder="Название вакансии"
                         v-model="data.hash">
                  <label for="name" class="text-[#6E7191]">hash цвета (#ffffff)</label>

                </div>

                <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                        @click.prevent="submitted">Сохранить
                </button>

              </div>
            </form>
          </section>
        </article>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "officeColor",
  layout: 'office',
  async mounted() {
  },
  data() {
    return {
      data: {
        name: null,
        hash: null,
      },
    }
  },
  methods: {
    submitted() {
      let data = new FormData();
      data.append('name', this.data.name);
      data.append('hash', this.data.hash);
      this.$axios.$post(`colors`, data).then(() => {
        this.$router.push({name: 'settings'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    },
  },
}
</script>
