import { Router } from "express";
import pool from "../db.js";

const router = Router();

function rowToProfile(row) {
  if (!row) return null;
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

router.get("/", async (req, res) => {
  const email = typeof req.query.email === "string" ? req.query.email.trim() : "";
  if (!email) {
    return res.status(400).json({ error: "Query ?email= is required" });
  }
  try {
    const [rows] = await pool.execute(
      "SELECT id, email, first_name, last_name, phone, avatar_url, dark_mode, font_size, language, email_notif, sms_alerts, newsletter FROM profiles WHERE email = ?",
      [email]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Profile not found" });
    }
    return res.json(rowToProfile(rows[0]));
  } catch (err) {
    console.error("profile get", err);
    return res.status(500).json({ error: "Could not load profile" });
  }
});

router.put("/", async (req, res) => {
  const body = req.body ?? {};
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }

  const first_name = body.first_name ?? null;
  const last_name = body.last_name ?? null;
  const phone = body.phone ?? null;
  const dark_mode = body.dark_mode ? 1 : 0;
  const font_size = Number.isFinite(Number(body.font_size)) ? Number(body.font_size) : 50;
  const language = typeof body.language === "string" ? body.language : "English (US)";
  const email_notif = body.email_notif ? 1 : 0;
  const sms_alerts = body.sms_alerts ? 1 : 0;
  const newsletter = body.newsletter ? 1 : 0;

  try {
    const [existing] = await pool.execute("SELECT id FROM profiles WHERE email = ?", [email]);
    if (!existing.length) {
      await pool.execute(
        `INSERT INTO profiles (email, first_name, last_name, phone, dark_mode, font_size, language, email_notif, sms_alerts, newsletter)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          email,
          first_name,
          last_name,
          phone,
          dark_mode,
          font_size,
          language,
          email_notif,
          sms_alerts,
          newsletter,
        ]
      );
      return res.status(201).json({ ok: true, created: true });
    }
    await pool.execute(
      `UPDATE profiles SET first_name = ?, last_name = ?, phone = ?, dark_mode = ?, font_size = ?, language = ?, email_notif = ?, sms_alerts = ?, newsletter = ? WHERE email = ?`,
      [
        first_name,
        last_name,
        phone,
        dark_mode,
        font_size,
        language,
        email_notif,
        sms_alerts,
        newsletter,
        email,
      ]
    );
    return res.json({ ok: true, updated: true });
  } catch (err) {
    console.error("profile put", err);
    return res.status(500).json({ error: "Could not save profile" });
  }
});

export default router;
