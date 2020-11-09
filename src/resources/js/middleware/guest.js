export default ({ next, store }) => {
  if (store.getters['auth/isLogged']) {
    next({ name: store.getters['auth/userRole'].name });
  } else {
    next();
  }
};
