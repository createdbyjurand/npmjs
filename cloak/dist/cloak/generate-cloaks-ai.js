// Updated 2026-08-05
import { generateCloak } from './generate-cloak-ai.js';
export const generateCloaks = (num = process.stdout.rows - 7, space = 2, minLength = 36, maxLength = 36, minGap = 3, maxGap = 12) => {
    const columns = Math.floor((process.stdout.columns + space) / (maxLength + space));
    const separator = ' '.repeat(space);
    const rows = Array.from({ length: num }, () => Array.from({ length: columns }, () => generateCloak(minLength, maxLength, minGap, maxGap)).join(separator));
    console.log([
        '----------- CLOAKS START -----------',
        ...rows,
        '-----------  CLOAKS END  -----------',
    ].join('\n'));
};
generateCloaks();
