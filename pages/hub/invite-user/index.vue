<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]" v-if="isPerson()">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">

        <section class="flex flex-col items-start mb-5 w-[95%] sm:w-[27rem]">
          <article class="flex flex-col w-full">
            <h2 class="mt-2 w-full text-xl text-black font-bold leading-none truncate">Добавить менеджера</h2>
            <p class="mt-3 text-sm text-black">Укажите почту физического лица, которому вы предоставляете статус менеджера вашей компании.</p>
            <p class="mt-3 text-sm text-black font-bold">Аккаунт физического лица должен быть зарегистрирован и активирован на Тапиго.</p>
          </article>
        </section>

        <form class=" w-[95%]">
          <div class="flex flex-col items-center w-full">
            <BInput
                :value="email"
                type="email"
                :placeholder="$t('Email менеджера')"
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
      </div>
      <table class="table-auto mb-2 mt-2">
        <tbody v-for="(item, index) in users" :key="item.id">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import NavLocProfile from "~/components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import BInput from "~/components/blocks/BInput";
import Validations from "~/components/mixins/validations.mixin"
import {email, required} from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'InviteUser',
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

      this.$axios.$get(`check-user/${this.email}`).then((res) => {
        if (res.success === false) {
          this.$toast.show({
            type: 'error',
            title: this.$t('invite.user_not_found'),
            message: this.$t('invite.user_not_found'),
          })
        }
        if (res.success === true) {
          this.$axios.$put(`add-user/${this.email}`).then((res) => {
            this.getUsers({});
            this.$toast.show({
              type: 'success',
              title: this.$t('invite.user_added'),
              message: this.$t('invite.user_added'),
            });
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
