import { defaults } from 'jest-config';

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  // testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.?(m)[jt]s?(x)', '**/?(*.)+(spec|test).?(m)[tj]s?(x)'],
  // transform: {},
  verbose: true,
};

export default config;
