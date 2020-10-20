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
    meta: { requiresAuth: true },
  },
  {
    path: '/account-detail',
    name: 'AccountDetail',
    component: () => import('../views/AccountDetail.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/points-history',
    name: 'PointsHistory',
    component: () => import('../views/PointsHistory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/bonus-history',
    name: 'BonusHistory',
    component: () => import('../views/BonusHistory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/purchases-history',
    name: 'PurchasesHistory',
    component: () => import('../views/PurchasesHistory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/returns-history',
    name: 'ReturnsHistory',
    component: () => import('../views/ReturnsHistory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sponsorcard',
    name: 'SponsorCard',
    component: () => import('../views/SponsorCard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/client-bonus',
    name: 'ClientBonus',
    component: () => import('../views/ClientBonus.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next(); // всегда так или иначе нужно вызвать next()!
  }
});

export default router;
