module.exports = {
  root: true,
  env: {
    mocha: true,
    jest: true,
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/max-attributes-per-line': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    $nuxt: true,
    cy: true,
    Cypress: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
