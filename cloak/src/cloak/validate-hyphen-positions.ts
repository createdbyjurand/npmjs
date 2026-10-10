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
