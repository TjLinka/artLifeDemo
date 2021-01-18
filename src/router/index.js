import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: { requiresGuest: true },
    // Видят все
  },
  {
    path: '/',
    name: 'MyInfo',
    component: () => import('../views/AgentInfo.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/agent/:id',
    name: 'AgentInfo',
    component: () => import('../views/AgentInfo.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/myinfoedit',
    name: 'MyInfoEdit',
    component: () => import('../views/MyInfoEdit.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/account-detail',
    name: 'AccountDetail',
    component: () => import('../views/AccountDetail.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/points-history',
    name: 'PointsHistory',
    component: () => import('../views/PointsHistory.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/bonus-history',
    name: 'BonusHistory',
    component: () => import('../views/BonusHistory.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/purchases-history',
    name: 'PurchasesHistory',
    component: () => import('../views/PurchasesHistory.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/returns-history',
    name: 'ReturnsHistory',
    component: () => import('../views/ReturnsHistory.vue'),
    meta: { requiresAuth: true },
    // Видят все
  },
  {
    path: '/sponsorcard',
    name: 'SponsorCard',
    component: () => import('../views/SponsorCard.vue'),
    meta: { requiresAuth: true },
    // Видит только Дистрбьютор +
  },
  {
    path: '/client-bonus',
    name: 'ClientBonus',
    component: () => import('../views/ClientBonus.vue'),
    meta: { requiresAuth: true, requiresRole: 'Клиент' },
    // Видит только Клиент
  },
  {
    path: '/organization-period',
    name: 'OrganizationPeriod',
    component: () => import('../views/OrganizationPeriod.vue'),
    meta: { requiresAuth: true, requiresRole: 'Клиент' },
    // Видят все
  },
  {
    path: '/organization-by-period',
    name: 'OrganizationByPeriod',
    component: () => import('../views/OrganizationByPeriod.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/indicators',
    name: 'Indicators',
    component: () => import('../views/Indicators.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue'),
    meta: { requiresAuth: true },
    // Видит только Дистрибьютор +
  },
  {
    path: '/rights',
    name: 'Rights',
    component: () => import('../views/Rights.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/transfermanagement',
    name: 'TransferManagement',
    component: () => import('../views/TransferManagement.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/transfermanagement/:id',
    name: 'TransferManagement',
    component: () => import('../views/TransferManagement.vue'),
    meta: { requiresAuth: true, requiresRole: 'Дистрибьютор' },
    // Видит только Дистрибьютор +
  },
  {
    path: '/partnerindicators',
    name: 'PartnerIndicators',
    component: () => import('../views/PartnerIndicators.vue'),
    meta: { requiresAuth: true },
    // Видит только Дистрибьютор +
  },
  {
    path: '/partnerindicators/:id',
    name: 'PartnerIndicatorsChild',
    component: () => import('../views/PartnerIndicators.vue'),
    meta: { requiresAuth: true },
    // Видит только Дистрибьютор +
  },
  {
    path: '/change_mail/:mail_hash',
    name: 'MailChange',
    component: () => import('../views/MailChange.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/signup/:signup_hash',
    name: 'RegistrationConfirm',
    component: () => import('../views/RegistrationConfirm.vue'),
  },
  {
    path: '/remind-password/',
    name: 'RemindPassword',
    component: () => import('../views/RemindPassword.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!localStorage.getItem('access_token')) {
//       next({
//         path: '/login',
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // всегда так или иначе нужно вызвать next()!
//   }
// });

router.beforeEach((to, from, next) => {
  // Проверяем, требуется ли авторизация, чтоб пройти дальше по ссылке
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Если требуется, то смотрим на наличее токена
    if (localStorage.getItem('access_token') === null) {
      // Если не залогинен, то отправляем на страницу авторизации
      next({
        path: '/login',
      });
    } else {
      // Если авторизировался и ещё требуется проверка по Ролям для доступа к странице
      const user = JSON.parse(localStorage.getItem('access_token'));
      if (to.matched.some((record) => record.meta.requiresRole)) {
        // Если требуется, смотрим на права доступа
        if (user.role === to.meta.requiresRole) {
          // Если права доступа позволяют перейти по данной ссылке, осуществляем переход по ссылке
          next();
        } else {
          // Если права доступа не разрешают переход по ссылке, то ничего не делаем.
          next({
            path: '/',
          });
        }
      } else {
        // Если не требуется проверка по Ролям для доступа, то осуществляем переход по ссылке
        next();
      }
    }
  } else {
    // Есле не требуется авторизация, то осуществляем переход по ссылке
    // eslint-disable-next-line no-lonely-if
    if (to.matched.some((record) => record.meta.requiresGuest)) {
      if (localStorage.getItem('access_token') === null) {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
