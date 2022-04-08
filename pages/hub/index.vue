<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <p v-if="isPerson()" class="mb-6 w-full text-base sm:text-lg text-black font-bold text-center leading-none truncate">
          Укажите ИНН компании и телефон</p>


        <p v-else class="mb-6 w-full text-base sm:text-lg text-black font-bold text-center leading-none truncate">
          Укажите ваше имя и телефон</p>
        <form class=" w-[95%]">
          <div class="flex flex-col items-center w-full">
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input  v-on:input="debounceInput" v-model="person.inn" v-if="isPerson()" type="text" class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-black
        bg-[#EFF0F6] bg-clip-padding
        border border-solid border-[#EFF0F6]
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInput"
                     placeholder="ИНН вашей компании">
              <span v-if="phoneErrors" class="caption-2 px-1 pt-s c-error">
            {{ phoneErrors }}
            </span>
              <input v-model="user.name" v-else type="text" class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-black
        bg-[#EFF0F6] bg-clip-padding
        border border-solid border-[#EFF0F6]
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInpuName"
                     placeholder="Ваше имя">
              <label v-if="isPerson()" for="floatingInput" class="text-[#6E7191]">ИНН вашей компании</label>

              <label v-else for="floatingInpuName" class="text-[#6E7191]">Ваше имя</label>
            </div>

            <div class="form-floating w-full sm:w-[27rem]">
              <input v-model="user.phone" type="text" class="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-black
    bg-[#EFF0F6] bg-clip-padding
    border border-solid border-[#EFF0F6]
    rounded-lg
    transition
    ease-in-out
    m-0
    focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingPassword"
                     placeholder="Ваш телефон">
              <label for="floatingPassword" class="text-[#6E7191]">Ваш телефон</label>
            </div>
            <button @click.prevent="submitted"  class="btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
            >Продолжить
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import NavLocProfile from "../../components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import * as _ from 'lodash';
export default {
  name: 'ProfileData',
  components: {NavLocProfile},
  layout: 'step',
  head: {
    title: "Данные пользователя Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [Person],
  data() {
    return {
      user: {
        name: null,
        phone: null,
      },
      person: {
        inn: null,
        name: 'тест',
      },
      filterKey: null,
      phoneErrors: false,
    }
  },
  middleware: ['redirect', 'person'],
  mounted() {
    this.user = _.cloneDeep(this.$auth.user);
    this.person.inn = _.clone(this.getInn());
  },
  methods: {
    submitted() {

      this.user.person = this.person;
      this.$axios.$put(`users/${this.user.id}`, this.user).then(() => {
        const user = this.$auth.fetchUser().then((res) => {
          // console.log(res);
          this.$auth.setUser(res.data);
          this.$router.push({name: 'profile'});
        });

        // });

      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    },
    debounceInput: _.debounce(function (e) {
      this.person.inn = e.target.value;
      // const services = await this.$axios.$get(`services?skip=0&take=25${getParams}`);
      let params = {'inn': this.person.inn}
      this.$axios.$get(`external/find-company?${params}`).then((res) => {
            // console.log(res.data);
            this.phoneErrors = red.data.inn;
        }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    }, 500)
  },
}

</script>
