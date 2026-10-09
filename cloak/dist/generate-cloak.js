import { randomInt } from 'node:crypto';
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';
const MAX_LENGTH = 4096;
/** Length includes hyphens. The first and last segments may be shorter than minGap. */
export const generateCloak = (minLength = 9, maxLength = 9, minGap = 3, maxGap = 12) => {
    if (!Number.isSafeInteger(minLength) ||
        !Number.isSafeInteger(maxLength) ||
        minLength < 3 ||
        maxLength < minLength ||
        maxLength > MAX_LENGTH) {
        throw new RangeError(`Lengths must be integers with 3 <= minLength <= maxLength <= ${MAX_LENGTH}`);
    }
    if (!Number.isSafeInteger(minGap) ||
        !Number.isSafeInteger(maxGap) ||
        minGap < 1 ||
        maxGap < minGap ||
        maxGap > MAX_LENGTH) {
        throw new RangeError(`Gaps must be integers with 1 <= minGap <= maxGap <= ${MAX_LENGTH}`);
    }
    // With one character per segment, only odd lengths are possible: a-b, a-b-c, ...
    const step = maxGap === 1 ? 2 : 1;
    const firstLength = step === 2 && minLength % 2 === 0 ? minLength + 1 : minLength;
    if (firstLength > maxLength) {
        throw new RangeError('No valid cloak fits the requested length and gap ranges');
    }
    const length = firstLength + step * randomInt(Math.floor((maxLength - firstLength) / step) + 1);
    // Pick only hyphen counts that leave enough room for every segment.
    const minHyphens = Math.max(1, Math.ceil((length - maxGap) / (maxGap + 1)));
    const maxHyphens = Math.floor((length + minGap - 2) / (minGap + 1));
    const hyphens = randomInt(minHyphens, maxHyphens + 1);
    let remaining = length - hyphens;
    let cloak = '';
    for (let segment = 0; segment <= hyphens; segment++) {
        const segmentsLeft = hyphens - segment;
        const minimumHere = segment === 0 || segmentsLeft === 0 ? 1 : minGap;
        const minimumAfter = segmentsLeft === 0 ? 0 : 1 + (segmentsLeft - 1) * minGap;
        const maximumAfter = segmentsLeft * maxGap;
        // Reserve enough characters for the remaining segments before choosing this one.
        const segmentLength = randomInt(Math.max(minimumHere, remaining - maximumAfter), Math.min(maxGap, remaining - minimumAfter) + 1);
        if (segment > 0)
            cloak += '-';
        for (let i = 0; i < segmentLength; i++) {
            cloak += CHARACTERS[randomInt(CHARACTERS.length)];
        }
        remaining -= segmentLength;
    }
    return cloak;
};
