import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import { callMiddleware } from '@/middleware';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes
});

router.beforeEach(callMiddleware);

export default router;
