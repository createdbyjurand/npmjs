import { validateHyphenPositions } from './validate-hyphen-positions.js';
export const findAllPossibleHyphenPositions = (stringLength, minimumNumberOfCharactersBetweenHyphens, maximumNumberOfCharactersBetweenHyphens) => {
    const results = [];
    const recurse = (startPos, currentHyphenPositions) => {
        if (startPos > stringLength - 1)
            return;
        for (let i = startPos; i < stringLength - 1; i++) {
            if (currentHyphenPositions.length === 0 || // First hyphen case
                (i - currentHyphenPositions[currentHyphenPositions.length - 1] - 1 >=
                    minimumNumberOfCharactersBetweenHyphens &&
                    i - currentHyphenPositions[currentHyphenPositions.length - 1] - 1 <=
                        maximumNumberOfCharactersBetweenHyphens)) {
                const newHyphenPositions = [...currentHyphenPositions, i];
                if (validateHyphenPositions(stringLength, newHyphenPositions, minimumNumberOfCharactersBetweenHyphens, maximumNumberOfCharactersBetweenHyphens)) {
                    results.push(newHyphenPositions);
                }
                if (i + minimumNumberOfCharactersBetweenHyphens < stringLength) {
                    recurse(i + minimumNumberOfCharactersBetweenHyphens + 1, newHyphenPositions);
                }
            }
        }
    };
    recurse(1, []); // Start from position 1 because hyphens cannot be at position 0
    return results;
};
