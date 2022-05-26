<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">Регистрация</h1>
      <form class=" w-[95%]">
        <div class="flex justify-center mb-6">
          <div class="form-check form-switch flex flex-col items-center pl-0">
            <label class="form-check-label mb-1.5 inline-block text-sm text-black font-bold">Создать компанию</label>
            <input
                class="form-check-input appearance-none w-9 ml-0 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox" :id="is_person" v-model="is_person" role="switch">
          </div>
        </div>
        <div class="flex flex-col items-center w-full">
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
    focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInput"
                   placeholder="Ваша почта">
            <label for="floatingPassword" class="text-[#6E7191]">Ваша почта</label>
            <span v-if="emailErrors" class="form-errors">
            {{ emailErrors }}
            </span>
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
            <p>{{ errors }}</p>
            <span v-if="passwordErrors" class="form-errors">
            {{ passwordErrors }}
            </span>
          </div>
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              Создать аккаунт
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignIn}" class="my-5 font-bold text-blue-600">Войти в аккаунт</NuxtLink>
      <p class="text-xs text-gray-400 text-center leading-relaxed">Нажимая кнопку «Создать аккаунт» я соглашаюсь на обработку <nuxt-link to="" class="text-blue-600">персональных данных</nuxt-link>.</p>
    </div>
  </div>
</template>


<script>
import {maxLength, minLength, required, email} from "vuelidate/lib/validators";
export default {
  name: 'SignUp',
  data() {
    return {
      errors: null,
      email: '',
      is_person: false,
      phone: '',
      password: '',
      from: null,
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(6),
    },
  },
  middleware: ['redirectHub'],
  mounted() {
    if(this.$route.query.from) {
      this.from = this.$route.query.from;
    }
  },
  computed: {
    emailErrors: {
      get() {
        if (!this.$v.email?.$dirty) {
          return '';
        }
        if (!this.$v.email.required) {
          return 'Кажется, вы забыли написать email';
        }
        if (!this.$v.email.email) {
          return 'Это не похоже на адрес электронной почты';
        }
        return '';
      },
      set(text) {
        return text;
      }
    },
    passwordErrors: {
      get() {
        if (!this.$v.password?.$dirty) {
          return '';
        }

        if (!this.$v.password.required) {
          return 'Вы забыли указать пароль, без него не создать аккаунт';
        }

        if (!this.$v.password.maxLength) {
          return 'Мы вас уверяем - 25 символов для пароля достаточно';
        }
        if (!this.$v.password.minLength) {
          return 'Придумайте пароль не меньше 6 символов';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },


    linkSignIn() {
      if(this.from) {
        return `/auth/sign-in?from=${this.from}`;
      } else {
        return `/auth/sign-in`;
      }

    }
  },
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$axios.$post(`auth/register`, {
        email: this.email,
        is_person: this.is_person,
        password: this.password
      })
          .then((res) => {
            if(res.access_token) {
              this.$auth.loginWith('laravelJWT', {
                data: {
                  email: this.email,
                  password: this.password
                }
              }).then(() => {
                const url = this.from ?? process.env.HUB_URL + '/profile';
                document.location.href = url;
              });
            }
          })
          .catch(error => {
            this.errors = error.response.data.errors.message;
          });

      },
  },
};
</script>
