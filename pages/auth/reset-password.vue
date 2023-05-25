<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <h1 class="mb-5 leading-none text-2xl font-black">{{ $t('auth.resetPassword') }}</h1>
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
          <BInput
              :value="password"
              type="password"
              :placeholder="$t('auth.youPassword')"
              :error="passwordErrors"
              :submitted="submitted"
              @input="onInputPassword"
          />
          <BInput
              :value="passwordConfirmation"
              type="password"
              :placeholder="$t('auth.youPassword')"
              :error="passwordErrors"
              :submitted="submitted"
              @input="onInputPasswordConfirmation"
          />
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block mt-4 px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              {{ $t('auth.resetPassword') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Person from "~/components/mixins/person.mixin";
import Validations from "~/components/mixins/validations.mixin"
import {email, maxLength, minLength, required} from "vuelidate/lib/validators";
import BInput from "~/components/blocks/BInput";

export default {
  name: 'ResetPassword',
  data() {
    return {
      errors: null,
      email: '',
      token: '',
      password: '',
      passwordConfirmation: '',
      from: null,
    }
  },
  components: {BInput},
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
    passwordConfirmation: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(8),
    },
  },
  mounted() {
    if (this.$route.query.from) {
      this.from = this.$route.query.from;
    }
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
    }
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
    }
  },
  computed: {
    linkSignUp() {
      if (this.from) {
        return `/auth/sign-up?from=${this.from}`;
      } else {
        return `/auth/sign-up`;
      }
    }
  },
  mixins: [Person, Validations],
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let data = new FormData();
      data.append('email', this.email);
      data.append('token', this.token);
      data.append('password', this.password);
      data.append('password_confirmation', this.passwordConfirmation);
      this.$axios.$post(`/auth/reset-password`, data).then(() => {
        document.location.href = process.env.HUB_URL;
      }).catch((error) => {

      });
    },
    onInputEmail(event) {
      this.email = event;
    },
    onInputPassword(event) {
      this.password = event;
    },
    onInputPasswordConfirmation(event) {
      this.passwordConfirmation = event;
    },
  },
};
</script>
