import isString from "../string/isString";

export default function isNumber(num, onlyTypeCheck = false) {
  const res = typeof num === "number";
  if (onlyTypeCheck) return res;

  if (isString(num, true)) {
    return num === "" ? false : res && !isNaN(num);
  }
  return res && !isNaN(num);
}
