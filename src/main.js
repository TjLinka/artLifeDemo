import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.filter('localInt', (value) => {
  const formatter = new Intl.NumberFormat('ru');
  if (!value) {
    return '';
  }
  return formatter.format(value);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
