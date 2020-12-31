export default ({ next, to, store }) => {
  console.log(store.getters['auth/userRole']);
  console.log(to.meta);
  if (!store.getters['auth/isLogged']) {
    next({ name: 'login' });
  } else {
    if (
      store.getters['auth/isLogged'] &&
      to.meta.layout.toLowerCase() !== store.getters['auth/userRole'].name
    ) {
      next({ name: store.getters['auth/userRole'].name });
    } else {
      next();
    }
  }
};
