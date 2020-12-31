import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import sweetalert from 'sweetalert2';

const axiosInstance = axios.create({
  baseURL:
    process.env.MIX_APP_URL?.replace(/([^/])$/, '$1/') ||
    'http://localhost:8080',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  }
});

axiosInstance.interceptors.request.use((request) => {
  const token = store.getters['auth/token'];

  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const locale = store.getters['lang/locale'];

  if (locale) {
    request.headers.common['Accept-Language'] = locale;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;

    console.log(error.message);

    if (status >= 500) {
      await sweetalert.fire({
        type: 'error',
        title: 'Error',
        text: 'Error',
        reverseButtons: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      });
    }

    if (status === 401 && store.getters['auth/isLogged']) {
      sweetalert
        .fire({
          type: 'warning',
          title: 'Token expired',
          text: 'Token expired',
          reverseButtons: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel'
        })
        .then(async () => {
          await store.dispatch('auth/logout');

          await router.push({ name: 'login' });
        });
    }

    if (status === 403) {
      await sweetalert.fire({
        type: 'error',
        title: 'Unauthorized',
        text: error.message,
        reverseButtons: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      });
    }

    if (
      status >= 400 &&
      status < 500 &&
      status !== 401 &&
      status !== 422 &&
      status !== 404
    ) {
      await sweetalert.fire({
        type: 'error',
        title: 'Error',
        text: error.message,
        reverseButtons: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      });
    }

    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
