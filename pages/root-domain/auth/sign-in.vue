<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">{{ $t('auth.loginH1') }}</h1>
      <form class=" w-[95%]">
        <div class="flex flex-col items-center w-full">
          <BInput
              :value="email"
              :placeholder="$t('auth.youEmail')"
              :error="emailErrors"
              :submitted="submitted"
              @input="onInputEmail"
          />
          <BInput
              :value="password"
              :placeholder="$t('auth.youPassword')"
              :error="passwordErrors"
              :submitted="submitted"
              @input="onInputPassword"
          />

          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              {{ $t('auth.login') }}
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignUp}" class="mt-5 font-bold text-blue-600">{{ $t('auth.createAccount') }}</NuxtLink>
      <NuxtLink :to="{path: linkForgotPasswd}" class="mt-5 font-bold text-blue-600">{{
          $t('auth.forgotPassword')
        }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Person from "~/components/mixins/person.mixin";
import {email, required} from "vuelidate/lib/validators";
import BInput from "~/components/blocks/BInput";


export default {
  name: 'SignIn',
  components: {BInput},
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
        email
      },
      password: {
        required,
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
          return this.$t('validation.emailRequired');
        }
        if (!this.$v.email.email) {
          return this.$t('validation.email');
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
          return this.$t('validation.passwordRequired');
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
    linkForgotPasswd() {
      if (this.from) {
        return `/auth/forgot-password?from=${this.from}`;
      } else {
        return `/auth/forgot-password`;
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
    onInputEmail(event) {
      this.email = event;
    },
    onInputPassword(event) {
      this.password = event;
    },
  },
};
</script>
