import {defaults} from 'jest-config';

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  // testEnvironment: 'node',
  testMatch: ['**/node-scripts/**/__tests__/**/*.test.?(m)[tj]s?(x)'],
  // transform: {},
  verbose: true,
};

export default config;
