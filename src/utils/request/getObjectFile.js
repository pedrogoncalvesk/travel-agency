export default function getObjectFile(uri) {
  if (uri === "" || uri === null || typeof uri === "undefined") return uri;

  const name = uri.split("/").pop();
  const match = /\.(\w+)$/.exec(name);
  const type = match ? `image/${match[1]}` : "image";

  return { uri, name, type };
}
