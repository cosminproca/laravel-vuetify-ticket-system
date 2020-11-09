import Cookies from 'js-cookie';
import { login, logout, register, user } from '@/api/auth';

const state = {
  user: null,
  token: Cookies.get('token')
};

const getters = {
  isLogged: (state) => state.user !== null && !state.user.message,
  userRole: (state) => state.user?.roles[0] ?? null
};

const mutations = {
  SAVE_TOKEN(state, { token, remember }) {
    state.token = token;

    Cookies.set('token', token, {
      expires: remember ? 365 : null
    });
  },
  SAVE_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;

    Cookies.remove('token');
  }
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, form) {
    return await register(form);
  },
  async login({ commit }, form) {
    const res = await login(form);

    commit('SAVE_TOKEN', { token: res.access_token });
    commit('SAVE_USER', res.user);

    return res;
  },
  async logout({ commit }) {
    const res = await logout();
    commit('LOGOUT');

    return res;
  },
  async user({ commit }) {
    const res = await user();
    commit('SAVE_USER', res);

    return res;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
