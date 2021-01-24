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
    path: '/admin/tickets',
    name: 'admin.tickets.index',
    component: pageComponentPath('admin/tickets/Index.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  },
  {
    path: '/admin/tickets/:id',
    name: 'admin.tickets.view',
    component: pageComponentPath('admin/tickets/Show.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  },
  {
    path: '/admin/faq_articles',
    name: 'admin.faq_articles.index',
    component: pageComponentPath('admin/faq_articles/Index.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  },
  {
    path: '/admin/faq_articles/:id',
    name: 'admin.faq_articles.view',
    component: pageComponentPath('admin/faq_articles/Show.vue'),
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
    path: '/admin/categories',
    name: 'admin.categories.index',
    component: pageComponentPath('admin/categories/Index.vue'),
    meta: {
      layout: layouts.ADMIN,
      middleware: [auth]
    }
  },
  {
    path: '/admin/categories/:id',
    name: 'admin.categories.view',
    component: pageComponentPath('admin/categories/Show.vue'),
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
