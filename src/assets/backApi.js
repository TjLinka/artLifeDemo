/* eslint-disable class-methods-use-this */
import Axios from 'axios';
// import router from '../router';
// import store from '../store';

class PartnerApi {
  constructor() {
    this.backAPI = Axios.create({
      baseURL: 'http://ab.gleb.team',
      headers: {
        common: {
          'Content-Type': 'application/json',
          'access-token': JSON.parse(localStorage.getItem('access_token'))
            ? JSON.parse(localStorage.getItem('access_token')).access_token
            : '5e2eeb1626c60a4e5313248c7f8a6d0a',
        },
      },
    });
  }

  // Получение данных по Партнёру
  getAgentProfile() {
    return this.backAPI.get('/agent/profile');
  }

  // Получение информации по спонсору
  getSponsorProfile() {
    return this.backAPI.get('/agent/sponsor');
  }

  // РЕФЕРАЛЬНЫЕ ССЫЛКИ
  getReferalLinks() {
    return this.backAPI.get('/agent/reflinks');
  }

  // Дефолтный GET запрос
  get(url, params = {}) {
    return this.backAPI.get(url, params);
  }

  // Дефеолтный пост запрос
  post(url, params = {}) {
    return this.backAPI.post(url, params);
  }
}

const GApi = new PartnerApi();

export default GApi;
