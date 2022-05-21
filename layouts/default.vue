<template>
  <main>
    <header class="fixed flex justify-between items-center top-0 w-full bg-[#F7F7FC] px-5 py-3 z-50">
      <div @click.prevent="toggleGBlock" v-click-outside="closeG" class="flex justify-center items-center globalnav">
        <GlobalNav />
        <GlobalNavWin :toggleG="isHiddenG"/>
        <span class="pl-2 font-bold">Меню</span>
      </div>
      <TLogo/>
      <div @click.prevent="toggleBlock" v-click-outside="close" class="flex justify-center items-center usernav">
        <UserNav/>
        <UserNavWin :toggle="isHidden" @toggleBlocks="toggleBlocks" />
        <span class="pl-2 font-bold">Вход</span>
      </div>
    </header>
    <Nuxt/>
    <footer class="fixed flex justify-between items-center bottom-0 w-full px-5 py-1 bg-[#F7F7FC]">
      <div class="flex justify-center items-center">
        <GlobalSearch/>
        <span class="pl-2 font-bold">Поиск</span>
      </div>
      <button @click="linkHub" type="button"
              class="btn btn-primary inline-block mt-1 px-7 py-4 bg-green-700 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
        Разместить
      </button>
      <div class="flex justify-center items-center">
        <GlobalConfigure/>
        <span class="pl-2 font-bold">Фильтр</span>
      </div>
    </footer>
  </main>

</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
import GlobalNavWin from "../components/GlobalNavWin";
import GlobalSearch from "../components/icons/GlobalSearch";
import GlobalConfigure from "../components/icons/GlobalConfigure";

export default {
  components: {
    GlobalSearch,
    GlobalNavWin,
    UserNavWin,
    TLogo,
    GlobalNav,
    UserNav,
    GlobalConfigure
  },
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
    linkHub() {
      var host = window.location.host
      var subdomain = host.split('.')[0];
      // console.log(subdomain);
      // var pathArray = window.location.pathname.split('/');
      // console.log(pathArray);
      if(this.$auth.loggedIn) {
        if(subdomain === 'catalog') {
          document.location.href = `${process.env.HUB_URL}/catalog/new`;
        } else if(subdomain === 'jobs') {
          document.location.href = `${process.env.HUB_URL}/profile`;
        }
      } else {
        document.location.href = `${process.env.AUTH_URL}?from=${process.env.HUB_URL}/catalog/new`;
      }
    },
  }
}
</script>
