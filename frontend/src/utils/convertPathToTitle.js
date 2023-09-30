export default function convertPathToTitle(path, isAllWords = false) {
  const parts = path.replace(/^\/|\/$/g, "").split("-");
  if(isAllWords) {
    return `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} ${parts[1].charAt(0).toUpperCase()}${parts[1].slice(1)}`;
  }
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
}
