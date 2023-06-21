/* eslint no-console: "off" */

import fs from 'fs';
import {getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept} from '../@shared/package-json.node.mjs';
// import rewire from 'rewire';
// https://www.elvenware.com/teach/assignments/NodeJsMocksWithRewire.html
// const updateDependenciesNodeMJS = rewire('../bin/update-dependencies.node.mjs');

describe('package-json.node.mjs', () => {
  beforeAll(() => {
    console.log('directory before change:', fs.readdirSync('.'));
    process.chdir('node-scripts/__tests__');
    console.log('directory after change:', fs.readdirSync('.'));
  });

  afterAll(() => {
    console.log('directory before change:', fs.readdirSync('.'));
    process.chdir('../../');
    console.log('directory after change:', fs.readdirSync('.'));
  });

  describe('getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept', () => {
    test('getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept', () => {
      expect(
        getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept('./mocks/packageJsonFrontendMock.json', [
          'typescript',
        ]),
      ).toBe(
        '@createdbyjurand/node-scripts@latest ' +
          '@react-pdf/types@latest ' +
          '@testing-library/jest-dom@latest ' +
          '@testing-library/react@latest ' +
          '@testing-library/user-event@latest ' +
          '@types/jest@latest ' +
          '@types/node@latest ' +
          '@types/react@latest ' +
          '@types/react-dom@latest ' +
          'eslint@latest ' +
          'prettier@latest ' +
          'rimraf@latest ' +
          'sass@latest',
        // 'typescript@latest',
      );
    });
  });
});
