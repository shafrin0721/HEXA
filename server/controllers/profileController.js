import pool from "../config/db.js";
import {
  MAX_NAME_LEN,
  PROFILE_LANGUAGES,
  clampFontSize,
  isValidEmail,
  isValidPhoneOptional,
  normalizeNameField,
  pickAllowed,
  toBool01,
} from "../utils/validation.js";

const PROFILE_PUT_KEYS = [
  "email",
  "first_name",
  "last_name",
  "phone",
  "dark_mode",
  "font_size",
  "language",
  "email_notif",
  "sms_alerts",
  "newsletter",
];

function rowToProfile(row) {
  return {
    id: row.id,
    email: row.email,
    first_name: row.first_name,
    last_name: row.last_name,
    phone: row.phone,
    avatar_url: row.avatar_url,
    dark_mode: Boolean(row.dark_mode),
    font_size: row.font_size,
    language: row.language,
    email_notif: Boolean(row.email_notif),
    sms_alerts: Boolean(row.sms_alerts),
    newsletter: Boolean(row.newsletter),
  };
}

export async function getProfile(req, res) {
  const email = typeof req.query.email === "string" ? req.query.email.trim() : "";
  if (!email) return res.status(400).json({ error: "Query ?email= is required" });
  if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email in query" });

  try {
    const [rows] = await pool.execute(
      "SELECT id, email, first_name, last_name, phone, avatar_url, dark_mode, font_size, language, email_notif, sms_alerts, newsletter FROM profiles WHERE email = ?",
      [email],
    );
    if (!rows.length) return res.status(404).json({ error: "Profile not found" });
    return res.json(rowToProfile(rows[0]));
  } catch (err) {
    console.error("profile get", err);
    return res.status(500).json({ error: "Could not load profile" });
  }
}

export async function upsertProfile(req, res) {
  const picked = pickAllowed(req.body ?? {}, PROFILE_PUT_KEYS);

  const emailRaw = typeof picked.email === "string" ? picked.email.trim() : "";
  if (!emailRaw) return res.status(400).json({ error: "email is required" });
  if (!isValidEmail(emailRaw)) return res.status(400).json({ error: "email must be a valid address" });

  const firstNameResult = normalizeNameField(picked.first_name, MAX_NAME_LEN);
  if (!firstNameResult.ok) return res.status(400).json({ error: `first_name ${firstNameResult.error}` });
  const lastNameResult = normalizeNameField(picked.last_name, MAX_NAME_LEN);
  if (!lastNameResult.ok) return res.status(400).json({ error: `last_name ${lastNameResult.error}` });

  let phone = null;
  if (picked.phone !== undefined && picked.phone !== null) {
    if (typeof picked.phone !== "string") return res.status(400).json({ error: "phone must be a string" });
    const pt = picked.phone.trim();
    if (!isValidPhoneOptional(pt)) {
      return res.status(400).json({ error: "phone must be valid (7-15 digits) or empty" });
    }
    phone = pt || null;
  }

  const dark_mode = toBool01(picked.dark_mode);
  const font_size = clampFontSize(picked.font_size, 50);

  let language = "English (US)";
  if (picked.language !== undefined) {
    if (typeof picked.language !== "string") return res.status(400).json({ error: "language must be a string" });
    const lt = picked.language.trim();
    if (!PROFILE_LANGUAGES.has(lt)) return res.status(400).json({ error: "language is not supported" });
    language = lt;
  }

  const email_notif = toBool01(picked.email_notif);
  const sms_alerts = toBool01(picked.sms_alerts);
  const newsletter = toBool01(picked.newsletter);

  try {
    const [existing] = await pool.execute("SELECT id FROM profiles WHERE email = ?", [emailRaw]);
    if (!existing.length) {
      await pool.execute(
        `INSERT INTO profiles (email, first_name, last_name, phone, dark_mode, font_size, language, email_notif, sms_alerts, newsletter)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          emailRaw,
          firstNameResult.value,
          lastNameResult.value,
          phone,
          dark_mode,
          font_size,
          language,
          email_notif,
          sms_alerts,
          newsletter,
        ],
      );
      return res.status(201).json({ ok: true, created: true });
    }

    await pool.execute(
      `UPDATE profiles SET first_name = ?, last_name = ?, phone = ?, dark_mode = ?, font_size = ?, language = ?, email_notif = ?, sms_alerts = ?, newsletter = ? WHERE email = ?`,
      [
        firstNameResult.value,
        lastNameResult.value,
        phone,
        dark_mode,
        font_size,
        language,
        email_notif,
        sms_alerts,
        newsletter,
        emailRaw,
      ],
    );
    return res.json({ ok: true, updated: true });
  } catch (err) {
    console.error("profile put", err);
    return res.status(500).json({ error: "Could not save profile" });
  }
}
