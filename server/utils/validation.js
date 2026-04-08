export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const MAX_NAME_LEN = 50;
export const MESSAGE_MIN_LEN = 10;
export const MESSAGE_MAX_LEN = 500;

export const PROFILE_LANGUAGES = new Set(["English (US)", "English (UK)", "Spanish", "French"]);

export function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const s = value.trim();
  return s.length > 0 && s.length <= 254 && EMAIL_REGEX.test(s);
}

export function isValidPhoneOptional(value) {
  if (value == null || value === "") return true;
  if (typeof value !== "string") return false;
  const s = value.trim();
  if (!s) return true;
  if (s.length > 50) return false;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function toBool01(value) {
  if (value === true || value === 1) return 1;
  if (value === false || value === 0) return 0;
  if (typeof value === "string") {
    const t = value.trim().toLowerCase();
    if (t === "true" || t === "1") return 1;
    if (t === "false" || t === "0" || t === "") return 0;
  }
  return 0;
}

export function clampFontSize(n, defaultValue = 50) {
  const num = Number(n);
  if (!Number.isFinite(num)) return defaultValue;
  return Math.min(100, Math.max(0, Math.round(num)));
}

export function pickAllowed(body, keys) {
  const out = {};
  if (!body || typeof body !== "object" || Array.isArray(body)) return out;
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(body, k)) out[k] = body[k];
  }
  return out;
}

export function normalizeNameField(value, maxLen) {
  if (value == null || value === "") return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false, error: "must be a string" };
  const t = value.trim();
  if (!t) return { ok: true, value: null };
  if (t.length > maxLen) return { ok: false, error: `must be at most ${maxLen} characters` };
  return { ok: true, value: t };
}
