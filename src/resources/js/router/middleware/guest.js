export default ({ next, store }) => {
  if (store.getters['auth/isLogged']) {
    next({ name: store.state.auth.user.roles[0].name });
  } else {
    next();
  }
};
