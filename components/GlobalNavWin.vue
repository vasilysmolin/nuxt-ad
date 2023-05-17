<template>
  <nav itemscope itemtype="https://schema.org/SiteNavigationElement" v-show="toggleG" class="global-nav-win">
    <ul itemprop="about" itemscope itemtype="https://schema.org/ItemList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="realty">
        <div>
          <IconListServicesIndexRealty/>
        </div>
        <span>Недвижимость</span>
        <meta itemprop="name" content="Недвижимость"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="catalog">
        <div>
          <IconListServicesIndexCatalog/>
        </div>
        <span>Каталог</span>
        <meta itemprop="name" content="Каталог"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="jobs">
        <div>
          <IconListServicesIndexJobs/>
        </div>
        <span>Работа</span>
        <meta itemprop="name" content="Работа"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="uslugi">
        <div>
          <IconListServicesIndexUslugi/>
        </div>
        <span>Услуги</span>
        <meta itemprop="name" content="Услуги"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="travel">
        <div>
          <IconListServicesIndexTravel/>
        </div>
        <span>Путешествия</span>
        <meta itemprop="name" content="Путешествия"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ItemList" @click="journal">
        <div>
          <IconListServicesIndexJournal/>
        </div>
        <span>Журнал</span>
        <meta itemprop="name" content="Журнал"/>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconListServicesIndexCatalog from "./icons/IconListServicesIndexCatalog";
import IconListServicesIndexJobs from "./icons/IconListServicesIndexJobs";
import IconListServicesIndexUslugi from "./icons/IconListServicesIndexUslugi";
import IconListServicesIndexFood from "./icons/IconListServicesIndexFood";
import IconListServicesIndexTravel from "./icons/IconListServicesIndexTravel";
import IconListServicesIndexRealty from "./icons/IconListServicesIndexRealty";
import IconListServicesIndexJournal from "./icons/IconListServicesIndexJournal.vue";

export default {
  name: "GlobalNavWin",
  components: {
    IconListServicesIndexJournal,
    IconListServicesIndexRealty,
    IconListServicesIndexTravel,
    IconListServicesIndexFood,
    IconListServicesIndexUslugi, IconListServicesIndexJobs, IconListServicesIndexCatalog
  },
  props: {
    toggleG: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bool: false
    }
  },
  methods: {
    jobs() {
      document.location.href = process.env.JOBS_URL;
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    },
    realty() {
      document.location.href = process.env.REALTY_URL;
    },
    travel() {
      document.location.href = process.env.TRAVEL_URL;
    },
    journal() {
      document.location.href = process.env.JOURNAL_URL;
    },
  }
}
</script>
