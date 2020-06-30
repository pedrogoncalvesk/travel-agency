import normalize from "../string/getStringNormalized";
import { capitalizeArrayOfObjects, capitalizeArray } from "./capitalizeArray";

export function filterArrayOfObjects(
  array,
  key,
  query,
  method = "startsWith",
  capitalize = true,
) {
  if (
    !Array.isArray(array) ||
    typeof key !== "string" ||
    typeof query !== "string" ||
    typeof method !== "string"
  ) {
    return [];
  }

  let filtered;
  switch (method) {
    case "startsWith":
      filtered = array.filter(
        i => i[key] && normalize(i[key]).startsWith(normalize(query)) !== false,
      );
      break;
    case "indexOf":
    default:
      filtered = array.filter(
        i => i[key] && normalize(i[key]).indexOf(normalize(query)) !== -1,
      );
      break;
  }

  return capitalize === true
    ? capitalizeArrayOfObjects(filtered, key)
    : filtered;
}

export function filterArray(
  array,
  query,
  method = "indexOf",
  invert = false,
  capitalize = false,
) {
  if (
    !Array.isArray(array) ||
    typeof query !== "string" ||
    typeof method !== "string"
  ) {
    return [];
  }

  let filtered;
  switch (method) {
    case "startsWith":
      filtered = array.filter(curr => {
        const aux = normalize(curr).startsWith(normalize(query)) !== false;
        return invert ? !aux : aux;
      });
      break;
    case "indexOf":
    default:
      filtered = array.filter(curr => {
        const aux = normalize(curr).indexOf(normalize(query)) !== -1;
        return invert ? !aux : aux;
      });
      break;
  }

  return capitalize === true ? capitalizeArray(filtered) : filtered;
}
