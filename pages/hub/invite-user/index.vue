<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]" v-if="isPerson()">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">

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
                {{ $t('invite.button') }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import NavLocProfile from "~/components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import BInput from "~/components/blocks/BInput";
import Validations from "~/components/mixins/validations.mixin"
import {email, required} from 'vuelidate/lib/validators';

export default {
  name: 'InviteUser',
  components: {NavLocProfile, BInput},
  head: {
    title: "Приглашение пользователя",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [Person, Validations],
  data() {
    return {
      email: null,
    }
  },
  validations: {
    email: {
      required,
      email
    },
  },

  mounted() {
  },
  methods: {
    onInputEmail(event) {
      this.email = event;
    },
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.$axios.$get(`check-user/${this.email}`).then(() => {
        console.log(1);
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    },
  },
}

</script>
