<template>
  <h1>Journal</h1>
</template>

<script>
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesJobs from "../../components/ListServicesJobs";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";
import IconListServicesIndexUslugi from "../../components/icons/IconListServicesIndexUslugi";
import IconListServicesIndexCatalog from "../../components/icons/IconListServicesIndexCatalog";

export default {
  components: {
    GoSearchDesktop,
    SearchColorGlobalMobile,
    ListServicesJobs,
    BNewLetters,
    WhatsTapigo,
    IconListServicesIndexUslugi,
    IconListServicesIndexCatalog
  },
  head: {
    title: "Journal",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  methods: {
    linkHub() {
      var host = window.location.host
      if (this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/profile`;
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    showGoSearch() {
      this.$modal.show('GoSearch');
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    },
  }
}
</script>
