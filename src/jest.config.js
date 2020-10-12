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
  setupFilesAfterEnv: ['<rootDir>/resources/js/tests/setupFiles'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: ['resources/js/pages/**/*.{js,jsx,ts,tsx,vue}'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './coverage'
};
