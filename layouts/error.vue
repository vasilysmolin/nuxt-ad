<template>
  <section>
    <div v-if="error.statusCode === 404" class="container flex flex-col items-center mt-[100px]">
      <h1 class="mb-3 w-full text-xl text-black font-black text-center leading-none truncate">
        404<br/>{{ $t('errors.not_found') }}</h1>
      <NuxtLink class="my-5 font-bold text-blue-600" to="/">{{ $t('errors.go_to_home') }}</NuxtLink>
    </div>
    <div v-else-if="error.statusCode === 403" class="container flex flex-col items-center mt-[100px]">
      <h1 class="mb-3 w-full text-xl text-black font-black text-center leading-none truncate">
        403<br/>{{ $t('errors.permission_denied') }}</h1>
      <NuxtLink class="my-5 font-bold text-blue-600" to="/">{{ $t('errors.go_to_home') }}</NuxtLink>
    </div>
    <div v-else class="container flex flex-col items-center mt-[100px]">
      <h1 class="mb-3 w-full text-xl text-black font-black text-center leading-none truncate">
        500<br/>{{ $t('errors.ops') }}</h1>
      <NuxtLink class="my-5 font-bold text-blue-600" to="/">{{ $t('errors.go_to_home') }}</NuxtLink>
    </div>
  </section>

</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
