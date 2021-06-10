import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import transStore from './transStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    transStore,
    auth,
  },
});
