<template>
  <div v-show="toggle" class="dd absolute top-4 right-4 w-[280px] px-5 py-4 bg-white rounded-lg shadow-lg z-60">
    <div class="flex justify-start w-full">
      <p v-if="isPerson()" class="w-full text-sm font-bold cursor-pointer pl-3 py-3 bg-white rounded hover:bg-sky-100"
         @click="hub">
        <a @click="hub" class="flex justify-start items-center">
          <UserLLC/>
          <span class="pl-4">Личный кабинет</span>
        </a>
      </p>
      <p v-else class="w-full text-sm font-bold cursor-pointer pl-3 py-3 bg-white rounded hover:bg-sky-100">
        <a @click="hub" class="flex justify-start items-center">
          <AddManager/>
          <span class="pl-4">Личный кабинет</span></a>
      </p>
    </div>
    <hr class="my-3">
    <ul class="pb-0.5 w-full text-sm font-bold">

      <!--      <li class="pl-3 py-3 bg-white rounded hover:bg-sky-100">-->
      <!--        <nuxt-link to="" class="flex justify-start items-center">-->
      <!--          <AddAcc/>-->
      <!--          <span class="pl-4">Добавить аккаунт</span></nuxt-link>-->
      <!--      </li>-->

      <li class="pl-3 py-3 bg-white rounded hover:bg-sky-100">
        <nuxt-link to="/settings" class="flex justify-start items-center">
          <AddAcc/>
          <span class="pl-4">Настройки</span></nuxt-link>
      </li>

      <li v-if="isPerson()" class="pl-3 py-3 bg-white rounded hover:bg-sky-100">
        <nuxt-link to="" class="flex justify-start items-center">
          <AddManager/>
          <span class="pl-4">Добавить менеджера</span></nuxt-link>
      </li>
      <li v-else class="pl-3 py-3 bg-white rounded hover:bg-sky-100">
        <nuxt-link to="" class="flex justify-start items-center">
          <UserLLC/>
          <span class="pl-4">Стать компанией</span></nuxt-link>
      </li>

      <li class="pl-3 py-3 bg-white rounded hover:bg-sky-100">
        <nuxt-link to="" class="flex justify-start items-center">
          <EditPass/>
          <span class="pl-4">Изменить пароль</span></nuxt-link>
      </li>
      <hr class="my-3">
      <li class="pl-3 py-3 bg-white rounded hover:bg-sky-100" @click.prevent="logout">
        <nuxt-link to="#" class="flex justify-start items-center">
          <Logout/>
          <span class="pl-4">Выйти из аккаунта</span></nuxt-link>
      </li>
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
      this.$auth.logout().then(() => {
        document.location.href = process.env.AUTH_URL;
      });
    },
    hub() {
      document.location.href = process.env.HUB_URL + '/profile';
    },
  }
}

</script>
