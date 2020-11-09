import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import tickets from './modules/client/tickets';
import categories from './modules/client/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    tickets,
    categories
  }
});
