import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import auth from '@/middleware/auth';

export default [
  {
    path: '/support',
    name: 'support',
    component: pageComponentPath('support/Support.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  },
  {
    path: '/support/tickets/create',
    name: 'support.tickets.create',
    component: pageComponentPath('support/tickets/Create.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  },
  {
    path: '/support/tickets',
    name: 'support.tickets.index',
    component: pageComponentPath('support/tickets/Index.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  },
  {
    path: '/support/tickets/:id',
    name: 'support.tickets.view',
    component: pageComponentPath('support/tickets/Show.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  },
  {
    path: '/support/faq_articles',
    name: 'support.faq_articles.index',
    component: pageComponentPath('support/faq_articles/Index.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  },
  {
    path: '/support/faq_articles/:id',
    name: 'support.faq_articles.view',
    component: pageComponentPath('support/faq_articles/Show.vue'),
    meta: {
      layout: layouts.SUPPORT,
      middleware: [auth]
    }
  }
];
