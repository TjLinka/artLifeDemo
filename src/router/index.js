import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/myinfo',
    name: 'MyInfo',
    component: () => import('../views/MyInfo.vue'),
  },
  {
    path: '/ls',
    name: 'DvizeniePoLicevomySchety',
    component: () => import('../views/DvizeniePoLicevomySchety.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
