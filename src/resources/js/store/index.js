import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import lang from './modules/lang';

import client from './modules/client';
import support from './modules/support';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    lang,
    ...client,
    ...support,
    ...admin
  }
});
