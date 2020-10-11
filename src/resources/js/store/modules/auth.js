import axiosInstance from '@/plugins/axios';
import Cookies from 'js-cookie';

const state = {
  user: null,
  token: Cookies.get('token')
};

const getters = {};

const mutations = {
  SAVE_TOKEN(state, { token, remember }) {
    state.token = token;
    Cookies.set('token', token, { expires: remember ? 365 : null });
  },
  SAVE_USER(state, { user }) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    Cookies.delete('token');
  }
};

const actions = {
  async register({ commit }, form) {
    try {
      const { data } = await axiosInstance.post('api/auth/register', form);
      commit('SAVE_TOKEN', { token: data.access_token });

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async login({ commit }, form) {
    try {
      const { data } = await axiosInstance.post('api/auth/login', form);
      commit('SAVE_TOKEN', { token: data.access_token });

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      const { data } = await axiosInstance.post('api/auth/logout');
      commit('LOGOUT');

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async user({ commit }) {
    try {
      const { data } = await axiosInstance.get('api/auth/user');
      commit('SAVE_USER', data);

      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
