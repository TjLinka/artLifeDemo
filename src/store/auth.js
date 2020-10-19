/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import backApi from '../assets/backApi';

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
    },
    AUTH_ERROR: (state) => {
      state.auth_request_status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.auth_request_status = '';
      state.is_authorized = false;
      state.agentname = '';
      state.role = '';
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        backApi
          .post('/login', user)
          .then((resp) => {
            const data = JSON.stringify(resp.data);
            const token = resp.data.access_token;
            localStorage.setItem('access_token', data);
            backApi.defaults.headers.common['access-token'] = token;
            commit('AUTH_SUCCESS', resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('access-token');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      commit('AUTH_REQUEST');
      return new Promise((resolve, reject) => {
        backApi
          .post('/register', { data: user })
          .then((resp) => {
            const token = resp.data.token;
            localStorage.setItem('access_token', token);
            backApi.defaults.headers.common['access-token'] = token;
            commit('AUTH_SUCCESS');
            resolve(resp);
          })
          .catch((err) => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('access_token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('access_token');
        delete backApi.defaults.headers.common['access-token'];
        resolve();
      });
    },
  },
  getters: {},
};