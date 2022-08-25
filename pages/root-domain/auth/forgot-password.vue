<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div v-if="success === false"
         class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">Введите вашу почту</h1>
      <form class=" w-[95%]">
        <div class="flex flex-col items-center w-full">
          <div class="form-floating mb-4 w-full sm:w-[27rem]">
            <input v-model="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="form-control
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
                   placeholder="Ваш телефон"/>
            <label for="floatingInput" class="text-[#6E7191]">Ваша почта</label>
          </div>
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              Отправить ссылку на почту
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignUp}" class="mt-5 font-bold text-blue-600">Создать аккаунт</NuxtLink>
      <NuxtLink :to="{path: linkSignIn}" class="mt-5 font-bold text-blue-600">Войти в аккаунт</NuxtLink>
    </div>
    <div v-else>
      <h1 class="mb-5 leading-none text-2xl font-black">Ссылка для восстановления отправлена на почту</h1>
    </div>
  </div>
</template>

<script>
import Person from "~/components/mixins/person.mixin";
import {email, required} from "vuelidate/lib/validators";

export default {
  name: 'ForgotPassword',
  data() {
    return {
      errors: null,
      success: false,
      email: '',
      from: null,
    }
  },
  validations: {
    email: {
      required,
      email
    },
  },
  mounted() {
    if (this.$route.query.from) {
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
    linkSignUp() {
      if (this.from) {
        return `/auth/sign-up?from=${this.from}`;
      } else {
        return `/auth/sign-up`;
      }
    },
    linkSignIn() {
      if (this.from) {
        return `/auth/sign-in?from=${this.from}`;
      } else {
        return `/auth/sign-in`;
      }
    },
  },
  mixins: [Person],
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$axios.$post(`/auth/forgot-password?email=${this.email}`).then(() => {
        // this.$router.push({path: 'auth/res-password'});
        this.success = true;
      });
    },
  },
};
</script>
