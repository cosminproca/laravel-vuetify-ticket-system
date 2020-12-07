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
  },
  {
    path: '/admin/faq_articles/create',
    name: 'admin.faq_articles.create',
    component: pageComponentPath('admin/faq_articles/Create.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  },
  {
    path: '/admin/categories/create',
    name: 'admin.categories.create',
    component: pageComponentPath('admin/categories/Create.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  }
];
