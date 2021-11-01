import { defaults } from 'jest-config';

const config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  testMatch: ['**/__tests__/**/*.?(m)[jt]s?(x)', '**/?(*.)+(spec|test).?(m)[tj]s?(x)'],
  verbose: true,
};

export default config;
