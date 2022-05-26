<template>
  <modal name="GoSearch" :min-width="320" :max-width="1024" width="95%" height="auto" :adaptive="true">
    <div class="bg-blue-400">
      <div slot="top-right">
        <button @click="$modal.hide('GoSearch')">
          ❌
        </button>
      </div>
      <p>This is my first modal</p>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'GoSearch',
  methods: {
    hide () {
      this.$modal.hide('GoSearch');
    }
  }
}
</script>
