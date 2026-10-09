import { describe, expect, test } from 'vitest';
import { findAllPossibleHyphenPositions } from './find-all-possible-hyphen-positions.ts';

describe('findAllPossibleHyphenPositions', () => {
  test('returns correct positions for (9, 3, 3)', () => {
    const expected = [
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    const result = findAllPossibleHyphenPositions(9, 3, 3);
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result.length).toBe(expected.length);
  });

  test('returns correct positions for (9, 3, 12)', () => {
    const expected = [
      [1, 5],
      [1, 6],
      [1, 7],
      [2, 6],
      [2, 7],
      [3, 7],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
    ];
    const result = findAllPossibleHyphenPositions(9, 3, 12);
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(result.length).toBe(expected.length);
  });

  test('handles small string lengths', () => {
    const expected: number[][] = [];
    const result = findAllPossibleHyphenPositions(2, 1, 1);
    expect(result).toEqual(expected);
  });
});
