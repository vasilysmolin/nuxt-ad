<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div v-if="success === false"
         class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">{{ $t('auth.youEmail') }}</h1>
      <form class=" w-[95%]">
        <div class="flex flex-col items-center w-full">
          <BInput
              :value="email"
              type="email"
              :placeholder="$t('auth.youEmail')"
              :error="emailErrors"
              :submitted="submitted"
              @input="onInputEmail"
          />
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              {{ $t('auth.buttonInvite') }}
            </button>
          </div>
        </div>
      </form>
      <NuxtLink :to="{path: linkSignUp}" class="mt-5 font-bold text-blue-600">{{ $t('auth.createAccount') }}</NuxtLink>
      <NuxtLink :to="{path: linkSignIn}" class="mt-5 font-bold text-blue-600">{{ $t('auth.loginInAccount') }}</NuxtLink>
    </div>
    <div v-else>
      <h1 class="mb-5 leading-none text-2xl font-black">{{ $t('auth.inviteReset') }}</h1>
    </div>
  </div>
</template>

<script>
import Person from "~/components/mixins/person.mixin";
import {email, required} from "vuelidate/lib/validators";
import BInput from "~/components/blocks/BInput";
import Validations from "~/components/mixins/validations.mixin"

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
  components: {BInput},
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
  mixins: [Person, Validations],
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
    onInputEmail(event) {
      this.email = event;
    },
  },
};
</script>
