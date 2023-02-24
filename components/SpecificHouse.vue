<template>
  <modal name="SpecificHouse" :min-width="320" :max-width="500" :max-height="400"  width="100%" height="100%" :adaptive="true">
    <section class="flex flex-col justify-center items-center w-full h-full">
      <section class="grid grid-cols-2 gap-16 text-lg">
        <ul class="text-gray-500 leading-10">
          <li>Застройщик</li>
          <li>Срок сдачи</li>
          <li>Этажей в доме</li>
          <li>{{ $t('house.ceiling_height') }}</li>
          <li>Тип дома</li>
          <li>Дом элитный</li>
          <li>Отделка</li>
          <li>Парковка</li>
        </ul>
        <ul class="text-black font-medium leading-10">
          <li>{{ getAgentHouse(house) }}</li>
          <li>{{ getDeadlineHouse(house) }} {{ getDateBuild(house) }} г.</li>
          <li>{{ getAllFloorHouse(house) }}</li>
          <li>{{ house.ceiling_height }}</li>
          <li>{{ getType(house) }}</li>
          <li>{{ getElite(house) }}</li>
          <li>{{ getFinishing(house) }}</li>
          <li>{{ getParking(house) }}</li>
        </ul>
      </section>
    </section>
  </modal>
</template>

<script>
import {mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';

export default {
  name: 'SpecificHouse',
  async mounted() {
  },
  mixins: [CategoriesMixin],
  data() {
    return {
      querySearch: null,
    }
  },
  computed: {
    ...mapGetters({
      house: 'houses/house',
      states: 'states/states',
      finishing: 'finishing/finishing',
      typeHouse: 'typeHouse/typeHouse',
      deadline: 'deadLine/deadLine',
      elite: 'elite/elite',
      parking: 'parking/parking',
    }),
  },
  methods: {
    hide() {
      this.$modal.hide('SpecificHouse');
    },
    getAllFlats(realty) {
      return `/houses/${this.house_id}/new-build`
    },
    getElite(house) {
      return this.elite[house.elite] ?? '';
    },
    getFinishing(house) {
      return this.finishing[house.finishing] ?? '';
    },
    getType(house) {
      return this.typeHouse[house.type] ?? '';
    },
    getDeadline(house) {
      return this.deadline[house.deadline] ?? '';
    },
    getParking(house) {
      return this.parking[house.parking] ?? '';
    },
    getState(realty) {
      return this.states[realty.state];
    },
  },
}
</script>
