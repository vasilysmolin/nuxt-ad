<template>
  <main>
    <header class="fixed grid grid-cols-[80px_1fr_80px] gap-x-9 justify-items-stretch top-0 w-full px-5 py-3 z-50 bg-[#F7F7FC]">
      <div class="flex justify-center items-center cursor-pointer globalnav">
        <span class="pl-2 font-bold text-sm">Меню</span>
      </div>
      <div class="flex justify-center items-center cursor-pointer usernav">
        <span class="pl-2 font-bold text-sm">Войти</span>
      </div>
    </header>
    <Nuxt/>

  </main>

</template>

<script>

export default {
  data() {
    return {
    }
  },
}
</script>
