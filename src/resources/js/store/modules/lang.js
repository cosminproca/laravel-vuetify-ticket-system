import Cookies from 'js-cookie';

const { locale, locales } = window.config;

const state = {
  locale: Cookies.get('locale') || locale,
  locales: locales
};

const getters = {
  locale: (state) => state.locale,
  locales: (state) => state.locales
};

const mutations = {
  SET_LOCALE(state, { locale }) {
    state.locale = locale;
  }
};

const actions = {
  setLocale({ commit }, { locale }) {
    commit('SET_LOCALE', { locale });

    Cookies.set('locale', locale, { expires: 365 });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
