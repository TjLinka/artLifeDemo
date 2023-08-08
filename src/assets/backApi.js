/* eslint-disable class-methods-use-this */
import Axios from 'axios';
// import router from '../router';
// import store from '../store';

class PartnerApi {
  constructor() {
    this.backAPI = Axios.create({
      baseURL: 'http://162.55.80.164:8017',
      headers: {
        common: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(localStorage.getItem('access_token'))
            ? `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`
            : null,
          'access-token': JSON.parse(localStorage.getItem('access_token'))
            ? `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`
            : null,
        },
      },
    });
  }

  // Получение данных по Партнёру
  getAgentProfile() {
    return this.backAPI.get('/agent/profile');
  }

  // Получение всех периодов
  getAllPeriods() {
    return this.backAPI.post('/api/Misc/get-comdte-list');
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

  delete(url, params = {}) {
    return this.backAPI.delete(url, params);
  }
}

const GApi = new PartnerApi();

export default GApi;
