<template>
  <main>
    <header class="fixed top-0 flex justify-between items-center w-full bg-[#F7F7FC] px-5 py-4 z-50">
      <!--
      <GlobalNav
          :toggleG="isHiddenG"
          @toggleGBlock="toggleGBlock"
      />

      <GlobalNavWin
          :toggleG="isHiddenG"
          @toggleGBlock="toggleGBlock"
      />
      -->
      <TLogo/>
      <LineMenu/>
      <button @click="linkHub" type="button"
              class="btn btn-primary inline-block mt-1 px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
        Разместить бесплатно
      </button>
      <UserNav
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
      <UserNavWin
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
    </header>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
import NavLoc from "../components/NavLocJobs";
import GlobalNavWin from "../components/GlobalNavWin";
import LineMenu from "../components/LineMenu";
export default {
  components: {
    LineMenu,
    GlobalNavWin,
    UserNavWin,
    TLogo,
    GlobalNav,
    NavLoc,
    UserNav
  },
  data() {
    return {
      isHidden: false,
      isHiddenG: false,
      open: false,
    }
  },
  methods: {
    toggleBlock(bool) {
      this.isHidden = bool;
    },
    toggleGBlock(bool) {
      this.isHiddenG = bool;
    },
    linkHub() {
      if(this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/catalog/new`;
      } else {
        document.location.href = `${process.env.AUTH_URL}?from=${process.env.HUB_URL}/catalog/new`;
      }
    },
  },


}
</script>
