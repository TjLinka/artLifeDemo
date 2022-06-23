/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
// import backApi from '../assets/backApi';

export default {
  namespaced: true,
  state: {
    pageTitle: '',
  },
  mutations: {
    pageTitleChange: (state, payload) => {
      state.pageTitle = payload;
    },
  },
  actions: {
    setPageTitle({ commit }, title) {
      commit('pageTitleChange', title);
    },
  },
  getters: {},
};
