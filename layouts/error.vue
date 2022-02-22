<template>
  <div>
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>Ошибка</h1>
    <NuxtLink to="/">Перейти на главную</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
