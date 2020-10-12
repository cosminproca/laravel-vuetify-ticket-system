export default ({ next, store }) => {
  if (store.getters['auth/isLogged']) {
    next({ name: 'Home' });
  } else {
    next();
  }
};
