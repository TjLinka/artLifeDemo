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

import App from './App.vue';
import router from './router';
import store from './store';

locale.use(lang);
Vue.use(BootstrapVue);
Vue.use(VueMask);
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
  const date = new Date(value);
  // eslint-disable-next-line no-restricted-globals
  if (value === '' || value === null || value === '-') {
    return '-';
  }
  return formatter.format(date);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
