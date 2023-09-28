export default function convertPathToTitle(path) {
  const parts = path.replace(/^\/|\/$/g, "").split("-");
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
}
