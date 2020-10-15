import Axios from 'axios';

const backAPI = Axios.create({
  baseURL: 'http://95.165.131.51:8020',
  headers: {
    post: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token') || null,
    },
  },
});

// backAPI.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     console.table(backAPI.defaults.headers);
//     console.log(error);
//     if (
//       error.response.data.message === 'invalid token' ||
//       error.response.data.detail === 'Not authenticated'
//     ) {
//       store.dispatch('auth/AUTH_LOGOUT');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   },
// );

export default backAPI;
