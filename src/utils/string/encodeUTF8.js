export default function encodeUTF8(s) {
  if (typeof s !== "string") return s;
  return unescape(encodeURIComponent(s));
}
