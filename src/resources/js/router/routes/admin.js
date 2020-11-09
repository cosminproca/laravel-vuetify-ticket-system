import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import auth from '@/middleware/auth';

export default [
  {
    path: '/admin',
    name: 'admin',
    component: pageComponentPath('admin/Admin.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  }
];
