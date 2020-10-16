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
    path: '/ball-history',
    name: 'BallHistory',
    component: () => import('../views/BallHistory.vue'),
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
