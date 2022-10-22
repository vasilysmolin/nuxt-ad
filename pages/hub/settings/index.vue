<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">

      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <form class="w-[95%]">
          <div class="flex flex-col items-center w-full">
            <BInput
                v-model="url"
                type="text"
                :error="''"
                :placeholder="$t('profile.feed')"
            />
            <span v-if="urlErrors" class="form-errors">
            {{ urlErrors }}
            </span>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <button type="button" @click.prevent="saveParser"
                      class="inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                {{ $t('profile.confirm') }}
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
import BInput from "~/components/blocks/BInput";
import Person from "~/components/mixins/person.mixin";
import AddInviteModal from "~/components/AddInviteModal";
import DelAcc from "~/components/icons/DelAcc";
import {required, url} from "vuelidate/lib/validators";
import Validations from "~/components/mixins/validations.mixin"

export default {
  name: 'Profile',
  components: {DelAcc, NavLocProfile, BInput, AddInviteModal},
  mixins: [Validations, Person],
  layout: 'hub',
  head: {
    title: "Настройки пользователя Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      url: null,
    }
  },
  validations: {
    url: {
      required,
      url
    },
  },

  middleware: ['redirect', 'person'],
  mounted() {
  },
  computed: {},
  methods: {
    saveParser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$axios.$put(`feeds/${this.url}`).then(() => {
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
    },
  },

}


</script>
