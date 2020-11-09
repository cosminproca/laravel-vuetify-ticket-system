export default async ({ next, store }) => {
  if (!store.getters['auth/isLogged'] && store.state.auth.token) {
    await store.dispatch('auth/user');

    if (!store.state.auth.user) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
};
