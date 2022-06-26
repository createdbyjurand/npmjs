/**
 * Generates random string from '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' character set.
 * Default value is between 62 and 62.
 * @param idMinimumLength (number) minimum length of randomly generated id
 * @param idMaximumLength (number) maximum length of randomly generated id
 */
const generateId = (idMinimumLength = 4, idMaximumLength = 4) => {
  const idLength = Math.round(Math.random() * (idMaximumLength - idMinimumLength)) + idMinimumLength
  const characterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''
  for (let i = 0; i < idLength; i++) id += characterSet[Math.floor(Math.random() * characterSet.length)]
  return id
}
