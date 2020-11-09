import { index, show, store, update, destroy } from '@/api/client/categories';
import { SET_DATA, REMOVE_DATA, SET_MODEL, RESET_MODEL } from '@/utils/store';

const base = {
  name: ''
};

const state = {
  data: {},
  default: { ...base },
  model: { ...base }
};

const getters = {
  dataArray: (state) => Object.values(state.data)
};

const mutations = {
  SET_DATA,
  SET_MODEL,
  RESET_MODEL,
  REMOVE_DATA
};

const actions = {
  async index({ commit }) {
    const res = await index();

    commit('SET_DATA', res.data);

    return res;
  },

  async show({ commit }, id) {
    const res = await show(id);

    commit('SET_MODEL', res.data);

    return res;
  },

  async store({ commit }, form) {
    const res = await store(form);

    commit('SET_MODEL', res.data);

    return res;
  },

  async update({ commit }, form) {
    const res = await update(form);

    commit('SET_MODEL', res.data);

    return res;
  },

  async destroy({ commit }, id) {
    return await destroy(id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
