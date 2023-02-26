const directory = [
  'floating.ts',
  // 'esfse-sefse.esfse.sef.json',
  // 'grow.json',
  'grow.json.ts',
  // 'grow.json.tsx',
  // 'grow.json.js',
  // 'grow.json.jsx',
  'logo-cbj.svg',
  // 'logo-ertggd.svg',
  // 'lqweqwbj.svg',
];
const indexFileContent = [];

directory.forEach(element => {
  const toPascalCase = str =>
    (String(str).match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
  const getFileName = e => e.split('.').slice(0, -1).join('');

  if (element.endsWith('.cjs') || element.endsWith('.mjs')) {
    indexFileContent.push(`export * from './${element}';`);
  } else if (
    element.endsWith('.js') ||
    element.endsWith('.ts') ||
    element.endsWith('.jsx') ||
    element.endsWith('.tsx')
  ) {
    indexFileContent.push(`export * from './${getFileName(element)}';`);
  } else if (
    element.endsWith('.json') ||
    element.endsWith('.jsonc') ||
    element.endsWith('.json5') ||
    element.endsWith('.svg')
  ) {
    indexFileContent.push(`import ${toPascalCase(getFileName(element))} from './${element}';`);
    indexFileContent.push(`export const ${toPascalCase(element)} = ${toPascalCase(getFileName(element))};`);
  }
});

indexFileContent.sort((a, b) => {
  const A = a.split(' ')[0];
  const AA = a.split(' ')[1];
  const B = b.split(' ')[0];
  const BB = b.split(' ')[1];
  if (A === 'import' && B === 'export') return -1;
  if (A === 'export' && B === 'export' && AA === 'const' && BB === '*') return -1;
  if (A === 'export' && B === 'import') return 1;
  if (A === 'export' && B === 'export' && AA === '*' && BB === 'const') return 1;
  return 0;
});

const getImportIndex = arr => arr.findIndex(e => e.split(' ')[0] === 'import');
const getConstIndex = arr => arr.findIndex(e => e.split(' ')[1] === 'const');
const getStarIndex = arr => arr.findIndex(e => e.split(' ')[1] === '*');

if (getImportIndex(indexFileContent) === 0) {
  indexFileContent.splice(getConstIndex(indexFileContent), 0, '');
  if (getStarIndex(indexFileContent) > 0) indexFileContent.splice(getStarIndex(indexFileContent), 0, '');
}

console.log(indexFileContent);
console.log(indexFileContent.join('\r\n'));
