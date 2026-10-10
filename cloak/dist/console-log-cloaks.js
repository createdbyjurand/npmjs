import { generateCloaks } from './generate-cloaks.js';
export const consoleLogCloaks = (rows = Math.max(1, (process.stdout.rows ?? 24) - 7), space = 2, minLength = 36, maxLength = 36, minGap = 3, maxGap = 12) => {
    if (!Number.isSafeInteger(rows) || rows < 0) {
        throw new RangeError('rows must be a non-negative integer');
    }
    if (!Number.isSafeInteger(space) || space < 0 || space > 1000) {
        throw new RangeError('space must be an integer between 0 and 1000');
    }
    const columns = Math.max(1, Math.floor(((process.stdout.columns ?? 80) + space) / (maxLength + space)));
    const cloaks = generateCloaks(rows * columns, minLength, maxLength, minGap, maxGap);
    const separator = ' '.repeat(space);
    const lines = ['----------- CLOAKS START -----------'];
    for (let i = 0; i < cloaks.length; i += columns) {
        const row = cloaks.slice(i, i + columns);
        lines.push(row
            .map(cloak => cloak.padEnd(maxLength))
            .join(separator)
            .trimEnd());
    }
    lines.push('-----------  CLOAKS END  -----------');
    console.log(lines.join('\n'));
};
if (import.meta.main)
    consoleLogCloaks();
