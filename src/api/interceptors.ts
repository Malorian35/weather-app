import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(`Ошибка сервера: ${error.response.status}`);
    } else if (error.request) {
      return Promise.reject('Нет ответа от сервера');
    }
    return Promise.reject(error.message);
  }
);