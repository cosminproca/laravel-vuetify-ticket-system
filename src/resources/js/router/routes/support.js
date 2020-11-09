import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import auth from '@/middleware/auth';

export default [
  {
    path: '/support',
    name: 'support',
    component: pageComponentPath('support/Support.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  }
];
