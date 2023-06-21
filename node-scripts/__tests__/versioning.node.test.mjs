/* eslint no-console: "off" */

import fs from 'fs';
import {increaseMajorVersion, increaseMinorVersion, increasePatchVersion} from '../@shared/versioning.node.mjs';

describe('versioning.node.mjs', () => {
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

  describe('increaseMajorVersion', () => {
    test('v3.3.3-SNAPSHOT', () => {
      const result = increaseMajorVersion('v3.3.3-SNAPSHOT');
      expect(result).toBe('v4.0.0-SNAPSHOT');
    });

    test('v3.3.3-RC.1-SNAPSHOT', () => {
      const result = increaseMajorVersion('v3.3.3-RC.1-SNAPSHOT');
      expect(result).toBe('v4.0.0-RC.1-SNAPSHOT');
    });

    test('v3.3.3-ALPHA.1.3-SNAPSHOT', () => {
      const result = increaseMajorVersion('v3.3.3-ALPHA.1.3-SNAPSHOT');
      expect(result).toBe('v4.0.0-ALPHA.1.3-SNAPSHOT');
    });

    test('v3.3.3', () => {
      const result = increaseMajorVersion('v3.3.3');
      expect(result).toBe('v4.0.0');
    });

    test('3.3.3-SNAPSHOT', () => {
      const result = increaseMajorVersion('3.3.3-SNAPSHOT');
      expect(result).toBe('4.0.0-SNAPSHOT');
    });

    test('3.3.3', () => {
      const result = increaseMajorVersion('3.3.3');
      expect(result).toBe('4.0.0');
    });
  });

  describe('increaseMinorVersion', () => {
    test('v3.3.3-SNAPSHOT', () => {
      const result = increaseMinorVersion('v3.3.3-SNAPSHOT');
      expect(result).toBe('v3.4.0-SNAPSHOT');
    });

    test('v3.3.3-RC.1-SNAPSHOT', () => {
      const result = increaseMinorVersion('v3.3.3-RC.1-SNAPSHOT');
      expect(result).toBe('v3.4.0-RC.1-SNAPSHOT');
    });

    test('v3.3.3-ALPHA.1.3-SNAPSHOT', () => {
      const result = increaseMinorVersion('v3.3.3-ALPHA.1.3-SNAPSHOT');
      expect(result).toBe('v3.4.0-ALPHA.1.3-SNAPSHOT');
    });

    test('v3.3.3', () => {
      const result = increaseMinorVersion('v3.3.3');
      expect(result).toBe('v3.4.0');
    });

    test('3.3.3-SNAPSHOT', () => {
      const result = increaseMinorVersion('3.3.3-SNAPSHOT');
      expect(result).toBe('3.4.0-SNAPSHOT');
    });

    test('3.3.3', () => {
      const result = increaseMinorVersion('3.3.3');
      expect(result).toBe('3.4.0');
    });
  });

  describe('increasePatchVersion', () => {
    test('v3.3.3-SNAPSHOT', () => {
      const result = increasePatchVersion('v3.3.3-SNAPSHOT');
      expect(result).toBe('v3.3.4-SNAPSHOT');
    });

    test('v3.3.3-RC.1-SNAPSHOT', () => {
      const result = increasePatchVersion('v3.3.3-RC.1-SNAPSHOT');
      expect(result).toBe('v3.3.4-RC.1-SNAPSHOT');
    });

    test('v3.3.3-ALPHA.1.3-SNAPSHOT', () => {
      const result = increasePatchVersion('v3.3.3-ALPHA.1.3-SNAPSHOT');
      expect(result).toBe('v3.3.4-ALPHA.1.3-SNAPSHOT');
    });

    test('v3.3.3', () => {
      const result = increasePatchVersion('v3.3.3');
      expect(result).toBe('v3.3.4');
    });

    test('3.3.3-SNAPSHOT', () => {
      const result = increasePatchVersion('3.3.3-SNAPSHOT');
      expect(result).toBe('3.3.4-SNAPSHOT');
    });

    test('3.3.3', () => {
      const result = increasePatchVersion('3.3.3');
      expect(result).toBe('3.3.4');
    });
  });
});
