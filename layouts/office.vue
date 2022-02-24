<template>
  <main>
    <header class="fixed top-0 flex justify-between items-center w-full bg-[#F7F7FC] px-5 py-4 z-50">
      <GlobalNav/>
      <TLogo/>
      <UserNavRoot/>
      <RootNavWin/>
    </header>
    <Nuxt/>
  </main>
</template>

<script>
import GlobalNav from "../components/icons/GlobalNav";
import TLogo from "../components/icons/TLogo";
import UserNavRoot from "../components/icons/UserNavRoot";
import RootNavWin from "../components/RootNavWin";
export default {
  components: {RootNavWin, TLogo, GlobalNav, UserNavRoot}
}
</script>
