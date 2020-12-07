import pageComponentPath from '@/utils/pageComponentPath';
import { layouts } from '@/utils/constants';
import auth from '@/middleware/auth';

export default [
  {
    path: '/client',
    name: 'client',
    component: pageComponentPath('client/Client.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  },
  {
    path: '/client/tickets/create',
    name: 'client.tickets.create',
    component: pageComponentPath('client/tickets/Create.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  },
  {
    path: '/client/tickets',
    name: 'client.tickets.index',
    component: pageComponentPath('client/tickets/Index.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  },
  {
    path: '/client/tickets/:id',
    name: 'client.tickets.view',
    component: pageComponentPath('client/tickets/Show.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  },
  {
    path: '/client/faq_articles',
    name: 'client.faq_articles.index',
    component: pageComponentPath('client/faq_articles/Index.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  },
  {
    path: '/client/faq_articles/:id',
    name: 'client.faq_articles.view',
    component: pageComponentPath('client/faq_articles/Show.vue'),
    meta: {
      layout: layouts.CLIENT,
      middleware: [auth]
    }
  }
];
