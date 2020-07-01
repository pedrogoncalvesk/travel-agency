export default function isString(str: any, onlyTypeCheck: boolean = false) {
  const res = typeof str === "string";
  if (onlyTypeCheck) return res;
  return res && str !== "";
}
