export default function isString(str, onlyTypeCheck = false) {
  const res = typeof str === "string";
  if (onlyTypeCheck) return res;
  return res && str !== "";
}
