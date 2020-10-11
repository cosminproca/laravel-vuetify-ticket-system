import pageComponentPath from '@/utils/pageComponentPath';

export default [
  {
    path: '/',
    name: 'Home',
    component: pageComponentPath('Home.vue'),
    meta: {
      layout: 'Admin'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: pageComponentPath('auth/Login.vue'),
    meta: {
      layout: 'Admin'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: pageComponentPath('auth/Register.vue'),
    meta: {
      layout: 'Admin'
    }
  }
];
