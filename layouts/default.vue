<template>
  <main>
    <header class="fixed top-0 flex justify-between items-center w-full bg-[#F7F7FC] px-5 py-4 z-50">
      <GlobalNav/>
      <TLogo/>
      <UserNav/>
      <UserNavWin/>
    </header>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNav from "../components/icons/UserNav";
import UserNavWin from "../components/UserNavWin";
export default {
  components: {UserNavWin, TLogo, GlobalNav, UserNav}
}
</script>
