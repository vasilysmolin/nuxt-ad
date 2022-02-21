<template>
  <div>
    <NuxtLink :to="`/vacancies`">
      <h1 class="text-3xl font-bold underline">Все вакансии</h1>
    </NuxtLink>

    <h1 class="text-3xl font-bold underline">Создание новой вакансии</h1>

    <div class="form-group">
      <label for="name">Name</label>
      <input type="text"
             id="name"
             class="form-control"
             v-model="data.name">
    </div>
    <div class="form-group">
      <label for="min_price">min_price</label>
      <input type="text"
             id="min_price"
             class="form-control"
             v-model="data.min_price">
    </div>
    <div class="form-group">
      <label for="max_price">max_price</label>
      <input type="text"
             id="max_price"
             class="form-control"
             v-model="data.max_price">
    </div>
    <div class="form-group">
      <label for="address">address</label>
      <input type="text"
             id="address"
             class="form-control"
             v-model="data.address">
    </div>
    <div class="form-group">
      <label for="phone">phone</label>
      <input type="text"
             id="phone"
             class="form-control"
             v-model="data.phone">
    </div>
    <button class="btn btn-primary"
            @click.prevent="submitted">Сохранить
    </button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '',
        min_price: 0,
        max_price: 100,
        address: '',
        phone: '',
        profileID: 2657,
        active: true
      }
    }
  },
  methods: {
    submitted() {
      const res = this.$axios.$post(`vacancies`, this.data);
      console.log(res);
    }
  },
}
</script>
