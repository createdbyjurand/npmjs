import {generateCloak} from './generate-cloak.ts';

/** Return up to 1,000 cloaks without printing anything. */
export const generateCloaks = (count = 10, minLength = 9, maxLength = 9, minGap = 3, maxGap = 12): string[] => {
  if (!Number.isSafeInteger(count) || count < 0 || count > 1000) {
    throw new RangeError('count must be an integer between 0 and 1000');
  }

  const cloaks: string[] = [];
  for (let i = 0; i < count; i++) {
    cloaks.push(generateCloak(minLength, maxLength, minGap, maxGap));
  }
  return cloaks;
};
