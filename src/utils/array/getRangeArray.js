import isNumber from "../number/isNumber";

/**
 * Get an array from min to max E.g.: [min, ..., max]
 * @function getRangeArray
 * @param min Number - The min integer to create the array
 * @param max Number - The max integer to create the array
 * @return Array
 */
export default function getRangeArray(min, max) {
  if (!isNumber(min) || !isNumber(max)) return [];
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, { length: max + 1 - min }).map(
    (_, idx) => idx + min,
  );
}
