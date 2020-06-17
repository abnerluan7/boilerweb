/**
 * Checks if the string is null or empty
 * @param  {string} str The string
 */
function isNullOrEmpty(str: string) {
  return !str || str.trim().length == 0
}

/**
 * Return null if string is empty
 * @param  {string} str The string
 */
function nullIfEmpty(str: string) {
  if (isNullOrEmpty(str)) {
    return null
  }

  return str
}

/**
 * Return a number if string is not null, not empty and not NaN
 * @param  {string} str The string
 */
function parseNonNullOrEmptyStringToNumber(str: string) {
  return isNullOrEmpty(str) ? nullIfEmpty(str) : Number(str)
}

function getBase64FromDataUrl(str: string) {
  return str.slice(22)
}

export { isNullOrEmpty, nullIfEmpty, parseNonNullOrEmptyStringToNumber, getBase64FromDataUrl }
