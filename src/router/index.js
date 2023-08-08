import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/test-page',
    name: 'TestPage',
    component: () => import('../views/TestPage.vue'),
  },
  {
    path: '/login',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: { requiresGuest: true },
    // Видят все
  },
  {
    path: '/',
    redirect: '/profile',
  },
  // ПРОФИЛЬ
  {
    path: '/profile',
    name: 'Profile',
    redirect: '/profile/personal-data',
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: 'personal-data',
        component: () => import('../views/PersonalData.vue'),
      },
      {
        path: 'marketins-stats',
        component: () => import('../views/MarketinsStats.vue'),
      },
    ],
  },
  // ИЗБРАННОЕ
  {
    path: '/favourites',
    name: 'Favourites',
    redirect: '/favourites/products',
    component: () => import('../views/Favourites.vue'),
    children: [
      {
        path: 'products-list',
        component: () => import('../views/FavouritesProductsList.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/FavouritesProducts.vue'),
      },
    ],
  },
  // КОРЗИНА
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  // ИНТЕРНЕТ-МАГАЗИН
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
  },
  // КАРТОЧКА ТОВАРА
  {
    path: '/product/:id',
    component: () => import('../views/ProductPage.vue'),
  },
  // КАРТОЧКА ПАРТНЁРА
  {
    path: '/partner-card',
    component: () => import('../views/PartnerCard.vue'),
    children: [
      {
        path: 'personal-data',
        component: () => import('../views/PartnerPersonalData.vue'),
      },
      {
        path: 'marketins-stats',
        component: () => import('../views/PartnerMarketinsStats.vue'),
      },
      {
        path: 'structure',
        // component: () => import('../views/PartnerStructure.vue'),
      },
    ],
  },
  // ДИАЛОГИ
  {
    path: '/dialogs',
    component: () => import('../views/Dialogs.vue'),
  },
  // ПРОСМОТР ДИАЛОГА
  {
    path: '/dialog/:id',
    component: () => import('../views/Dialog.vue'),
  },
  // МАРКЕТИНГ ПЛАН MarketingPlan
  {
    path: '/marketing-plan',
    component: () => import('../views/MarketingPlan.vue'),
  },
  // ПРОМОУШЕНЫ
  {
    path: '/promotion',
    component: () => import('../views/Promotion.vue'),
  },
  // РЕФЕРАЛЬНЫЕ ССЫЛКИ
  {
    path: '/referal-links',
    component: () => import('../views/ReferalLinks'),
  },
  // СТРУКТУРА
  {
    path: '/structure',
    component: () => import('../views/Structure.vue'),
  },
  // ИСТОРИЯ БОНУСОВ
  {
    path: '/bonus-history',
    component: () => import('../views/BonusHistory'),
  },
  // ИСТОРИЯ БАЛЛОВ
  {
    path: '/points-history',
    component: () => import('../views/PointsHistory'),
  },
  // ИСТОРИЯ ЗАКАЗОВ
  {
    path: '/orders-history',
    component: () => import('../views/OrdersHistory'),
  },
  // СОЗДАНИЕ НОВОГО ЗАКАЗА
  {
    path: '/new-order',
    component: () => import('../views/NewOrder'),
  },
  {
    path: '/agent/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
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
    path: '/new-purchase',
    name: 'NewPurchase',
    component: () => import('../views/NewPurchase.vue'),
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
  {
    path: '/auth-by-token*',
    name: 'AuthIntegration',
    component: () => import('../views/AuthIntegration.vue'),
  },
  {
    path: '/ref-urls-report/',
    name: 'RefLinksGroup',
    component: () => import('../views/RefLinksGroup.vue'),
  },
  {
    path: '/ref-urls-create/',
    name: 'CreateRefURL',
    component: () => import('../views/CreateRefURL.vue'),
  },
  {
    path: '/ref-urls-update/:id',
    name: 'UpdateRefURL',
    component: () => import('../views/UpdateRefURL.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue'),
  },
  {
    path: '/news/:id',
    name: 'NewsPage',
    component: () => import('../views/NewsPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

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
      // Если авторизировался и еще требуется проверка по Ролям для доступа к странице
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
