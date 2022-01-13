/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
// import backApi from '../assets/backApi';

export default {
  namespaced: true,
  state: {
    auth_request_status: '',
    is_authorized: JSON.parse(localStorage.getItem('access_token'))
      ? JSON.parse(localStorage.getItem('access_token')).access_token
      : false,
    access_token: JSON.parse(localStorage.getItem('access_token'))
      ? JSON.parse(localStorage.getItem('access_token')).access_token
      : '',
    agentname: JSON.parse(localStorage.getItem('access_token'))
      ? JSON.parse(localStorage.getItem('access_token')).agentname
      : '',
    role: JSON.parse(localStorage.getItem('access_token'))
      ? JSON.parse(localStorage.getItem('access_token')).role
      : '',
    self_agreementsystem: 1,
    // self_agreementsystem: JSON.parse(localStorage.getItem('access_token'))
    //   ? JSON.parse(localStorage.getItem('access_token')).self_agreementsystem
    //   : '',
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.auth_request_status = 'loading';
    },
    AUTH_UPDATE: (state) => {
      state.auth_request_status = 'update';
    },
    AUTH_SUCCESS: (state, payload) => {
      state.auth_request_status = 'success';
      state.is_authorized = payload.access_token;
      state.access_token = payload.access_token;
      state.agentname = JSON.parse(localStorage.getItem('access_token')).agentname;
      state.role = JSON.parse(localStorage.getItem('access_token')).role;
      state.self_agreementsystem = JSON.parse(localStorage.getItem('access_token')).self_agreementsystem;
    },
    AUTH_ERROR: (state) => {
      state.auth_request_status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.auth_request_status = '';
      state.is_authorized = false;
      state.agentname = '';
      state.role = '';
      state.self_agreementsystem = '';
    },
  },
  actions: {
    login({ commit }, resp) {
      return new Promise((resolve) => {
        commit('AUTH_REQUEST');
        commit('AUTH_SUCCESS', resp.data);
        resolve();
      });
    },
    loginIntegration({ commit }, resp) {
      return new Promise((resolve) => {
        commit('AUTH_REQUEST');
        commit('AUTH_SUCCESS', resp.data);
        resolve(resp);
      });
    },
    register({ commit }, resp) {
      return new Promise((resolve) => {
        commit('AUTH_REQUEST');
        commit('AUTH_SUCCESS', resp.data);
        resolve(resp);
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('access_token');
        resolve();
      });
    },
  },
  getters: {},
};
