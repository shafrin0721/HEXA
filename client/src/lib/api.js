function apiUrl(path) {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}
export {
  apiUrl
};
