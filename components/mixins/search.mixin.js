import * as _ from "lodash";
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {
            querySearch: null,
            hasItems: false,
        }
    },
    computed: {
        ...mapGetters({
            ads: 'ads/ads',
            services: 'services/services',
            resumes: 'resumes/resumes',
            vacancies: 'vacancies/vacancies',
        }),
    },
   methods: {
       ...mapActions({
           getItemsAds: 'ads/getItems',
           getItemsResumes: 'resumes/getItems',
           getItemsServices: 'services/getItems',
           getItemsVacancies: 'vacancies/getItems',
       }),
       categoryLink(category) {
           const result = this.parentIter(category, category.alias);
           return `/feed${result}`;
       },
       getNameCat(item){
           return item?.categories?.name ?? 'Без категории';
       },
       getUrl(ad) {
           return `${process.env.CATALOG_URL}/feed/alias/${ad.alias}?querySearch=${ad.name}`
       },
       getUrlVacancy(item) {
           return `${process.env.JOBS_URL}/vacancies/alias/${item.alias}?querySearch=${item.name}`
       },
       getUrlResume(item) {
           return `${process.env.JOBS_URL}/resume/alias/${item.alias}?querySearch=${item.name}`
       },
       getUrlServices(item) {
           return `${process.env.USLUGI_URL}/feed/alias/${item.alias}?querySearch=${item.name}`
       },
       hide() {
           this.$modal.hide('GoSearch');
       },
       getSearchQuery() {
           // this.$router.push({ path: '/feed', query: { query: this.query } })
           // this.hide();
           if(this.querySearch) {
               window.location.href = `${process.env.CATALOG_URL}/feed?querySearch=${this.querySearch}`;
           }
       },
       checkEmptyItem(){
           this.hasItems = this.ads.length > 0 || this.services.length > 0 || this.vacancies.length > 0 || this.resumes.length > 0;
       },
       debounceInput: _.debounce(function (e) {
           this.getItemsAds({
               querySearch: this.querySearch,
               take: 3,
           }).then((res) => {
               this.checkEmptyItem();
           }).catch((error) => {
           });
           this.getItemsResumes({
               querySearch: this.querySearch,
               take: 3,
           }).then((res) => {
               this.checkEmptyItem();
           }).catch((error) => {
           });
           this.getItemsVacancies({
               querySearch: this.querySearch,
               take: 3,
           }).then((res) => {
               this.checkEmptyItem();
           }).catch((error) => {
           });
           this.getItemsServices({
               querySearch: this.querySearch,
               take: 3,
           }).then((res) => {
               this.checkEmptyItem();
           }).catch((error) => {
           });
       }, 500)
   }
};