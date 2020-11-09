import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import guest from '@/middleware/guest';

import client from '@/router/routes/client';
import support from '@/router/routes/support';
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
    path: '/forgot-password',
    name: 'forgot.password',
    component: pageComponentPath('auth/ForgotPassword.vue'),
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
  },
  {
    path: '*',
    component: pageComponentPath('errors/PageNotFound.vue'),
    meta: {
      layout: layouts.GUEST,
      middleware: [guest]
    }
  }
];

export default auth.concat(client).concat(support).concat(admin);
