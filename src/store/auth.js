import backApi from '../assets/backApi';

export default {
  state: {
    auth_status: '',
    is_authorized: localStorage.getItem('access_token'),
    acces_token: localStorage.getItem('access_token') || '',
    role: undefined,
    name: undefined,
  },
  mutations: {},
  actions: {
    loggining(state, user) {
      console.log('hello', user);
      return new Promise((resolve, reject) => {
        backApi
          .post('/login', JSON.stringify(user))
          .then((repsonse) => {
            const accessToken = repsonse.data.access_token;
            localStorage.setItem('access_token', accessToken);
            backApi.defaults.headers.post.access_token = accessToken;
            resolve(repsonse);
          })
          .catch((err) => {
            state.auth_status = 'error';
            localStorage.removeItem('access_token');
            delete backApi.defaults.headers.post.access_token;
            reject(err);
          });
      });
    },
  },
  getters: {},
};
