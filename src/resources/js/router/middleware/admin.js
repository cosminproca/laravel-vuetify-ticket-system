export default ({ next, store }) => {
  if (store.state.auth.user.roles[0].name !== 'admin') {
    next({ name: 'login' });
  } else {
    next();
  }
};
