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
    path: '/myinfoedit',
    name: 'MyInfoEdit',
    component: () => import('../views/MyInfoEdit.vue'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue'),
  },
  {
    path: '/sponsorcard',
    name: 'SponsorCard',
    component: () => import('../views/SponsorCard.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
