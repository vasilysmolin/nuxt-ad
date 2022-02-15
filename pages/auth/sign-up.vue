<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-bold">Регистрация</h1>
      <form class=" w-[95%]">
        <div class="flex justify-center mb-6">
          <div class="form-check form-switch flex flex-col items-center pl-0">
            <label class="form-check-label mb-1.5 inline-block text-sm text-black font-bold" for="flexSwitchCheckChecked">Создать компанию</label>
            <input
                class="form-check-input appearance-none w-9 ml-0 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox" :id="checked" v-model="checked" role="switch">
          </div>
        </div>
        <div class="flex flex-col items-center w-full">
<!--          <div class="form-floating mb-4 w-full sm:w-[27rem]">-->
<!--            <input v-model="phone" type="text" class="form-control-->
<!--        block-->
<!--        w-full-->
<!--        px-3-->
<!--        py-1.5-->
<!--        text-base-->
<!--        font-normal-->
<!--        text-black-->
<!--        bg-[#EFF0F6] bg-clip-padding-->
<!--        border border-solid border-[#EFF0F6]-->
<!--        rounded-lg-->
<!--        transition-->
<!--        ease-in-out-->
<!--        m-0-->
<!--        focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInput"-->
<!--                   placeholder="Ваш телефон">-->
<!--            <label for="floatingInput" class="text-[#6E7191]">Ваш телефон</label>-->
<!--          </div>-->

          <div class="form-floating mb-5 w-full sm:w-[27rem]">
            <input v-model="email" type="email" class="form-control
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
                   placeholder="Ваша почта">
            <label for="floatingPassword" class="text-[#6E7191]">Ваша почта</label>
          </div>
          <div class="form-floating mb-5 w-full sm:w-[27rem]">
            <input type="password" v-model="password" class="form-control
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
                   placeholder="Ваша почта">
            <label for="floatingPassword" class="text-[#6E7191]">Ваш пароль</label>
          </div>
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block px-5 py-4 bg-blue-600 text-white font-bold text-base leading-snug rounded-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              Создать аккаунт
            </button>
          </div>
        </div>
      </form>
      <NuxtLink to="/auth/sign-in" class="my-5 font-bold text-blue-600">Войти в аккаунт</NuxtLink>
      <p class="text-xs text-gray-400 text-center leading-relaxed">Нажимая кнопку «Создать аккаунт», вы даёте своё согласие на обработку персональных данных в соответствии с «<nuxt-link to="" class="text-blue-600">Политикой конфиденциальности</nuxt-link>» и соглашаетесь с «<nuxt-link to="" class="text-blue-600">Условиями оказания услуг</nuxt-link>».</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      checked: false,
      phone: '',
      password: '',
      from: process.env.DEFAULT_DOMAIN_REDIRECT,
    }
  },
  mounted() {
    if (this.$route.query.from) {
      this.from = this.$route.query.from
    }
  },
  methods: {
    submitted() {
      this.$axios.$post(`auth/register`, {
        email: this.email,
        checked: this.checked,
        password: this.password
      })
          .then((res) => {
            if(res.access_token) {
              this.$auth.loginWith('laravelJWT', {
                data: {
                  email: this.email,
                  password: this.password
                }
              });
              document.location.href = this.from;
            }
          })
          .catch((error) =>{
            console.error(error)
          });

      }
  },
};
</script>
