<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">Вход</h1>
      <form class=" w-[95%]">
        <div class="flex flex-col items-center w-full">
          <div class="form-floating mb-4 w-full sm:w-[27rem]">
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
                   placeholder="Ваш телефон">
            <label for="floatingInput" class="text-[#6E7191]">Ваша почта</label>
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
              Войти в аккаунт
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignUp}" class="mt-5 font-bold text-blue-600">Создать аккаунт</NuxtLink>
    </div>
  </div>
</template>

<script>
import Person from "~/components/mixins/person.mixin";
import {maxLength, minLength, numeric, required} from "vuelidate/lib/validators";
export default {
    name: 'SignIn',
  data() {
    return {
      errors: null,
      email: '',
      password: '',
      from: null,
    }
  },
  validations: {
      email: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(3)
      },
      password: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
  },
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
          return 'Ой, вы забыли написать email';
        }

        if (!this.$v.email.maxLength) {
          return 'Превышена длина';
        }
        if (!this.$v.email.minLength) {
          return 'Как вы думаете, вас поймут?';
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
          return 'Ой, вы забыли написать password';
        }

        if (!this.$v.password.maxLength) {
          return 'Превышена длина';
        }
        if (!this.$v.password.minLength) {
          return 'Как вы думаете, вас поймут?';
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    linkSignUp() {
      if(this.from) {
        return `/auth/sign-up?from=${this.from}`;
      } else {
        return `/auth/sign-up`;
      }
    }
  },
  mixins: [Person],
  methods: {
      submitted() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password
          },
        }).then(() => {
          if(this.checkSteps){
            const url = this.from ?? process.env.HUB_URL + '/profile';
            document.location.href = url;
          } else {
            document.location.href = process.env.HUB_URL;
          }

        }).catch(error => {
          this.errors = error.response.data.errors.message;
        });

      },
    },
};
</script>
