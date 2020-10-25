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
    component: () => import('../views/AgentInfo.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/agent/:id',
    name: 'AgentInfo',
    component: () => import('../views/AgentInfo.vue'),
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
    path: '/organization-period',
    name: 'OrganizationPeriod',
    component: () => import('../views/OrganizationPeriod.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/organization-by-period',
    name: 'OrganizationByPeriod',
    component: () => import('../views/OrganizationByPeriod.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/transfert',
    name: 'Transfert',
    component: () => import('../views/Transfert.vue'),
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
