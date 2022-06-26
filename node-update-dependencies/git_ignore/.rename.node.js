const path = './';
const fs = require('fs');

const rename = (fileName, newFileName, message) => {
  if (fileName !== newFileName) {
    console.log(' ');
    console.log(`┌─ ${message} START`);
    console.log('|', fileName);
    console.log('|', newFileName);
    fs.renameSync(`${path}${fileName}`, `${path}${newFileName}`);
    console.log(`└─ ${message} END`);
  }
}

fs.readdirSync(path).map(file => rename(file, file.toLowerCase(), 'RENAME TO LOWERCASE'));
fs.readdirSync(path).map(file => rename(file, file.split(' ').join('.'), 'RENAME SPACES TO DOTS'));

fs.readdirSync(path).map(file => {
  if (file.match(/^.*\.url$/)) {
    if (!file.match(/^.*\.z\.url$/)) {
      rename(file, file.slice(0, file.length - 4) + '.z.url', 'RENAME TO Z URL');
    }
  }
});

fs.readdirSync(path).map((file, index, array) => {
  if (file.match(/^.*\.s\d\de\d\d\..*\.url$/)) {
    const title = file.slice(0, file.search(/\.s\d\de\d\d\./));
    let i = index;
    while (title === array[i + 1].slice(0, array[i + 1].search(/\.s\d\de\d\d\./))) i++;
    if (i > index) {
      console.log(' ');
      console.log('┌─── RENAME URL START');
      console.log('| ┌─', file);
      const newFileName = array[i].slice(0, array[i].lastIndexOf('.')) + '.z.url';
      let n = index + 1;
      while (n <= i) console.log('| | ', array[n++]);
      console.log('| └>', newFileName);
      fs.renameSync(`${path}${file}`, `${path}${newFileName}`);
      console.log(`└─── RENAME URL END`);
    }
  }
});
