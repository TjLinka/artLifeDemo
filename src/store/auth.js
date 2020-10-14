/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import backApi from '../assets/backApi';

export default {
  state: {
    auth_status: '',
    is_authorized: localStorage.getItem('access_token'),
    acces_token: localStorage.getItem('access_token') || '',
    role: undefined,
    name: undefined,
  },
  mutations: {
    test() {
      console.log(this.state);
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        backApi
          .post('/login', user)
          .then((resp) => {
            const token = resp.data.access_token;
            const user = resp.data;
            console.log(user);
            console.log(token);
            localStorage.setItem('access-token', token);
            backApi.defaults.headers.common.access_token = token;
            backApi.get('/secret');
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('access-token');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        backApi
          .post('/register', { data: user })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem('token', token);
            backApi.defaults.headers.common.Authorization = token;
            commit('auth_success', token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        delete backApi.defaults.headers.common.Authorization;
        resolve();
      });
    },
  },
  getters: {},
};
