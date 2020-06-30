export function capitalizeArrayOfObjects(array, key) {
  if (!Array.isArray(array) || typeof key !== "string") return [];
  return array.map(curr => ({
    ...curr,
    [key]: curr[key]
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.substr(1))
      .join(" "),
  }));
}

export function capitalizeArray(array) {
  if (!Array.isArray(array)) return [];
  return array.map(curr =>
    curr
      .toLowerCase()
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.substr(1))
      .join(" "),
  );
}
