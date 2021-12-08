import Axios from 'axios';
import router from '../router';
import store from '../store';

const backAPI = Axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    common: {
      'Content-Type': 'application/json',
      'access-token': JSON.parse(localStorage.getItem('access_token'))
        ? JSON.parse(localStorage.getItem('access_token')).access_token
        : null,
    },
  },
});

backAPI.interceptors.response.use((response) => response, (error) => {
  console.log(error.response.data);
  if (error.response.status === 401) {
    store.dispatch('auth/logout');
    router.push('/login');
  }
  return Promise.reject(error);
});

export default backAPI;
