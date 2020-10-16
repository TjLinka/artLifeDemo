import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/',
    name: 'MyInfo',
    component: () => import('../views/MyInfo.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
