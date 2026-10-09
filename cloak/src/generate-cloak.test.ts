import {describe, expect, it} from 'vitest';
import {generateCloak} from './generate-cloak.ts';
import {findAllPossibleHyphenPositions} from './find-all-possible-hyphen-positions.ts';

const checkCloak = (cloak: string, minLength: number, maxLength: number, minGap: number, maxGap: number) => {
  expect(cloak.length).toBeGreaterThanOrEqual(minLength);
  expect(cloak.length).toBeLessThanOrEqual(maxLength);
  expect(cloak).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)+$/);
  const segments = cloak.split('-');
  for (let i = 0; i < segments.length; i++) {
    const minimum = i === 0 || i === segments.length - 1 ? 1 : minGap;
    expect(segments[i].length).toBeGreaterThanOrEqual(minimum);
    expect(segments[i].length).toBeLessThanOrEqual(maxGap);
  }
};

describe('generateCloak', () => {
  it('uses the default length and gaps', () => {
    checkCloak(generateCloak(), 9, 9, 3, 12);
  });

  it('matches the valid layouts from the exhaustive helper for small inputs', () => {
    for (let length = 3; length <= 12; length++) {
      for (let minGap = 1; minGap <= 5; minGap++) {
        for (let maxGap = minGap; maxGap <= 5; maxGap++) {
          const layouts = findAllPossibleHyphenPositions(length, minGap, maxGap);
          if (layouts.length === 0) {
            expect(() => generateCloak(length, length, minGap, maxGap)).toThrow(RangeError);
            continue;
          }
          for (let sample = 0; sample < 5; sample++) {
            const cloak = generateCloak(length, length, minGap, maxGap);
            checkCloak(cloak, length, length, minGap, maxGap);
            const positions = [...cloak].flatMap((character, i) => (character === '-' ? [i] : []));
            expect(layouts).toContainEqual(positions);
          }
        }
      }
    }
  });

  it.each([
    [18, 18, 3, 12], // Previously crashed when five hyphens were chosen.
    [12, 36, 3, 6],
    [3, 3, 4096, 4096],
    [4, 8, 1, 1], // Only lengths 5 and 7 are feasible.
    [36, 36, 3, 12],
  ])('respects lengths %i..%i and gaps %i..%i', (minLength, maxLength, minGap, maxGap) => {
    for (let i = 0; i < 100; i++) {
      checkCloak(generateCloak(minLength, maxLength, minGap, maxGap), minLength, maxLength, minGap, maxGap);
    }
  });

  it('handles the maximum length without recursion', () => {
    checkCloak(generateCloak(4096, 4096), 4096, 4096, 3, 12);
  });

  it.each([
    [2, 9, 3, 12],
    [10, 9, 3, 12],
    [9, 4097, 3, 12],
    [9.5, 10, 3, 12],
    [NaN, 9, 3, 12],
    [9, Infinity, 3, 12],
    [9, 9, 0, 12],
    [9, 9, -1, 12],
    [9, 9, 4, 3],
    [9, 9, 1.5, 12],
    [9, 9, NaN, 12],
    [9, 9, 3, Infinity],
    [9, 9, 3, 4097],
    [4, 4, 1, 1],
  ])('rejects invalid settings (%s, %s, %s, %s)', (minLength, maxLength, minGap, maxGap) => {
    expect(() => generateCloak(minLength, maxLength, minGap, maxGap)).toThrow(RangeError);
  });

  it('rejects non-number values from JavaScript callers', () => {
    // @ts-expect-error JavaScript callers can pass strings at runtime.
    expect(() => generateCloak('9')).toThrow(RangeError);
    // @ts-expect-error JavaScript callers can pass null at runtime.
    expect(() => generateCloak(9, 9, null)).toThrow(RangeError);
  });
});
