import Vue from 'vue';
import App from '@/components/App.vue';

import router from '@/router';
import store from '@/store';

import vuetify from '@/plugins/vuetify';
import '@/plugins/vee-validate';

import '@/components';
import '@/layouts';

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
