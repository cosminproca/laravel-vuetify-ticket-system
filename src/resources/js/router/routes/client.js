import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import auth from '@/router/middleware/auth';
import client from '@/router/middleware/client';

export default [
  {
    path: '/client',
    name: 'client',
    component: pageComponentPath('client/Client.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth, client]
    }
  }
];
