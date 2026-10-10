// Updated 2026-08-05

import { generateCloak } from './generate-cloak-ai.ts';

export const generateCloaks = (
  num: number = process.stdout.rows - 7,
  space: number = 2,
  minLength: number = 36,
  maxLength: number = 36,
  minGap: number = 3,
  maxGap: number = 12,
): void => {
  const columns = Math.floor(
    (process.stdout.columns + space) / (maxLength + space),
  );

  const separator = ' '.repeat(space);

  const rows = Array.from(
    { length: num },
    () =>
      Array.from(
        { length: columns },
        () => generateCloak(
          minLength,
          maxLength,
          minGap,
          maxGap,
        ),
      ).join(separator),
  );

  console.log(
    [
      '----------- CLOAKS START -----------',
      ...rows,
      '-----------  CLOAKS END  -----------',
    ].join('\n'),
  );
};

generateCloaks();
