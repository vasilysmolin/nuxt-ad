<template>
  <modal name="InviteUserModal" :min-width="320" :max-width="768" :max-height="400" width="100%" height="100%"
         :adaptive="true">
    <section class="flex flex-col justify-center items-center w-full">
      <div class="mt-20 mb-20 w-[75%] text-center">
        <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 text-lg">{{ $t('invite.h1') }}</h1>
        <p class="mt-3 text-sm text-black">{{ $t('invite.selectEmail') }}</p>
        <p class="text-sm text-black">{{ $t('invite.mustEmail') }}</p>
      </div>
      <div>
        <section class="input-group relative flex flex-wrap items-stretch w-full">
          <form class="w-[95%]">
            <div class="flex flex-col items-center w-full">
              <BInput
                  :value="email"
                  type="email"
                  :placeholder="$t('invite.email')"
                  :error="emailErrors"
                  :submitted="submitted"
                  @input="onInputEmail"
              />
              <div class="flex justify-center">
                <button type="button" @click.prevent="submitted"
                        class="btn btn-primary inline-block mt-3 px-5 py-3 bg-blue-900 text-white font-bold text-sm tracking-wider leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-black">
                  {{ $t('invite.button') }}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </section>
  </modal>
</template>

<script>
import NavLocProfile from "~/components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import BInput from "~/components/blocks/BInput";
import Validations from "~/components/mixins/validations.mixin"
import {email, required} from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'InviteUserModal',
  components: {NavLocProfile, BInput},
  layout: 'hub',
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
  computed: {
    ...mapGetters({
      users: 'invitedUsers/users',
    }),
  },
  mounted() {
    this.getUsers({});
  },
  methods: {
    ...mapActions({
      getUsers: 'invitedUsers/getItems',
    }),
    onInputEmail(event) {
      this.email = event;
    },
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.$axios.$get(`users/check-user/${this.email}`).then((res) => {
        if (res.success === false) {
          this.$toast.show({
            type: 'error',
            title: this.$t('invite.user_not_found'),
            message: this.$t('invite.user_not_found'),
          })
        }
        if (res.success === true) {
          this.$axios.$put(`users/add-user/${this.email}`).then((res) => {
            this.getUsers({});
            this.$toast.show({
              type: 'success',
              title: this.$t('invite.user_added'),
              message: this.$t('invite.user_added'),
            });
            this.$modal.hide('InviteUserModal');
          }).catch((error) => {
            // console.log(error.response.data.errors);
            // this.$v.nameErrors = 'какой-то текст';
          });

        }

      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    },
  },
}
</script>
