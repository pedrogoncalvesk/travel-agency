import isNumber from "./number/isNumber";
import isObject from "./object/isObject";

/**
 * Return the current zulu time
 * @function getZuluTime
 * @param {Boolean} formatted -> If you want the value formatted in DD/MM/YYYY HH:MM:SS or not
 * @param {String|Number|Date} date -> Pass any date string
 * @returns {String} Current zulu time
 */
export default function getZuluTime(date = "", formatted = false) {
  const newDate =
    // eslint-disable-next-line no-nested-ternary
    (typeof date === "string" && date !== "") || isNumber(date)
      ? new Date(date)
      : isObject(date) && date.constructor === Date
      ? date
      : new Date();
  if (formatted) {
    return `${`00${newDate.getUTCDate()}`.slice(
      -2,
    )}/${`00${newDate.getUTCMonth()}${1}`.slice(
      -2,
    )}/${newDate.getUTCFullYear()} ${`00${newDate.getUTCHours()}`.slice(
      -2,
    )}:${`00${newDate.getUTCMinutes()}`.slice(
      -2,
    )}:${`00${newDate.getUTCSeconds()}`.slice(-2)}`;
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
