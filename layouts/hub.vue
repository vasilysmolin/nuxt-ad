<template>
  <main>
    <header class="fixed flex justify-between items-center top-0 w-full bg-[#F7F7FC] px-5 py-3 z-50">
      <div @click.prevent="toggleGBlock" v-click-outside="closeG" class="flex justify-center items-center cursor-pointer globalnav">
        <GlobalNav />
        <GlobalNavWin :toggleG="isHiddenG"/>
        <span class="pl-2 font-bold">Меню</span>
      </div>
      <TLogo/>
      <div @click.prevent="toggleBlock" v-click-outside="close" class="flex justify-center items-center cursor-pointer usernav">
        <UserNav/>
        <UserNavWin :toggle="isHidden" @toggleBlocks="toggleBlocks" />
        <span class="pl-2 font-bold">Вход</span>
      </div>
    </header>
    <NavLocProfile/>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
import NavLocProfile from "../components/NavLocProfile";
import GlobalNavWin from "../components/GlobalNavWin";
export default {
  components: {
    GlobalNavWin,
    UserNavWin,
    TLogo,
    GlobalNav,
    NavLocProfile,
    UserNav
  },
  middleware: ['redirect', 'person', 'steps'],
  data() {
    return {
      isHidden: false,
      isHiddenG: false,
      open: false,
    }
  },
  methods: {
    toggleBlocks() {
      this.isHidden = false;
    },
    toggleBlock() {
      if (this.$auth.loggedIn) {
        this.isHidden = !this.isHidden;
        // document.location.href = process.env.HUB_URL + '/profile';
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    toggleGBlock() {
      console.log(this.isHiddenG);
      this.isHiddenG = !this.isHiddenG;
    },
    toggleGBlocks() {
      this.isHiddenG = !this.isHiddenG;
    },
    close() {
      this.isHidden = false;
    },
    closeG() {
      this.isHiddenG = false;
    },

  },


}
</script>
