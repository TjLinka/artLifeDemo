import Axios from 'axios';

const backAPI = Axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    post: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token') || null,
    },
  },
});
export default backAPI;
