import pageComponentPath from '@/utils/pageComponentPath';

export default [
  {
    path: '/',
    name: 'Home',
    component: pageComponentPath('Home.vue'),
    meta: {
      layout: 'Admin'
    }
  }
];
