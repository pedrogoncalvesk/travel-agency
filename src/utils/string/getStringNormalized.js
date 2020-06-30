export default function getStringNormalized(string) {
  if (typeof string !== "string") return string;
  return string
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
