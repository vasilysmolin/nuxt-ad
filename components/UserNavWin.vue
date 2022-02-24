<template>
  <div v-show="tougle" v-click-outside="close" class="absolute top-4 right-4 w-[280px] p-7 bg-white rounded-lg shadow-lg z-60">
    <div class="flex justify-start w-full pb-5">
      <p class="text-sm font-bold" @click="hub">
        <nuxt-link to="" class="flex justify-start items-center hover:text-blue-600">
          <UserLLC/>
          <span class="pl-4">Личный кабинет</span>
        </nuxt-link>
      </p>
      <!-- физик
          <p class="text-sm font-bold"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddManager/><span class="pl-4">Личный кабинет</span></nuxt-link></p>
      -->
    </div>
    <hr>
    <ul class="pb-5 w-full text-sm font-bold">
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddAcc/><span class="pl-4">Добавить аккаунт</span></nuxt-link></li>
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddManager/><span class="pl-4">Добавить менеджера</span></nuxt-link></li>
      <!-- для физ лица
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><UserLLC/><span class="pl-4">Стать компанией</span></nuxt-link></li>
      -->
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><EditPass/><span class="pl-4">Изменить пароль</span></nuxt-link></li>
      <li class="pt-5" @click.prevent="logout"><nuxt-link  to="#" class="flex justify-start items-center hover:text-blue-600"><Logout/><span class="pl-4">Выйти из аккаунта</span></nuxt-link></li>
    </ul>
    <hr>
    <div class="flex justify-start w-full pt-5">
      <button class="flex justify-start items-center text-sm text-[#A0A3BD] font-bold"><DelAcc/><span class="pl-4">Выйти из аккаунта</span></button>
    </div>
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
export default {
  name: "UserNavWin",
  props: {
    tougle: {
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
  data() {
    return {
      bool: false
    }
  },
  methods: {
    logout() {
        this.$auth.logout();
        setTimeout(() => {
          document.location.href = process.env.AUTH_URL;
        });
    },
    close(event) {
      if(event.target.className.baseVal !== 'usernav') {
        this.$emit('toogleBlock', false);
      }
    },
    hub() {
      document.location.href = process.env.HUB_URL;
    },
  }
}

</script>
