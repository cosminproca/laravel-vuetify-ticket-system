module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '^~/(.*)$': '<rootDir>/resources/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!vee-validate).+\\.js$',
    '/node_modules/(?!vee-validate).+\\.vue$'
  ],
  setupFilesAfterEnv: ['<rootDir>/resources/js/tests/setupFiles'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: ['resources/js/pages/**/*.{js,jsx,ts,tsx,vue}'],
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './coverage'
};
