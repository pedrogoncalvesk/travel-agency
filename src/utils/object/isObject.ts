export default function isObject(obj: any) {
  return (
    typeof obj === "object" &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
}
