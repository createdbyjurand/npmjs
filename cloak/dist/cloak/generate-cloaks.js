import { generateCloak } from './generate-cloak.js';
export const generateCloaks = (num = process.stdout.rows - 7, space = 2, minLength = 36, maxLength = 36, minGap = 3, maxGap = 12) => {
    const cols = Math.floor((process.stdout.columns + space) / (maxLength + space));
    console.log('----------- CLOAKS START -----------');
    let i = 0;
    const row = [];
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
