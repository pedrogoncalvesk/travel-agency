import isString from "../string/isString";

export default function isNumber(num: any, onlyTypeCheck: boolean = false) {
  const res = typeof num === "number";
  if (onlyTypeCheck) return res;

  if (isString(num)) {
    return num === "" ? false : res && !isNaN(num);
  }
  return res && !isNaN(num);
}
