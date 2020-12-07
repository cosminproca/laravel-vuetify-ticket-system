import Vue from 'vue';
import App from './App.vue';

import router from '@/router';
import store from '@/store';

import vuetify from '@/plugins/vuetify';
import '@/plugins/vue-sweetalert2';
import '@/plugins/vee-validate';
import '@/plugins/vue-lodash';
import '@/plugins/vue-quill';
import '@/plugins/vue-meta';

import '@/components';
import '@/layouts';

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
