// updated 2026.08.05

/**
 * The upper bound of randomInt() is exclusive.
 * randomInt(a, b) losuje liczbę z przedziału od a (włącznie) do b (bez b).
 * Czyli górna granica (b) jest exclusive = wykluczająca.
 */
import { randomInt } from 'node:crypto';
import { findAllPossibleHyphenPositions } from './find-all-possible-hyphen-positions.ts';

// 0123456789
// abcdefghijklmnopqrstuvwxyz
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateCloak = (
  minLength: number = 9,
  maxLength: number = 9,
  minGap: number = 3,
  maxGap: number = 12,
): string => {
  if (minLength < 1 || maxLength < minLength) {
    console.error('minLength:', minLength);
    console.error('maxLength:', maxLength);
    console.error('minGap:', minGap);
    console.error('maxGap:', maxGap);
    throw new Error(
      'Invalid length range: minLength must be >= 1 and maxLength must be >= minLength',
    );
  }
  if (minGap < 1 || maxGap < minGap) {
    console.error('minLength:', minLength);
    console.error('maxLength:', maxLength);
    console.error('minGap:', minGap);
    console.error('maxGap:', maxGap);
    throw new Error('Invalid space range: minGap must be >= 1 and maxGap must be >= minGap');
  }

  const cloakLength = randomInt(minLength, maxLength + 1);

  const possibleHyphenPositions: number[][] = findAllPossibleHyphenPositions(
    cloakLength,
    minGap,
    maxGap,
  );

  if (possibleHyphenPositions.length === 0)
    throw new Error(
      `No possible hyphen positions for cloakLength=${cloakLength}, minGap=${minGap}, maxGap=${maxGap}`,
    );

  // Pick one
  const hyphenPositions = new Set(
    possibleHyphenPositions[randomInt(possibleHyphenPositions.length)],
  );

  let cloak = '';

  for (let i = 0; i < cloakLength; i++) {
    if (hyphenPositions.has(i)) {
      cloak += '-';
      continue;
    }

    cloak += CHARACTERS[randomInt(CHARACTERS.length)];
  }
  // console.log(
  //   `findAllPossibleHyphenPositions(${cloakLength}, ${minGap}, ${maxGap}) returns ${JSON.stringify(possibleHyphenPositions)} (${cloak})`,
  // );

  return cloak;
};
