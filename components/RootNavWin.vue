<template>
  <div class="absolute top-4 right-4 w-[280px] p-7 bg-white rounded-lg shadow-lg z-60">
    <div class="flex justify-start w-full pb-5">
      <p class="text-sm font-bold"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><UserNavRoot/><span class="pl-4">Администратор</span></nuxt-link></p>
    </div>
    <hr>
    <ul class="pb-5 w-full text-sm font-bold">
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><ConfigurePanel/><span class="pl-4">Панель управления</span></nuxt-link></li>
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><AddManager/><span class="pl-4">Добавить офис-менеджера</span></nuxt-link></li>
      <!-- для физ лица
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><UserLLC/><span class="pl-4">Стать компанией</span></nuxt-link></li>
      -->
      <li class="pt-5"><nuxt-link to="" class="flex justify-start items-center hover:text-blue-600"><EditPass/><span class="pl-4">Изменить пароль</span></nuxt-link></li>
    </ul>
    <hr>
    <div class="flex justify-start w-full pt-5">
      <button class="flex justify-start items-center text-sm font-bold hover:text-blue-600"><Logout/><span class="pl-4">Выйти из аккаунта</span></button>
    </div>
  </div>
</template>

<script>
import ConfigurePanel from "./icons/ConfigurePanel";
import EditPass from "./icons/EditPass";
import Logout from "./icons/Logout";
import UserNavRoot from "./icons/UserNavRoot";
import UserNav from "./icons/UserNav";
import AddManager from "./icons/AddManager";
export default {
  name: "RootNavWin",
  components: {AddManager, UserNav, UserNavRoot, Logout, EditPass, ConfigurePanel},
}

</script>
