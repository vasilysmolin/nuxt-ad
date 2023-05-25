<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">{{ $t('auth.registerH1') }}</h1>
      <form class=" w-[95%]">
        <div class="flex justify-center mb-6">
          <div class="form-check form-switch flex flex-col items-center pl-0">
            <label class="form-check-label mb-1.5 inline-block text-sm text-black font-bold">{{
                $t('auth.createCompany')
              }}</label>
            <input
                class="form-check-input appearance-none w-9 ml-0 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox" :id="is_person" v-model="is_person" role="switch">
          </div>
        </div>
        <div class="flex flex-col items-center w-full">
          <BInput
              :value="email"
              type="email"
              :placeholder="$t('auth.youEmail')"
              :error="emailErrors"
              :submitted="submitted"
              @input="onInputEmail"
          />
          <BInput
              :value="password"
              type="password"
              :placeholder="$t('auth.youPassword')"
              :error="passwordErrors"
              :submitted="submitted"
              @input="onInputPassword"
          />
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              {{ $t('auth.createAccount') }}
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignIn}" class="my-5 font-bold text-blue-600">{{ $t('auth.loginInAccount') }}</NuxtLink>
      <p class="text-xs text-gray-400 text-center leading-relaxed">{{ $t('auth.personal') }}
        <nuxt-link to="" class="text-blue-600">{{ $t('auth.personalData') }}</nuxt-link>
        .
      </p>
    </div>
  </div>
</template>


<script>
import {email, maxLength, minLength, required} from "vuelidate/lib/validators";
import BInput from "~/components/blocks/BInput";
import Validations from "~/components/mixins/validations.mixin"

export default {
  name: 'SignUp',
  components: {BInput},
  mixins: [Validations],
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
      minLength: minLength(8),
    },
  },
  mounted() {
    if(this.$route.query.from) {
      this.from = this.$route.query.from;
    }
  },
  computed: {
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
                this.$router.push({path: 'lk/ads'});
              });
            }
          })
          .catch(error => {
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
