import { generateCloak } from './generate-cloak.ts';

export const generateCloaks = (
  num: number = process.stdout.rows - 7,
  space: number = 2,
  minLength: number = 36,
  maxLength: number = 36,
  minGap: number = 3,
  maxGap: number = 12,
) => {
  const cols = Math.floor((process.stdout.columns + space) / (maxLength + space));
  console.log('----------- CLOAKS START -----------');
  let i = 0;
  const row: string[] = [];
  while (i < num * cols) {
    const cloak = generateCloak(minLength, maxLength, minGap, maxGap);
    if (cloak.split('-').length - 1 === 4 || cloak.split('-').length - 1 === 5) {
      row.push(cloak);
      i++;
      if (row.length === cols) {
        console.log(row.join(' '.repeat(space)));
        row.length = 0;
      }
    }
  }
  console.log('-----------  CLOAKS END  -----------');
};

generateCloaks();
