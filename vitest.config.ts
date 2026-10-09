import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    // include: ['cloak/**/*.test.ts', 'node-scripts/**/*.test.mjs'],
    exclude: [...configDefaults.exclude, 'cra-template/**'], // Bez ...configDefaults.exclude Vitest zacząłby przeszukiwać node_modules i inne domyślnie pomijane katalogi.
  },
});
