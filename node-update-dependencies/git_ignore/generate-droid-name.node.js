const generateDroidName = (idMinimumLength = 4, idMaximumLength = 4) => {
  const idLength = Math.round(Math.random() * (idMaximumLength - idMinimumLength)) + idMinimumLength
  const characterSet = '0123456789abcdefghijklmnopqrstuvwxyz'
  let id = ''
  for (let i = 0; i < idLength; i++) id += characterSet[Math.floor(Math.random() * characterSet.length)]
  return id
}

for (let i = 0; i < 24; i++) {
  let line = generateDroidName(3, 3) + ' ' + generateDroidName()
  for (let i = 0; i < 14; i++) line += ' ' + generateDroidName(3, 3) + ' ' + generateDroidName()
    console.log(line)
}
