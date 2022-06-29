<template>
  <article class="container flex flex-col items-center mt-[100px] pb-10">
    <Breadcrumbs
        :baseName="`Главная`"
        :basePath="`/`"
        :depth="1"
        :link="category"
    />
    <BHead
        :name="service.name"
        :price="service.price"
        :type="types[service.type]"
        :price-from="true"
    />
    <BDescription
        :title="`Описание услуги`"
        :description="service.description"
    />
    <BContact
        :name="getUserName(service)"
        :phone="getUserPhone(service)"
    />
    <BList
        :title="`Дополнительно`"
        :lists="generateList(service)"
    />
  </article>

</template>

<script>
import * as _ from 'lodash';
import {mapActions, mapGetters} from "vuex";
import BHead from "~/components/blocks/BHead";
import BDescription from "~/components/blocks/BDescription";
import BContact from "~/components/blocks/BContact";
import BList from "~/components/blocks/BList";
import Breadcrumbs from "~/components/Breadcrumbs";

export default {
  name: "SObject",
  layout: 'default',
  components: { BHead, BDescription, BContact, BList, Breadcrumbs },
  async asyncData({store, route}) {
    await store.dispatch('typeServices/getItems');
    await store.dispatch('services/getItem', { id: route.params.id, expand: 'profile.user,profile.person'  });
    await store.dispatch('categoriesService/getItem', {id: store.state.services.service.category_id });
    return {
      service: store.state.services.service,
    }
  },
  methods: {
    ...mapActions({
      getItem: 'categoriesService/getItem',
      removeItem: 'categoriesService/removeItem',
    }),
    getUserName(service) {
      if(service?.profile?.isPerson === true) {
        return service?.profile?.person?.name;
      }
      return service?.profile?.user?.name;
    },
    getUserPhone(service) {
      return service?.profile?.user?.phone
    },
    generateList(service) {
      let params = [];
      params.push({name: 'Гарантия', value: service?.guarantee ? 'Да' : 'Нет' });
      params.push({name: 'Договор', value: service?.contract ? 'Да' : 'Нет' });
      params.push({name: 'Консультации', value: service?.consultation ? 'Да' : 'Нет' });
      params.push({name: 'Почасовая оплата', value: service?.hourly_payment ? 'Да' : 'Нет' });
      return params;
    }
  },
  computed: {
    ...mapGetters({
      services: 'services/services',
      category: 'categoriesService/category',
    }),
    types: {
      get() {
        return _.cloneDeep(this.$store.getters['typeServices/types']);
      },
      set(types) {
        return types
      }
    },
  },

  head() {
    return {
      title: `${this.service.title} | Услуги без ограничений на Tapigo.ru | Работа`,
      meta: [
        {hid: 'description', name: 'description', content: 'Обьект'}
      ]
    }
  },
}
</script>
