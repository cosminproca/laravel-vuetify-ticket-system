import Vue from 'vue';
import Vuetify from 'vuetify';
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate/dist/vee-validate.full.esm';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(Vuetify);
