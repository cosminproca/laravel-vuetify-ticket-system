import pageComponentPath from '@/utils/pageComponentPath';
import guest from '@/router/middleware/guest';
import auth from '@/router/middleware/auth';

export default [
  {
    path: '/',
    name: 'Home',
    component: pageComponentPath('Home.vue'),
    meta: {
      layout: 'Admin',
      middleware: [auth]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: pageComponentPath('auth/Login.vue'),
    meta: {
      layout: 'Admin',
      middleware: [guest]
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: pageComponentPath('auth/Register.vue'),
    meta: {
      layout: 'Admin',
      middleware: [guest]
    }
  }
];
