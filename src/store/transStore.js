export default {
  namespaced: true,
  state: {
    transfertData: [],
    readyTrans: [],
    errorTrans: [],
  },
  mutations: {
    SET_DATA: (state, payload) => {
      // eslint-disable-next-line max-len
      state.transfertData = payload.map((p) => ({ id: p.id, transData: { lo: p.lo, transfert: p.transfer, reserve: p.reserve } }));
      state.readyTrans = [];
    },
    SET_DEFAULT: (state, payload) => {
      // eslint-disable-next-line max-len
      state.transfertData.find((u) => u.id === payload).transData.transfert = state.transfertData.find((u) => u.id === payload).transData.lo;
      state.readyTrans = state.readyTrans.filter((u) => u.id !== payload);
      state.errorTrans = state.errorTrans.filter((u) => u.id !== payload);
    },
    SET_NEW_TRANSFERT: (state, payload) => {
      const user = state.transfertData.find((u) => u.id === payload.userid);
      user.transData.transfert = payload.val;
      if (Number(user.transData.transfert) !== user.transData.lo) {
        console.log(Number(user.transData.transfert) < user.transData.lo + user.transData.reserve);
        // eslint-disable-next-line max-len
        if (!state.readyTrans.find((u) => u.id === payload.userid)) {
          if ((Number(user.transData.transfert) < (user.transData.lo + user.transData.reserve))) {
            state.errorTrans = state.errorTrans.filter((u) => u.id !== payload.userid);
            state.readyTrans.push(user);
          } else {
            state.errorTrans.push(user);
          }
        }
      } else {
        state.errorTrans = state.errorTrans.filter((u) => u.id !== payload.userid);
        state.readyTrans = state.readyTrans.filter((u) => u.id !== payload.userid);
      }
    },
    SET_ALL_DEFAULT: (state) => {
      state.transfertData.forEach((u) => {
        // eslint-disable-next-line no-param-reassign
        u.transData.transfert = u.transData.lo;
      });
      state.readyTrans = [];
      state.errorTrans = [];
    },
    CLEAR_ALL: (state) => {
      state.transData = [];
      state.errorTrans = [];
      state.readyTrans = [];
    },
  },
  actions: {
    setData({ commit }, data) {
      commit('SET_DATA', data);
    },
    setDefault({ commit }, data) {
      commit('SET_DEFAULT', data);
    },
    setNewTransfert({ commit }, data) {
      console.log(data);
      commit('SET_NEW_TRANSFERT', data);
    },
    setAllDefault({ commit }) {
      commit('SET_ALL_DEFAULT');
    },
    clearAll({ commit }) {
      commit('CLEAR_ALL');
    },
  },
  getters: {
    getTransfert: (state) => (id) => state.transfertData.find((t) => t.id === id),
    getReadyMulti: (state) => state.readyTrans,
    getErrorMulti: (state) => state.errorTrans,
  },
};
