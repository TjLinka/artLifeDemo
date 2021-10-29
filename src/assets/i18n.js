import Vue from 'vue';
import VueI18n from 'vue-i18n';
import rus from '../locale/rus.json';
import eng from '../locale/eng.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'ru',
  messages: {
    ru: rus,
    en: eng,
  },
});

export default i18n;
