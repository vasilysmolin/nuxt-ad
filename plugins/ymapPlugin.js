import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const mapKey = process.env.YANDEX_MAP;

const settings = {
  apiKey: mapKey,
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
};
Vue.use(YmapPlugin, settings);
