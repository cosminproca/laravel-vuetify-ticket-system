import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';

import '@/components';
import '@/layouts';

import App from '@/components/App.vue';

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
