export default function (path) {
  return () =>
    import(/* webpackChunkName: '[request]' */ `@/pages/${path}`).then(
      (page) => page.default || page
    );
}
