export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const MAX_NAME_LEN = 50;
export const MESSAGE_MIN_LEN = 10;
export const MESSAGE_MAX_LEN = 500;

export function isValidEmail(value: string): boolean {
  const s = value.trim();
  return s.length > 0 && s.length <= 254 && EMAIL_REGEX.test(s);
}

/** Empty or whitespace-only counts as valid (optional field). */
export function isValidPhone(value: string): boolean {
  const s = value.trim();
  if (!s) return true;
  if (s.length > 50) return false;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function validateContactForm(name: string, email: string, message: string): string | null {
  const n = name.trim();
  if (!n) return "Please enter your name.";
  if (n.length > MAX_NAME_LEN) return `Name must be at most ${MAX_NAME_LEN} characters.`;
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  const m = message.trim();
  if (m.length < MESSAGE_MIN_LEN) return `Message must be at least ${MESSAGE_MIN_LEN} characters.`;
  if (m.length > MESSAGE_MAX_LEN) return `Message must be at most ${MESSAGE_MAX_LEN} characters.`;
  return null;
}

export function clampFontSize(n: number, defaultValue = 50): number {
  if (!Number.isFinite(n)) return defaultValue;
  return Math.min(100, Math.max(0, Math.round(n)));
}
