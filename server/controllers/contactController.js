import pool from "../config/db.js";
import { sendContactEmail } from "../utils/mailer.js";
import {
  MAX_NAME_LEN,
  MESSAGE_MAX_LEN,
  MESSAGE_MIN_LEN,
  isValidEmail,
  pickAllowed,
} from "../utils/validation.js";

const CONTACT_KEYS = ["name", "email", "message"];

export async function createContact(req, res) {
  const picked = pickAllowed(req.body ?? {}, CONTACT_KEYS);

  const name = typeof picked.name === "string" ? picked.name.trim() : "";
  const email = typeof picked.email === "string" ? picked.email.trim() : "";
  const message = typeof picked.message === "string" ? picked.message.trim() : "";

  if (!name) return res.status(400).json({ error: "Name is required" });
  if (name.length > MAX_NAME_LEN) {
    return res.status(400).json({ error: `Name must be at most ${MAX_NAME_LEN} characters` });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: "A valid email address is required" });
  if (message.length < MESSAGE_MIN_LEN) {
    return res.status(400).json({ error: `Message must be at least ${MESSAGE_MIN_LEN} characters` });
  }
  if (message.length > MESSAGE_MAX_LEN) {
    return res.status(400).json({ error: `Message must be at most ${MESSAGE_MAX_LEN} characters` });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
    );
    try {
      await sendContactEmail({ name, email, message });
    } catch (emailErr) {
      console.error("Email send failed (message still saved):", emailErr.message);
    }
    return res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("contact insert", err);
    return res.status(500).json({ error: "Could not save message" });
  }
}
