import Axios from 'axios';

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
export default backAPI;
