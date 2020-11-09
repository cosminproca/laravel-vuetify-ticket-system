import store from '@/store';

import checkToken from '@/middleware/checkToken';

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return async () => {
    const nextPipeline = await middlewarePipeline(
      context,
      middleware,
      index + 1
    );

    await nextMiddleware({ ...context, next: nextPipeline });
  };
}

function callMiddleware(to, from, next) {
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
}

export { callMiddleware, middlewarePipeline };
