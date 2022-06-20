import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'
// const mapKey = process.env.YANDEX_MAP;

const settings = {
    apiKey: '5b650bb0-54a3-4168-a72e-4279464a3711',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}
Vue.use(YmapPlugin, settings);
