import isNumber from "./number/isNumber";

/**
 * Return the current zulu time
 * @function getZuluTime
 * @param {Boolean} justDate -> If you want just date value
 * @param {String|Number|Date} date -> Pass any date string
 * @returns {String} Current zulu time
 */
export default function getZuluTime(date = "", justDate = false) {
  const newDate =
    // eslint-disable-next-line no-nested-ternary
    (typeof date === "string" && date !== "") || isNumber(date)
      ? new Date(date)
      : date.constructor === Date
      ? date
      : new Date();
  if (justDate) {
    return `${newDate.getUTCFullYear()}-${`00${
      newDate.getUTCMonth() + 1
    }`.slice(-2)}-${`00${newDate.getUTCDate()}`.slice(-2)}`;
  }
  return `${newDate.getUTCFullYear()}-${`00${newDate.getUTCMonth() + 1}`.slice(
    -2,
  )}-${`00${newDate.getUTCDate()}`.slice(
    -2,
  )} ${`00${newDate.getUTCHours()}`.slice(
    -2,
  )}:${`00${newDate.getUTCMinutes()}`.slice(
    -2,
  )}:${`00${newDate.getUTCSeconds()}`.slice(-2)}`;
}
