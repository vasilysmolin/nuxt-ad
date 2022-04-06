<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <p class="mb-6 w-full text-base sm:text-lg text-black font-bold text-center leading-none truncate">Укажите ИНН компании и телефон</p>
        <!--API-ключ  28613d37106b9679c16a2d835943d21480ea0b3e-->
        <!--Секретный ключ  4e7357301477af7f60217e3e447ee8ab10657f69-->

        <!-- для физика
        <p>Укажите ваше имя и телефон</p>
        -->
        <form class=" w-[95%]">
          <div class="flex flex-col items-center w-full">
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text" class="form-control
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
                     placeholder="Ваш телефон">
              <label for="floatingInput" class="text-[#6E7191]">ИНН вашей компании</label>
              <!-- для физика
              <label for="floatingInput" class="text-[#6E7191]">Ваше имя</label>
              -->
            </div>

            <div class="form-floating w-full sm:w-[27rem]">
              <input type="text" class="form-control
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
            <button class="btn btn-primary inline-block mt-6 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
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
export default {
  name: 'ProfileData',
  components: {NavLocProfile},
  layout: 'hub',
  head: {
    title: "Данные пользователя Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      user: {
        name: '',
        phone: '',
        inn: '',
      },
    }
  },
  middleware: ['redirect', 'person'],
  mounted() {
    this.user = this.$auth.user;
  },
  computed: {
    isPerson: {
      get(){
        if(this.user != null && this.user.profile != null) {
          if(this.user.profile.isPerson === true) {
            return true;
          }
        }
        return false;
      },
      set(user){
        return user
      }
    },
    inn: {
      get(){
        if(this.isPerson === true && this.user.profile.person != null) {
          return this.user.profile.person.inn
        }
      },
      set(user){
        return user
      }
    },
  }
}

</script>
