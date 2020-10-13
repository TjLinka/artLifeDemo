import axios from 'axios';

const backApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
});

export default backApi;
