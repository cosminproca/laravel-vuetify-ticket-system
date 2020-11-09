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
  }
];
