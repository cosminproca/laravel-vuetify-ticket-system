import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import guest from '@/middleware/guest';

export default [
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
    path: '*',
    component: pageComponentPath('errors/PageNotFound.vue'),
    meta: {
      layout: layouts.GUEST,
      middleware: [guest]
    }
  }
];
