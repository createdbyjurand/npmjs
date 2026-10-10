// Updated 2026-08-05

import { randomInt } from 'node:crypto';

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';

const generateRandomCharacters = (length: number): string => {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += CHARACTERS[randomInt(CHARACTERS.length)];
  }

  return result;
};

const generateSegmentLengths = (
  cloakLength: number,
  hyphenCount: number,
  minGap: number,
  maxGap: number,
): number[] => {
  const segmentCount = hyphenCount + 1;
  const segmentLengths: number[] = [];

  let charactersLeft = cloakLength - hyphenCount;

  for (let index = 0; index < segmentCount; index++) {
    const segmentsLeft = segmentCount - index - 1;

    // The first and last segments may contain fewer characters than minGap.
    const currentMinimum = index === 0 || index === segmentCount - 1 ? 1 : minGap;

    const minimumCharactersLeft = segmentsLeft === 0 ? 0 : 1 + (segmentsLeft - 1) * minGap;

    const maximumCharactersLeft = segmentsLeft * maxGap;

    const minimumLength = Math.max(currentMinimum, charactersLeft - maximumCharactersLeft);

    const maximumLength = Math.min(maxGap, charactersLeft - minimumCharactersLeft);

    const segmentLength = randomInt(minimumLength, maximumLength + 1);

    segmentLengths.push(segmentLength);
    charactersLeft -= segmentLength;
  }

  return segmentLengths;
};

export const generateCloak = (
  minLength: number = 36,
  maxLength: number = 36,
  minGap: number = 3,
  maxGap: number = 12,
): string => {
  // The upper bound of randomInt() is exclusive.
  const cloakLength = randomInt(minLength, maxLength + 1);
  const hyphenCount = randomInt(4, 6);

  return generateSegmentLengths(cloakLength, hyphenCount, minGap, maxGap)
    .map(generateRandomCharacters)
    .join('-');
};
