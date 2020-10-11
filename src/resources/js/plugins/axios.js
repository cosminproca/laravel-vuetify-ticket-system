import axios from 'axios';
import Vue from 'vue';
import store from '@/store';

const axiosInstance = axios.create({
  baseURL: process.env.MIX_APP_URL.replace(/([^/])$/, '$1/'),
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

axiosInstance.interceptors.request.use((request) => {
  const token = store.state['auth/token'];
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /*  const locale = store.getters['lang/locale'];
    if (locale) {
      request.headers.common['Accept-Language'] = locale;
    }*/

  return request;
});

Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
