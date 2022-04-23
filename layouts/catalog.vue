<template>
  <main>
    <header class="fixed top-0 flex justify-between items-center w-full bg-[#F7F7FC] px-5 py-4 z-50">
      <GlobalNav
          :toggleG="isHiddenG"
          @toggleGBlock="toggleGBlock"
      />
      <GlobalNavWin
          :toggleG="isHiddenG"
          @toggleGBlock="toggleGBlock"
      />
      <TLogo/>
      <UserNav
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
      <UserNavWin
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
      <div class="">
          <button @click="linkHub" type="button"
                  class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
            + Разместить объявление
          </button>
      </div>
    </header>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
import GlobalNavWin from "../components/GlobalNavWin";
export default {
  components: {
    GlobalNavWin,
    UserNavWin,
    TLogo,
    GlobalNav,
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
    }
  },



}
</script>
