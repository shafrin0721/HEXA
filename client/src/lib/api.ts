/** Use relative `/api/...` in dev (Vite proxy). Set `VITE_API_URL` in production (e.g. `https://api.yoursite.com`). */
export function apiUrl(path: string): string {
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}
