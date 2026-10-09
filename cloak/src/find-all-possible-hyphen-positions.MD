Write typescript arrow function:

```typescript
export const findAllPossibleHyphenPositions = (
  stringLength: number,
  minimumNumberOfCharactersBetweenHyphens: number,
  maximumNumberOfCharactersBetweenHyphens: number,
) =>
```

Input Parameters:

stringLength: the total number of characters in the string.
minimumNumberOfCharactersBetweenHyphens: the minimum number of characters between hyphens.
maximumNumberOfCharactersBetweenHyphens: the maximum number of characters between hyphens.

Output:

An array of arrays (number[][]), where each inner array represents a set of positions where hyphens can be legally placed within the string.

Conditions:

The string cannot start or end with a hyphen.
There must be at least one character before and after each hyphen.
The number of characters between any two hyphens must be between or including minGap and maxGap.
The number of characters between the start/end of the string and a hyphen must be between or including 1 and maxGap.
Name recursive function: recurse

Test functions:

There is a function that you can, but don't have to, use.

```typescript
export const validateHyphenPositions = (
  stringLength: number,
  hyphenPositions: number[],
  minimumNumberOfCharactersBetweenHyphens: number,
  maximumNumberOfCharactersBetweenHyphens: number,
): boolean =>
  hyphenPositions.every(
    (pos, idx, arr) =>
      pos > 0 &&
      pos < stringLength - 1 &&
      (idx === 0 || pos - arr[idx - 1] - 1 >= minimumNumberOfCharactersBetweenHyphens) &&
      (idx === 0 || pos - arr[idx - 1] - 1 <= maximumNumberOfCharactersBetweenHyphens) &&
      (idx === arr.length - 1 ||
        arr[idx + 1] - pos - 1 >= minimumNumberOfCharactersBetweenHyphens) &&
      (idx === arr.length - 1 || arr[idx + 1] - pos - 1 <= maximumNumberOfCharactersBetweenHyphens),
  ) &&
  hyphenPositions[0] <= maximumNumberOfCharactersBetweenHyphens &&
  stringLength - hyphenPositions[hyphenPositions.length - 1] - 1 <=
    maximumNumberOfCharactersBetweenHyphens;
```

If used, import must be placed at the top of your code!

```typescript
import { validateHyphenPositions } from './validate-hyphen-positions';
```

There is also a test case:

```typescript
import { findAllPossibleHyphenPositions } from './find-all-possible-hyphen-positions';

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
    const expected = [];
    const result = findAllPossibleHyphenPositions(2, 1, 1);
    expect(result).toEqual(expected);
  });
});
```
