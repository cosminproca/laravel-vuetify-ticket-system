import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import guest from '@/router/middleware/guest';
import client from '@/router/routes/client';
import admin from '@/router/routes/admin';

const auth = [
  {
    path: '/',
    name: 'login',
    component: pageComponentPath('auth/Login.vue'),
    meta: {
      layout: layouts.GUEST,
      middleware: [guest]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: pageComponentPath('auth/Register.vue'),
    meta: {
      layout: layouts.GUEST,
      middleware: [guest]
    }
  }
];

export default auth.concat(client).concat(admin);
