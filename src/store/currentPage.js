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
