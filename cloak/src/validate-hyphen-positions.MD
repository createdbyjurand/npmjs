Write typescript arrow function without using the 'return' keyword or curly braces:

```typescript
export const validateHyphenPositions = (
  stringLength: number,
  hyphenPositions: number[],
  minimumNumberOfCharactersBetweenHyphens: number,
  maximumNumberOfCharactersBetweenHyphens: number,
): boolean =>
```

Input Parameters:

stringLength: the total number of characters in the string.
hyphenPositions: array of hyphen positions in the string.
minimumNumberOfCharactersBetweenHyphens: the minimum number of characters between hyphens.
maximumNumberOfCharactersBetweenHyphens: the maximum number of characters between hyphens.

Conditions:

The string cannot start or end with a hyphen.
There must be at least one character before and after each hyphen.
The number of characters between any two hyphens must be between minimumNumberOfCharactersBetweenHyphens and maximumNumberOfCharactersBetweenHyphens.
The number of characters between the start of the string and a hyphen must be between 1 and maximumNumberOfCharactersBetweenHyphens.
The number of characters between the end of the string and a hyphen must be between 1 and maximumNumberOfCharactersBetweenHyphens.

Don't add "How to use it".
