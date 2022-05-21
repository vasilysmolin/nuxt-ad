<template>
  <div v-show="toggle" class="dd absolute top-4 right-4 w-[280px] p-7 bg-white rounded-lg shadow-lg z-60">
    <div class="flex justify-start w-full pb-5">
      <p v-if="isPerson()" class="text-sm font-bold cursor-pointer" @click="hub">
        <a @click="hub" class="flex justify-start items-center hover:text-blue-600">
          <UserLLC/>
          <span class="pl-4">Личный кабинет</span>
        </a>
      </p>

      <p v-else class="text-sm font-bold cursor-pointer">
        <a @click="hub" class="flex justify-start items-center hover:text-blue-600">
          <AddManager/><span class="pl-4">Личный кабинет</span></a>
      </p>

    </div>
    <hr>
    <ul class="pb-5 w-full text-sm font-bold">
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddAcc/><span class="pl-4">Добавить аккаунт</span></nuxt-link></li>
      <li v-if="isPerson()" class="pt-5">
        <nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddManager/>
          <span class="pl-4">Добавить менеджера</span></nuxt-link>
      </li>

      <li v-else class="pt-5">
        <nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><UserLLC/>
          <span class="pl-4">Стать компанией</span></nuxt-link>
      </li>

      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><EditPass/><span class="pl-4">Изменить пароль</span></nuxt-link></li>
      <li class="pt-5" @click.prevent="logout"><nuxt-link  to="#" class="flex justify-start items-center hover:text-blue-600"><Logout/><span class="pl-4">Выйти из аккаунта</span></nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import AddAcc from "./icons/AddAcc";
import AddManager from "./icons/AddManager";
import EditPass from "./icons/EditPass";
import Logout from "./icons/Logout";
import DelAcc from "./icons/DelAcc";
import UserLLC from "./icons/UserLLC";
import UserNav from "./icons/UserNav";
import Person from "~/components/mixins/person.mixin";
export default {
  name: "UserNavWin",
  props: {
    toggle: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserNav,
    UserLLC,
    DelAcc,
    Logout,
    EditPass,
    AddManager,
    AddAcc
  },
  mixins: [Person],
  data() {
    return {
      bool: false
    }
  },
  methods: {
    logout() {
        this.$auth.logout().then(() =>{
          document.location.href = process.env.AUTH_URL;
        });
    },
    hub() {
      document.location.href = process.env.HUB_URL + '/profile';
    },
  }
}

</script>
