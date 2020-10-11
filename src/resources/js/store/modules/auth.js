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
  async login({ commit }, form) {
    try {
      const { data } = await axiosInstance.post('api/login', form);
      commit('SAVE_TOKEN', { token: data.access_token });
    } catch (e) {
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      await axiosInstance.post('api/logout');
      commit('LOGOUT');
    } catch (e) {
      console.log(e);
    }
  },
  async user({ commit }) {
    try {
      const { data } = await axiosInstance.get('api/user');
      commit('SAVE_USER', data);
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
