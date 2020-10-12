import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';

import checkToken from '@/router/middleware/checkToken';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes
});

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return async () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    await nextMiddleware({ ...context, next: nextPipeline });
  };
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  let middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store
  };

  middleware = [checkToken, ...middleware];

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
