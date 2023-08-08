import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import cart from './cart';
import currentPage from './currentPage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    currentPage,
    auth,
    cart,
  },
});
