import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import VueMask from 'v-mask';
import VueTheMask from 'vue-the-mask';
import VueMomentLib from 'vue-moment-lib';
import VueCurrencyInput from 'vue-currency-input';
import InfiniteLoading from 'vue-infinite-loading';

import App from './App.vue';
import router from './router';
import store from './store';

locale.use(lang);

Vue.use(InfiniteLoading, {
  slots: {
    noMore: 'Всё данные загружены', // you can pass a string value
  },
});

const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: 'USD' },
};
Vue.use(VueCurrencyInput, pluginOptions);
Vue.use(BootstrapVue);
Vue.use(VueMomentLib);
Vue.use(VueMask);
Vue.use(VueMask, {
  placeholders: {
    '#': null, // passing `null` removes default placeholder, so `#` is treated as character
    D: /\d/, // define new placeholder
    Я: /[\wа-яА-Я]/, // cyrillic letter as a placeholder
  },
});
Vue.use(VueTheMask);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.filter('localInt', (value) => {
  const formatter = new Intl.NumberFormat('ru');
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    return '-';
  }
  return formatter.format(value);
});
Vue.filter('localDate', (value) => {
  const formatter = new Intl.DateTimeFormat('ru');
  // eslint-disable-next-line no-restricted-globals
  try {
    const date = new Date(value);
    return formatter.format(date);
  } catch {
    return '-';
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
