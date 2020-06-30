export default function compareJSON(o1, o2, stringify = true) {
  try {
    let c1 = o1;
    let c2 = o2;
    if (stringify) {
      c1 = JSON.stringify(o1);
      c2 = JSON.stringify(o2);
    }
    return c1 === c2;
  } catch (e) {
    // continue
  }
  return false;
}
