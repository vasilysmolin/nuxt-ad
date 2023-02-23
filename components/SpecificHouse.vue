<template>
  <modal name="SpecificHouse" :min-width="320" :max-width="500" :max-height="400"  width="100%" height="100%" :adaptive="true">
    <section class="flex flex-col justify-center items-center w-full h-full">
      <section class="grid grid-cols-2 gap-16 text-lg">
        <ul class="text-gray-500 leading-10">
          <li>Застройщик</li>
          <li>Срок сдачи</li>
          <li>Этажей в доме</li>
          <li>Тип дома</li>
          <li>Дом элитный</li>
          <li>Отделка</li>
          <li>Парковка</li>
        </ul>
        <ul class="text-black font-medium leading-10">
          <li>СМУ 1</li>
          <li>2 кв. 2027 г.</li>
          <li>9</li>
          <li>Монолитный</li>
          <li>Да</li>
          <li>С отделкой</li>
          <li>Да</li>
        </ul>
      </section>
    </section>
  </modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categories.mixin';

export default {
  name: 'SpecificHouse',
  async mounted() {

  },
  data() {
    return {
      querySearch: null,
    }
  },
  computed: {
  },
  methods: {
    hide() {
      this.$modal.hide('SpecificHouse');
    },
  },
}
</script>
