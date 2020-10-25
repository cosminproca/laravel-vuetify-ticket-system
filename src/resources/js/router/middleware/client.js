export default ({ next, store }) => {
  if (store.state.auth.user.roles[0].name !== 'client') {
    next({ name: 'login' });
  } else {
    next();
  }
};
