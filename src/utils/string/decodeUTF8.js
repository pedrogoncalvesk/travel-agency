export default function decodeUTF8(s) {
  if (typeof s !== "string") return s;
  return decodeURIComponent(escape(s));
}
