<template>
  <section>
    <div class="container flex flex-col items-center mt-[50px]" v-if="!isPerson()">
      <div class="mb-4 w-full sm:w-[27rem]">
        <select @change="changeAccount($event)" class="form-select form-select-lg mt-2 forms-select">
          <option :value="$auth.user.id" :key="$auth.user.id" :selected="true"
          >
            {{ $auth.user.name }}
          </option>
          <option v-for="item in accounts"
                  :value="item.user_id"
                  :key="item.id"
          >
            {{ getName(item) }}
          </option>
        </select>
      </div>

    </div>
  </section>
</template>

<script>
import NavLocProfile from "~/components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import BInput from "~/components/blocks/BInput";
import _ from "lodash";
import Validations from "~/components/mixins/validations.mixin"
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ChangeAccount',
  components: {NavLocProfile, BInput},
  layout: 'hub',
  head: {
    title: "Смена пользователя",
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
  computed: {
    ...mapGetters({
      accounts: 'users/accounts',
    }),
  },
  mounted() {
    this.getAccounts({});
  },
  methods: {
    ...mapActions({
      getAccounts: 'users/getAccounts',
    }),
    getName(item) {
      return item?.profile?.user?.name;
    },
    changeAccount(event) {
      _.find(this.accounts, event.target.value);
      const user = _.find(this.accounts, function (o) {
        return o.user_id === parseInt(event.target.value);
      });
      this.$axios.$put(`users/change-profile?profile_id=${user.profile_id}&id=${user.user_id}`).then((res) => {
        this.$auth.setUserToken(res.access_token, res.access_token).then(() => {
          // this.$axios.$get(`auth/user`).then((res) => {
          //   this.$auth.setUser(res);
          this.$router.push({name: 'profile___ru'});
          // }).catch((error) => {
          //   // console.log(error.response.data.errors);
          //   // this.$v.nameErrors = 'какой-то текст';
          // });
        });
        // this.$nuxt.refresh();

      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
  },
}

</script>
