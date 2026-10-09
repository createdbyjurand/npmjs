import { describe, expect, it } from 'vitest';
import { validateHyphenPositions } from './validate-hyphen-positions.ts';

describe('validateHyphenPositions', () => {
  it('should return true for valid hyphen positions (9, [1, 5], 3, 3)', () => {
    expect(validateHyphenPositions(9, [1, 5], 3, 3)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [2, 6], 3, 3)', () => {
    expect(validateHyphenPositions(9, [2, 6], 3, 3)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [3, 7], 3, 3)', () => {
    expect(validateHyphenPositions(9, [3, 7], 3, 3)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [1], 3, 12)', () => {
    expect(validateHyphenPositions(9, [1], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [2], 3, 12)', () => {
    expect(validateHyphenPositions(9, [2], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [3], 3, 12)', () => {
    expect(validateHyphenPositions(9, [3], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [4], 3, 12)', () => {
    expect(validateHyphenPositions(9, [4], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [5], 3, 12)', () => {
    expect(validateHyphenPositions(9, [5], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [6], 3, 12)', () => {
    expect(validateHyphenPositions(9, [6], 3, 12)).toBeTruthy();
  });

  it('should return true for valid hyphen positions (9, [7], 3, 12)', () => {
    expect(validateHyphenPositions(9, [7], 3, 12)).toBeTruthy();
  });

  it('should return false if string starts with a hyphen', () => {
    expect(validateHyphenPositions(9, [0, 5], 3, 12)).toBeFalsy();
  });

  it('should return false if string ends with a hyphen', () => {
    expect(validateHyphenPositions(9, [1, 8], 3, 12)).toBeFalsy();
  });

  it('should return false if the gap between hyphens is less than minGap', () => {
    expect(validateHyphenPositions(9, [3, 5], 3, 12)).toBeFalsy();
  });

  it('should return false if the gap between hyphens is more than maxGap', () => {
    expect(validateHyphenPositions(9, [1, 7], 3, 3)).toBeFalsy();
  });

  it('should return false if the distance from start to the first hyphen is not within 1 to maxGap', () => {
    expect(validateHyphenPositions(9, [5], 3, 3)).toBeFalsy();
  });

  it('should return false if the distance from the last hyphen to the end is not within 1 to maxGap', () => {
    expect(validateHyphenPositions(9, [3], 3, 3)).toBeFalsy();
  });

  it('should handle cases with no hyphens correctly', () => {
    expect(validateHyphenPositions(9, [], 3, 3)).toBeFalsy();
  });

  it('should return true when all conditions are met with multiple hyphens', () => {
    expect(validateHyphenPositions(15, [2, 6, 11], 3, 12)).toBeTruthy();
  });

  it('should handle edge cases where string is too short for any valid hyphen placement', () => {
    expect(validateHyphenPositions(3, [2], 1, 2)).toBeFalsy();
  });
});
