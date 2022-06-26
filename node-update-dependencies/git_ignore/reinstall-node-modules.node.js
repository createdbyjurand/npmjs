const fs = require('fs');
const { spawnSync } = require('child_process');
const spawnChild = command => spawnSync(command, { stdio: 'inherit', shell: true });

console.log('---------- fs.unlinkSync(\'package-lock.json\');');
fs.unlinkSync('package-lock.json');

console.log('---------- fs.rmdirSync(\'node_modules\', { recursive: true });');
fs.rmdirSync('node_modules', { recursive: true });

console.log('---------- spawnChild(\'npm i\');');
spawnChild('npm i');

console.log('---------- Script ended');
