<template>
  <main>
    <header class="fixed top-0 flex justify-between items-center w-full bg-[#F7F7FC] px-5 py-4 z-50">
      <GlobalNav/>
      <TLogo/>
      <UserNav
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
      <UserNavWin
          :toggle="isHidden"
          @toggleBlock="toggleBlock"
      />
    </header>
    <NavLocJobs/>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
import NavLocJobs from "../components/NavLocJobs";
export default {
  components: {
    UserNavWin,
    TLogo,
    GlobalNav,
    NavLocJobs,
    UserNav
  },
  data() {
    return {
      isHidden: false,
      open: false,
    }
  },
  methods: {
    toggleBlock(bool) {
      this.isHidden = bool;
    }
  },


}
</script>
